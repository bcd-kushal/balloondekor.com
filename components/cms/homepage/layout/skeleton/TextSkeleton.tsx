import styles from "@/components/cms/homepage/layout/skeleton/textSkeleton.module.css";

export default function TextSkeleton({
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
      <h5 className={styles.layoutLabel}>text</h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("text")}
      >
        <div className={styles.layout}>
          <div className={styles.heading}></div>
          <div className={styles.content}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div
              className={styles.lineShort}
            ></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div
              className={styles.lineShort}
            ></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div
              className={styles.lineShort}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
