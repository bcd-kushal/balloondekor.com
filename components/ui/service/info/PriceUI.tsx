// styles
import styles from "@/components/ui/service/info/priceUI.module.css";
import React from "react";

export default function PriceUI({
  mrp,
  price,
  discount,
  rating,
  ratingCount,
  priceRef
}: {
  mrp: number;
  price: number;
  discount: number;
  rating: number;
  ratingCount: number;
  priceRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <section className={styles.container}>
      <div
        className={styles.priceDiscountContainer}
      >
        <section
          className={styles.priceContainer}
        >
          <span
            className={styles.priceInfo}
            ref={priceRef}
          >
            <span className={styles.currency}>
              ₹
            </span>
            <span className={styles.price}>
              {price}
            </span>
          </span>
          <span className={styles.disclaimer}>
            including all charges
          </span>
        </section>
        {Boolean(discount) && (
          <section
            className={styles.mrpContainer}
          >
            <del
              className={styles.mrp}
            >{`₹ ${mrp}`}</del>
            <span className={styles.discount}>
              {`(${discount}% off)`}
            </span>
          </section>
        )}
      </div>
    </section>
  );
}
