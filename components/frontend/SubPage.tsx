// libraries
import { notFound } from "next/navigation";

// constants
import { DOMAIN } from "@/constants/frontend/apiRoute";

// components
import SubPageUI from "../ui/subPage/SubPageUI";
import { SubPageDocument } from "@/schemas/cms/subPage";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import { getSubPageSchema } from "./meta/subPageSchema";
import generateSchema from "@/schemas/meta/generateSchema";

async function getSubPage(
  categorySlug: string,
  pageSlug: string,
  subPageSlug: string
) {
  const res = await fetch(
    `${DOMAIN}/api/frontend/sub-page/${subPageSlug}?category=${categorySlug}&page=${pageSlug}`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

export default async function SubPage({
  categorySlug,
  pageSlug,
  subPageSlug
}: {
  categorySlug: string;
  pageSlug: string;
  subPageSlug: string;
}) {
  const subPage: SubPageDocument | null =
    await getSubPage(
      categorySlug,
      pageSlug,
      subPageSlug
    );

  if (!subPage) {
    notFound();
  }

  const schemaProps: SchemaGeneratorType =
    getSubPageSchema(
      subPage,
      categorySlug,
      pageSlug,
      subPageSlug
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
      <SubPageUI subPage={subPage} />
    </>
  );
}
