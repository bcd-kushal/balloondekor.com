import Image from "next/image";
import Link from "next/link";

import styles from "@/components/cms/footer/ui/socialInfo.module.css";

export default function SocialInfo({
  socialInfo: {
    url,
    image: { src, alt }
  }
}: {
  socialInfo: {
    _id: string;
    label: string;
    url: string;
    image: {
      src: string;
      alt: string;
    };
  };
}) {
  return url ? (
    <Link
      className={styles.container}
      target="_blank"
      href={url}
    >
      <Image
        className={styles.logo}
        src={src}
        alt={alt}
        width={30}
        height={30}
      />
    </Link>
  ) : (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src={src}
        alt={alt}
        width={30}
        height={30}
      />
    </div>
  );
}
