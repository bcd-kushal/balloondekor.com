// styles
import styles from "@/components/ui/service/addons/categories.module.css";

export default function Categories({
  categories,
  activeCategoryIndex,
  onChangeActiveCategoryIndex
}: {
  categories: string[];
  activeCategoryIndex: number;
  onChangeActiveCategoryIndex: (
    index: number
  ) => void;
}) {
  return (
    <section className={styles.categories}>
      {categories.map((category, i) => (
        <div
          key={i}
          className={`
        ${styles.category}
        ${i === activeCategoryIndex ? styles.active : ""}
      `}
          onClick={() => {
            onChangeActiveCategoryIndex(i);
          }}
        >
          {category}
        </div>
      ))}
    </section>
  );
}
