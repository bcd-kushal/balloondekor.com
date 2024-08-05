import { DOMAIN } from "@/constants/frontend/apiRoute";
import { SchemaGeneratorType } from "@/schemas/meta/__type";

export function getDynamicSchema({
  slug,
  title,
  description
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const schemaProps: SchemaGeneratorType = {
    currPath: `${DOMAIN}/services/${slug}`,
    hasFAQ: false,
    hasBreadcrumbs: false,
    isWebpage: true,
    webpageData: {
      title: title,
      description: description
    }
  };

  return schemaProps;
}
