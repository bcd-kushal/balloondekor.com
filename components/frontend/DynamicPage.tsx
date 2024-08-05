// Libraries
import { notFound } from "next/navigation";

// Constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// Components
import DynamicPageUI from "@/components/ui/dynamicPage/DynamicPageUI";

// Types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import { getDynamicSchema } from "./meta/dynamicSchema";
import generateSchema from "@/schemas/meta/generateSchema";

// SSG
async function getDynamicPage(slug: string) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/dynamic-page/${slug}`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

export default async function DynamicPage({
  slug
}: {
  slug: string;
}) {
  const dynamicPage: DynamicPageDocument | null =
    await getDynamicPage(slug);

  if (!dynamicPage) {
    notFound();
  }

  const schemaProps: SchemaGeneratorType =
    getDynamicSchema({
      slug: slug,
      title: dynamicPage.name,
      description: dynamicPage.metaDescription
    });
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
      <DynamicPageUI dynamicPage={dynamicPage} />
    </>
  );
}
