import styles from "@/components/ui/serviceCategory/priceUI.module.css";

export default function PriceUI({
  mrp,
  price,
  discount
}: {
  mrp: number;
  price: number;
  discount: number;
}) {
  return (
    <section className={styles.container}>
      <span className={styles.price}>
        {`₹ ${price}`}
      </span>
      {Boolean(discount) && (
        <>
          <del
            className={styles.mrp}
          >{`₹ ${mrp}`}</del>
          <span
            className={styles.discount}
          >{`(${discount}% off)`}</span>
        </>
      )}
    </section>
  );
}
