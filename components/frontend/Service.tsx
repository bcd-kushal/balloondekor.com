// libraries
import { notFound } from "next/navigation";

// constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// components
import ServicePage from "../client/service/ServicePage";

// types
import { ServiceDocument } from "@/schemas/cms/service";
import generateSchema from "@/schemas/meta/generateSchema";
import { getServicesSchema } from "./meta/servicesSchema";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { toSlug } from "../cms/service/ServiceList";
import { getCityWisePrice } from "@/lib/sortServices";
import { OtherServicesType } from "@/types/frontend/service";

async function getServiceData(service: string) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/service/${service}`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

async function getServiceCategories(
  categoryId: string
) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/service-category/${categoryId}`,
    { next: { revalidate: 300 } }
  );
  const resData = await res.json();

  return resData;
}

export default async function Service({
  slug
}: {
  slug: string;
}) {
  const serviceData: {
    service: ServiceDocument | null;
    suggestions: ServiceDocument[];
  } = await getServiceData(slug);

  if (!serviceData?.service) {
    notFound();
  }

  const schemaProps: SchemaGeneratorType =
    getServicesSchema(serviceData.service, slug);
  const jsonLD = generateSchema(schemaProps);

  const categorySlug = (
    (serviceData.service as ServiceDocument)
      .category as ServiceCategoryDocument
  ).slug;

  const { services } =
    await getServiceCategories(categorySlug);

  const otherServicesList: OtherServicesType = (
    services as ServiceDocument[]
  ).map(({ name, quality, price }) => ({
    link: `/services/${toSlug(name)}`,
    price,
    totalReviews: quality.totalReviews || 0
  }));

  return (
    <>
      {jsonLD.map((jsonLd, index) => (
        <script
          type="application/ld+json"
          key={index}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      ))}
      <ServicePage
        service={serviceData.service}
        suggestions={serviceData.suggestions}
        otherServices={otherServicesList}
      />
    </>
  );
}
