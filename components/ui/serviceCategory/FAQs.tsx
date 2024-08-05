// libraries
import Image from "next/image";

// components
import FAQItem from "@/components/cms/homepage/layout/ui/FAQItem";

// styles
import styles from "@/components/ui/serviceCategory/faqs.module.css";

// types
import { FAQDocument } from "@/schemas/cms/serviceCategory";

export default function FAQs({
  faqs
}: {
  faqs: FAQDocument[];
}) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          {"frequently asked questions"}
        </div>
        <Image
          className={styles.icon}
          src="/icons/faq-icon.svg"
          alt="faq icon"
          height={18}
          width={18}
          unoptimized
        />
      </div>
      <div className={styles.faqs}>
        {faqs.map(({ _id, question, answer }) => (
          <FAQItem
            key={_id}
            question={question}
            answer={answer}
          />
        ))}
      </div>
    </section>
  );
}
