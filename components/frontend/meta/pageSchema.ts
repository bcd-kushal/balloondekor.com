import { DOMAIN } from "@/constants/frontend/apiRoute";
import { PageDocument } from "@/schemas/cms/page";
import { SchemaGeneratorType } from "@/schemas/meta/__type";

export function getPageSchema(
  page: PageDocument,
  categorySlug: string,
  pageSlug: string
) {
  const faqExists =
    page.faqs && page.faqs.length > 0
      ? true
      : false;

  const faqs =
    faqExists && "faqs" in page
      ? page.faqs
      : undefined;

  const cleanFAQs:
    | { q: string; a: string }[]
    | undefined = faqs?.map(
    ({ question, answer }) => {
      return { q: question, a: answer };
    }
  );

  const breadCrumbsList: string[] = [
    categorySlug
      .toLowerCase()
      .split(" ")
      .join("-"),
    pageSlug.toLowerCase().split(" ").join("-")
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
    currPath: `${DOMAIN}/${categorySlug}/${pageSlug}`,
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
      title: page.heading,
      description: page.metaDescription
    }
  };

  return schemaProps;
}
