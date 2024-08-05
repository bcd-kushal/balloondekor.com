import styles from "@/components/cms/homepage/layout/skeleton/faqSkeleton.module.css";

export default function FAQSkeleton({
  isActive,
  onClick
}: {
  isActive: boolean;
  onClick: (
    layout:
      | ""
      | "banner"
      | "circle"
      | "square-m"
      | "square-l"
      | "tiles"
      | "collage"
      | "text"
      | "faq"
  ) => void;
}) {
  return (
    <div className={styles.container}>
      <h5 className={styles.layoutLabel}>FAQ</h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("faq")}
      >
        <div className={styles.layout}>
          <div className={styles.heading}></div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.title}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div
                className={styles.lineShort}
              ></div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div
                className={styles.lineShort}
              ></div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div
                className={styles.lineShort}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
