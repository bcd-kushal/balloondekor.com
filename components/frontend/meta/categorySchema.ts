import { DOMAIN } from "@/constants/frontend/apiRoute";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { SchemaGeneratorType } from "@/schemas/meta/__type";

export function getCategorySchema(
  category: ServiceCategoryDocument,
  slug: string
) {
  const faqExists =
    category.faqs && category.faqs.length > 0
      ? true
      : false;

  const faqs =
    faqExists && "faqs" in category
      ? category.faqs
      : undefined;

  const cleanFAQs:
    | { q: string; a: string }[]
    | undefined = faqs?.map(
    ({ question, answer }) => {
      return { q: question, a: answer };
    }
  );

  const breadCrumbsList: string[] = [
    category.name
      .toLowerCase()
      .split(" ")
      .join("-")
  ];

  const cleanBreadcrumbsList: {
    label: string;
    link: string;
  }[] = (() => {
    let list: {
      label: string;
      link: string;
    }[] = [];
    let incrementingURL =
      DOMAIN || "https://balloondekor.com";

    list.push({
      label: "Home",
      link: incrementingURL
    });

    list = [
      ...list,
      ...breadCrumbsList.map((breadcrumb) => {
        incrementingURL = `${incrementingURL}/${breadcrumb}`;
        return {
          label: breadcrumb.split("-").join(" "),
          link: incrementingURL
        };
      })
    ];

    return list;
  })();

  const schemaProps: SchemaGeneratorType = {
    currPath: `${DOMAIN}/${slug}`,
    hasFAQ: faqExists,
    hasBreadcrumbs: cleanBreadcrumbsList.length
      ? true
      : false,
    breadcrumbsData: cleanBreadcrumbsList,
    isWebpage: true,
    faqData:
      faqExists && cleanFAQs && cleanFAQs.length
        ? cleanFAQs
        : undefined,
    webpageData: {
      title: category.name,
      description: category.metaDescription
    }
  };

  return schemaProps;
}
