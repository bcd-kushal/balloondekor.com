//libraries
import { useState } from "react";
import Image from "next/image";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FAQItem from "@/components/cms/homepage/layout/ui/FAQItem";

// types
import {
  HomepageLayoutDocument,
  ContentDocument
} from "@/schemas/cms/homepage";

//styles
import styles from "@/components/cms/homepage/layout/ui/faq.module.css";

export default function FAQ({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  return (
    <div className={styles.container}>
      {layout.heading || layout.subHeading ? (
        <div className={styles.header}>
          <div
            className={styles.headingContainer}
          >
            {layout.heading ? (
              <h3 className={styles.heading}>
                {layout.heading}
              </h3>
            ) : (
              <></>
            )}
            {layout.subHeading ? (
              <h3 className={styles.subHeading}>
                {layout.subHeading}
              </h3>
            ) : (
              <></>
            )}
          </div>
          <Image
            className={styles.icon}
            src="/icons/faq-icon.svg"
            alt="faq icon"
            height={20}
            width={20}
            unoptimized
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.faqs}>
        {layout.contents.map(
          ({ _id, heading, content }) => (
            <FAQItem
              key={_id}
              question={heading}
              answer={content}
            />
          )
        )}
      </div>
    </div>
  );
}
