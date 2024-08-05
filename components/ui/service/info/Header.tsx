import styles from "@/components/ui/service/info/header.module.css";

export default function InfoHeader({
  name,
  rating,
  ratingCount
}: {
  name: string;
  rating: number;
  ratingCount: number;
}) {
  return (
    <section className={styles.container}>
      <section
        className={styles.headingContainer}
      >
        <h1 className={styles.heading}>{name}</h1>
        {Boolean(rating) && (
          <section
            className={styles.ratingContainer}
          >
            <span className={styles.rating}>
              <span>{`★`}</span>
              <span
                className={styles.ratingValue}
              >
                {rating}
              </span>
            </span>
            {Boolean(ratingCount) && (
              <span
                className={styles.ratingCount}
              >
                <span
                  className={
                    styles.ratingCountValue
                  }
                >
                  {ratingCount}
                </span>
                <span>{` ratings`}</span>
              </span>
            )}
          </section>
        )}
      </section>
    </section>
  );
}
