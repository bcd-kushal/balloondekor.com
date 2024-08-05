import styles from "@/components/cms/homepage/layout/skeleton/quickLinkSkeleton.module.css";

export default function QuickLinkSkeleton({
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
      | "quick-link"
  ) => void;
}) {
  return (
    <div className={styles.container}>
      <h5 className={styles.layoutLabel}>
        Quick Link
      </h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("quick-link")}
      >
        <div className={styles.layout}>
          <div className={styles.items}>
            {Array.from({ length: 2 }).map(
              (_, i) => (
                <div
                  key={i}
                  className={styles.item}
                >
                  <div
                    className={styles.title}
                  ></div>
                  <div className={styles.links}>
                    {Array.from({
                      length: 75
                    }).map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.link} ${i % 2 === 0 ? styles.long : ""}`}
                      ></div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
