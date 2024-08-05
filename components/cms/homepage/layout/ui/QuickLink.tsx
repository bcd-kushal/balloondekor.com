// libraries
import Link from "next/link";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

//styles
import styles from "@/components/cms/homepage/layout/ui/quickLink.module.css";
import QuickLinkLink from "./QuickLinkLink";

export default function QuickLink({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  return (
    <div className={styles.container}>
      {layout.sections.map(
        ({ _id, heading, linkImages }) => (
          <section
            key={_id}
            className={styles.section}
          >
            <div
              className={styles.sectionHeading}
            >
              {heading}
            </div>
            <div className={styles.links}>
              {linkImages.map(
                ({ _id, label, url }, i) => (
                  <QuickLinkLink
                    key={_id}
                    label={label}
                    url={url}
                    isLast={
                      i === linkImages.length - 1
                    }
                  />
                )
              )}
            </div>
          </section>
        )
      )}
      <section></section>
    </div>
  );
}
