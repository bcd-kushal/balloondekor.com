// libraries
import Image from "next/image";

// styles
import styles from "@/components/ui/service/gallery/canvas/badge.module.css";

export default function Badge({
  iconSrc,
  iconAlt,
  label
}: {
  iconSrc: string;
  iconAlt: string;
  label: string;
}) {
  return (
    <article className={styles.container}>
      <div className={styles.iconContainer}>
        <Image
          className={styles.icon}
          src={iconSrc}
          alt={iconAlt}
          layout="fill"
        />
      </div>
      <span className={styles.label}>
        {label}
      </span>
    </article>
  );
}
