// components
import Collapsable from "@/components/client/service/Collapsable";

// styles
import styles from "@/components/ui/service/info/faq.module.css";

// types
import { QADocument } from "@/schemas/cms/faq";

export default function FAQ({
  faq
}: {
  faq: QADocument;
}) {
  return (
    <div className={styles.container}>
      <Collapsable
        heading={faq.question}
        collapseIconSrc="/icons/down-icon.svg"
        notCollapseIconSrc="/icons/up-icon.svg"
        collapseIconAlt="Collapse Icon"
        noSeparator
      >
        <p className={styles.answer}>
          {faq.answer}
        </p>
      </Collapsable>
    </div>
  );
}
