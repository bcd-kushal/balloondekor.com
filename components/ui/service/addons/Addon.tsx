// libraries
import Image from "next/image";

// counter
import Counter from "@/components/ui/service/addons/Counter";

// styles
import styles from "@/components/ui/service/addons/addon.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";

export default function Addon({
  image: { alt, defaultAlt, url },
  name,
  price,
  count,
  onChangeCount
}: {
  image: ImageDocument;
  name: string;
  price: number;
  count: number;
  onChangeCount: (count: number) => void;
}) {
  return (
    <article
      className={styles.container}
      title={name}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={url}
          alt={alt || defaultAlt}
          layout="fill"
        />
      </div>
      <section className={styles.info}>
        <div
          className={`truncate ${styles.name}`}
        >
          {name}
        </div>
        <span
          className={styles.price}
        >{`₹ ${price}`}</span>
      </section>
      <section className={styles.actions}>
        {count ? (
          <Counter
            count={count}
            onChangeCount={onChangeCount}
          />
        ) : (
          <button
            className={styles.btn}
            onClick={() => {
              onChangeCount(1);
            }}
          >
            add
          </button>
        )}
      </section>
    </article>
  );
}
