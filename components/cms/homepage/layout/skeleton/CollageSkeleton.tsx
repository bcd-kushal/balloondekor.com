import styles from "@/components/cms/homepage/layout/skeleton/collageSkeleton.module.css";

export default function CollageSkeleton({
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
    <div
      className={styles.container}
      onClick={() => onClick("collage")}
    >
      <h5 className={styles.layoutLabel}>
        collage
      </h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("collage")}
      >
        <div className={styles.layout}>
          <div className={styles.heading}></div>
          <div
            className={styles.subHeading}
          ></div>
          <div className={styles.sections}>
            <div className={styles.leftItems}>
              <div className={styles.header}>
                <div
                  className={styles.title}
                ></div>
                <div className={styles.btn}></div>
              </div>
              <div className={styles.items}>
                <div className={styles.col}>
                  <div className={styles.item}>
                    <div
                      className={`${styles.image} ${styles.rect}`}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                  <div className={styles.item}>
                    <div
                      className={styles.image}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.item}>
                    <div
                      className={styles.image}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                  <div className={styles.item}>
                    <div
                      className={`${styles.image} ${styles.rect}`}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightItems}>
              <div className={styles.header}>
                <div
                  className={styles.title}
                ></div>
                <div className={styles.btn}></div>
              </div>
              <div className={styles.items}>
                <div className={styles.col}>
                  <div className={styles.item}>
                    <div
                      className={`${styles.image} ${styles.rect}`}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                  <div className={styles.item}>
                    <div
                      className={styles.image}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.item}>
                    <div
                      className={styles.image}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                  <div className={styles.item}>
                    <div
                      className={`${styles.image} ${styles.rect}`}
                    ></div>
                    <div
                      className={styles.label}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
