import styles from "@/components/cms/homepage/layout/skeleton/bannerSkeleton.module.css";

export default function BannerSkeleton({
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
        banner
      </h5>
      <div
        className={`${styles.layoutContainer} ${isActive ? styles.active : ""}`}
        onClick={() => onClick("banner")}
      >
        <div className={styles.layout}></div>
      </div>
    </div>
  );
}
