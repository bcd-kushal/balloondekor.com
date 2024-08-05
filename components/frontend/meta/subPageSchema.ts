import { DOMAIN } from "@/constants/frontend/apiRoute";
import { SubPageDocument } from "@/schemas/cms/subPage";
import { SchemaGeneratorType } from "@/schemas/meta/__type";

export function getSubPageSchema(
  subpage: SubPageDocument,
  cateogrySlug: string,
  pageSlug: string,
  subPageSlug: string
) {
  const faqExists =
    subpage.faqs && subpage.faqs.length > 0
      ? true
      : false;

  const faqs =
    faqExists && "faqs" in subpage
      ? subpage.faqs
      : undefined;

  const cleanFAQs:
    | { q: string; a: string }[]
    | undefined = faqs?.map(
    ({ question, answer }) => {
      return { q: question, a: answer };
    }
  );

  const breadCrumbsList: string[] = [
    cateogrySlug
      .toLowerCase()
      .split(" ")
      .join("-"),
    pageSlug.toLowerCase().split(" ").join("-"),
    subPageSlug.toLowerCase().split(" ").join("-")
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
    currPath: `${DOMAIN}/${cateogrySlug}/${pageSlug}/${subPageSlug}`,
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
      title: subpage.heading,
      description: subpage.metaDescription
    }
  };

  return schemaProps;
}
