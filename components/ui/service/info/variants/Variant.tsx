import Image from "next/image";

import styles from "@/components/ui/service/info/variants/variant.module.css";

import { ImageDocument } from "@/schemas/cms/image";

export default function Variant({
  image,
  label,
  price,
  isActive,
  onClick
}: {
  image?: ImageDocument;
  label: string;
  price?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <article
      className={`
        ${styles.container}
        ${image ? `w-[10rem]` : `min-w-[10rem]`}
        ${isActive ? styles.active : ""}
      `}
      onClick={onClick}
    >
      {image && (
        <Image
          className={styles.image}
          src={image.url}
          alt={image.alt || image.defaultAlt}
          width={100}
          height={100}
        />
      )}
      <section
        className={`
          ${styles.info}
          ${price ? "" : styles.noPrice}
        `}
      >
        <div
          className={
            image
              ? `truncate ${styles.label}`
              : `whitespace-nowrap ${styles.label}`
          }
        >
          {label.length > 12
            ? `${label.slice(0, 12)}...`
            : label}
        </div>
        {price && (
          <span
            className={styles.price}
          >{`₹ ${price}`}</span>
        )}
      </section>
    </article>
  );
}
