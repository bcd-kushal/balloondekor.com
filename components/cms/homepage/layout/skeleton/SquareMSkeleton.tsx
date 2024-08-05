import styles from "@/components/cms/homepage/layout/skeleton/squareMSkeleton.module.css";

export default function SquareMSkeleton({
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
      <h5 className={styles.layoutLabel}>
        square (medium)
      </h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("square-m")}
      >
        <div className={styles.layout}>
          <div className={styles.heading}></div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}></div>
              <div className={styles.label}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
