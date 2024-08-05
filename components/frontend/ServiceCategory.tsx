// libraries
import { notFound } from "next/navigation";

// constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// components
import ServiceCategoryUI from "../ui/serviceCategory/ServiceCategoryUI";
import generateSchema from "@/schemas/meta/generateSchema";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import { getCategorySchema } from "./meta/categorySchema";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

async function getServiceCategory(
  category: string
) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/service-category/${category}`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

export default async function ServiceCategory({
  slug
}: {
  slug: string;
}) {
  const { category, services } =
    await getServiceCategory(slug);

  if (!category || !services) {
    notFound();
  }

  const schemaProps: SchemaGeneratorType =
    getCategorySchema(
      category as ServiceCategoryDocument,
      slug
    );
  const jsonLD = generateSchema(schemaProps);

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
      <ServiceCategoryUI
        category={category}
        services={services}
      />
    </>
  );
}
