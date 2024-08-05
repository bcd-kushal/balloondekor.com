// libraries
import Image from "next/image";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "@/components/ui/service/gallery/modal/previews.module.css";

export default function Previews({
  images,
  currentIndex,
  onChangeIndex
}: {
  images: ImageDocument[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}) {
  return (
    <section className={styles.container}>
      <section className={styles.previews}>
        {images.map((image, i) => (
          <article
            key={i}
            className={`
            ${styles.preview}
            ${i === currentIndex ? styles.active : ""}
          `}
            onClick={() => {
              onChangeIndex(i);
            }}
          >
            <Image
              className={styles.previewImage}
              src={image.url}
              alt={image.alt || image.defaultAlt}
              layout="fill"
            />
          </article>
        ))}
      </section>
    </section>
  );
}
