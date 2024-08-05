import {
  Product,
  WithContext,
  Corporation,
  WebSite,
  Organization,
  BreadcrumbList,
  FAQPage,
  WebPage
} from "schema-dts";
import { SchemaGeneratorType } from "./__type";
import { DOMAIN } from "@/constants/frontend/apiRoute";

const DEFAULT_URL = "https://balloondekor.com";
const ORGANIZATION_NAME = "Balloondekor";
const ALTERNATE_NAME =
  "No.1 balloon decoration service in India";
const ORGANIZATION_LOGO = "";
const TEL_NUMBER = "+91-8910960060";
const DEFAULT_ITEM_DESC =
  "Default item description";

export default function generateSchema(
  props: SchemaGeneratorType
) {
  let jsonLD: WithContext<
    | Corporation
    | Product
    | WebSite
    | Organization
    | BreadcrumbList
    | FAQPage
    | WebPage
  >[] = [
    // +++++++++++++++++++++++++++++++++++++++++
    // +++[ DEFAULTS ]++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++

    // =========== ORGANIZATION =====================================================
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      alternateName: ALTERNATE_NAME,
      url: DOMAIN,
      logo: ORGANIZATION_LOGO /* 
      sameAs: [
        "https://www.facebook.com/profile.php?id=100083226624335",
        "https://twitter.com/balloondekor",
        "https://www.instagram.com/balloondekorofficial/",
        "https://www.youtube.com/channel/UCMnCWe4Mn5AcC5T8Q0Jil4g",
        "https://www.linkedin.com/company/balloondekor.com",
        "https://in.pinterest.com/balloondekor/"
      ], */,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: TEL_NUMBER,
          contactType: "customer service",
          areaServed: "IN",
          url: DOMAIN
        }
      ]
    },

    // =========== WEBSITE =====================================================
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: ORGANIZATION_NAME,
      alternateName: ALTERNATE_NAME,
      url: `${DOMAIN}`, // base url is needed
      /* potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://balloondekor.com/search?q={search_term_string}"
        },
        query: [
          "required name=search_term_string"
        ]
      }, */
      copyrightHolder: ORGANIZATION_NAME,
      copyrightYear: new Date().getFullYear()
    }
  ];

  // +++++++++++++++++++++++++++++++++++++++++
  // +++[ MISCELLANEOUS ]+++++++++++++++++++++
  // +++++++++++++++++++++++++++++++++++++++++

  // =========== FAQs =====================================================
  if (
    props.hasFAQ &&
    props.faqData &&
    props.faqData.length > 0
  ) {
    const faqSchema: WithContext<FAQPage> = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Frequently asked questions",
      url: props.currPath || DEFAULT_URL,
      mainEntity: props.faqData.map(
        ({ q: question, a: answer }) => {
          return {
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer
            }
          };
        }
      ),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": props.currPath
      },
      author: {
        "@type": "Organization",
        name: ORGANIZATION_NAME
      }
    };
    jsonLD.push(faqSchema);
  }

  // =========== BREADCRUMBS =====================================================
  if (
    props.hasBreadcrumbs &&
    props.breadcrumbsData &&
    props.breadcrumbsData.length > 0
  ) {
    const breadcrumbsSchema: WithContext<BreadcrumbList> =
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: "Frequently asked questions",
        url: props.currPath || DEFAULT_URL,
        itemListElement:
          props.breadcrumbsData.map(
            ({ label, link }, index) => {
              return {
                "@type": "ListItem",
                position: index + 1,
                name: label,
                item: link
              };
            }
          ),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.currPath
        }
      };
    jsonLD.push(breadcrumbsSchema);
  }

  // =========== WEBPAGE =====================================================
  if (props.isWebpage && props.webpageData) {
    let webPageSchema: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: props.webpageData.title,
      alternateName: props.webpageData
        .alternateName
        ? props.webpageData.alternateName
        : ALTERNATE_NAME,
      url: props.currPath
    };

    if (props.webpageData.description)
      webPageSchema.description =
        props.webpageData.description;

    if (props.webpageData.image) {
      webPageSchema.image =
        props.webpageData.image;
      webPageSchema.primaryImageOfPage = {
        "@type": "ImageObject",
        url: props.webpageData.image
      };
    }

    if (props.webpageData.isService) {
      const service = props.webpageData.isService;

      webPageSchema.name = service.name;
      webPageSchema.mainEntity = {
        "@type": "Product",
        name: service.name,
        image: service.image,
        description:
          props.webpageData.description ||
          DEFAULT_ITEM_DESC,
        offers: {
          "@type": "Offer",
          price: String(service.price.default),
          priceCurrency: service.price.currency,
          availability:
            "https://schema.org/InStock",
          shippingDetails: {
            "@type": "OfferShippingDetails"
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            inStoreReturnsOffered: false,
            applicableCountry: "India",
            merchantReturnLink:
              "https://balloondekor.com",
            returnPolicyCountry: "India"
          }
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(service.rating),
          reviewCount: service.totalRatings
        },
        review: service.review.map(
          ({ review, rating, name }) => {
            return {
              "@type": "Review",
              author: {
                "@type": "Person",
                name: name
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: String(rating.value),
                bestRating: String(
                  rating.bestRating
                ),
                worstRating: String(
                  rating.worstRating
                )
              },
              description: review
            };
          }
        )
      };
    }

    jsonLD.push(webPageSchema);
  }

  return jsonLD;
}
