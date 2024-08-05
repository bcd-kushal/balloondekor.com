// libraries
import { notFound } from "next/navigation";

// constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// components
import PageUI from "../ui/page/PageUI";

// types
import { PageDocument } from "@/schemas/cms/page";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import { getPageSchema } from "./meta/pageSchema";
import generateSchema from "@/schemas/meta/generateSchema";

async function getPage(
  categorySlug: string,
  pageSlug: string
) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/page/${pageSlug}?category=${categorySlug}`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

export default async function Page({
  categorySlug,
  pageSlug
}: {
  categorySlug: string;
  pageSlug: string;
}) {
  const page: PageDocument | null = await getPage(
    categorySlug,
    pageSlug
  );

  if (!page) {
    notFound();
  }

  const schemaProps: SchemaGeneratorType =
    getPageSchema(page, categorySlug, pageSlug);
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
      <PageUI page={page} />
    </>
  );
}
