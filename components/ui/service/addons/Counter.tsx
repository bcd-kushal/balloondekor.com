// styles
import styles from "@/components/ui/service/addons/counter.module.css";

export default function Counter({
  count,
  onChangeCount
}: {
  count: number;
  onChangeCount: (count: number) => void;
}) {
  return (
    <section className={styles.container}>
      <button
        className={`
            ${styles.btn}
            ${styles.decrement}
        `}
        onClick={() => {
          onChangeCount(count - 1);
        }}
      >
        <span className={styles.btnLabel}>-</span>
      </button>
      <span className={styles.label}>
        {count}
      </span>
      <button
        className={`
            ${styles.btn}
            ${styles.increment}
        `}
        onClick={() => {
          onChangeCount(count + 1);
        }}
      >
        <span className={styles.btnLabel}>+</span>
      </button>
    </section>
  );
}
