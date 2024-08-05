// libraries
import Image from "next/image";

// styles
import styles from "@/components/ui/city/topCity.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";

export default function TopCity({
  name,
  icon: { alt, defaultAlt, url },
  onSelect
}: {
  name: string;
  icon: ImageDocument;
  onSelect: () => void;
}) {
  return (
    <article
      className={styles.container}
      onClick={onSelect}
    >
      <Image
        className={styles.icon}
        src={url}
        alt={alt || defaultAlt}
        width={100}
        height={100}
      />
      <span className={styles.name}>{name}</span>
    </article>
  );
}
