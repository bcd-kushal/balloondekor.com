import { DOMAIN } from "@/constants/frontend/apiRoute";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { SchemaGeneratorType } from "@/schemas/meta/__type";

export function getServicesSchema(
  service: ServiceDocument,
  slug: string
) {
  const faqExists =
    "faqs" in service.details.faq
      ? service.details.faq.faqs.length > 0
        ? true
        : false
      : false;

  const faqs =
    "faqs" in service.details.faq
      ? service.details.faq.faqs
      : undefined;

  const cleanFAQs:
    | { q: string; a: string }[]
    | undefined = faqs?.map(
    ({ question, answer }) => {
      return { q: question, a: answer };
    }
  );

  const slugs: string[] = [
    service.name
      .toLowerCase()
      .split(" ")
      .join("-")
  ];

  const breadCrumbsList: string[] = (
    service?.category as ServiceCategoryDocument
  )?.slug
    ? [
        (
          service?.category as ServiceCategoryDocument
        )?.slug,
        ...slugs
      ]
    : slugs;

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
    currPath: `${DOMAIN}/services/${slug}`,
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
      title: service.name,
      description: service.details.info,
      image:
        "url" in service.media.primary
          ? service.media.primary.url
          : undefined,
      isService: {
        name: service.name,
        image:
          "url" in service.media.primary
            ? service.media.primary.url
            : "#",
        rating: service.quality.rating || 4.9,
        totalRatings:
          service.quality.totalReviews || 137,
        price: {
          default: service.price.base.price,
          lowest: service.price.base.price,
          highest: service.price.base.mrp,
          currency: "INR"
        },
        review: [
          {
            review:
              "Good product! Will recommend",
            rating: {
              value: 4.9,
              bestRating: 5.0,
              worstRating: 0
            },
            name: "Ayush Garg"
          }
        ]
      }
    }
  };

  return schemaProps;
}
