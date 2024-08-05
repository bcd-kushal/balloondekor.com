import Banner from "../cms/homepage/layout/ui/Banner";
import Circle from "../cms/homepage/layout/ui/Circle";
import SquareM from "../cms/homepage/layout/ui/SquareM";
import SquareL from "../cms/homepage/layout/ui/SquareL";
import Tiles from "../cms/homepage/layout/ui/Tiles";
import Collage from "../cms/homepage/layout/ui/Collage";
import Text from "../cms/homepage/layout/ui/Text";
import FAQ from "../cms/homepage/layout/ui/FAQ";
import QuickLink from "../cms/homepage/layout/ui/QuickLink";

import { DOMAIN } from "@/constants/cms/apiRoute";

import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

import styles from "@/components/frontend/Homepage.module.css";
import { SchemaGeneratorType } from "@/schemas/meta/__type";
import generateSchema from "@/schemas/meta/generateSchema";

async function getLayouts() {
  const res = await fetch(
    `${DOMAIN}/api/cms/homepage?populate=true&active=true&sortBy=order&orderBy=asc`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result.data;
}

export default async function Homepage() {
  const layouts: HomepageLayoutDocument[] = // [];
    await getLayouts();

  const faqLayouts = layouts?.filter(
    (layout) => layout.layout === "faq"
  );
  const faqExists =
    faqLayouts?.length === 0 ? false : true;

  let schemaProps: SchemaGeneratorType = {
    currPath: `${DOMAIN}`,
    hasFAQ: faqExists,
    hasBreadcrumbs: false,
    isWebpage: false,
    faqData: faqExists
      ? getFAQSchemaData(faqLayouts)
      : undefined,
    webpageData: {
      title:
        "Balloon Decoration India | Birthday Party & Event Decorators"
    }
  };

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
      <main className={styles.main}>
        {Array.isArray(layouts) &&
          layouts.map((layout) => {
            switch (layout.layout) {
              case "banner":
                return (
                  <Banner
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "circle":
                return (
                  <Circle
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "square-m":
                return (
                  <SquareM
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "square-l":
                return (
                  <SquareL
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "tiles":
                return (
                  <Tiles
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "collage":
                return (
                  <Collage
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "text":
                return (
                  <Text
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "faq":
                return (
                  <FAQ
                    key={layout._id}
                    layout={layout}
                  />
                );

              case "quick-link":
                return (
                  <QuickLink
                    key={layout._id}
                    layout={layout}
                  />
                );

              default:
                return <></>;
            }
          })}
      </main>
    </>
  );
}

function getFAQSchemaData(
  faqLayouts: HomepageLayoutDocument[]
): { q: string; a: string }[] {
  const faqList: { q: string; a: string }[] = [];
  faqLayouts.forEach(({ contents }) => {
    contents.forEach((content) =>
      faqList.push({
        q: content.heading,
        a: content.content
      })
    );
  });
  return faqList;
}
