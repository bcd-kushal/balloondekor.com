import Image from "next/image";
import Link from "next/link";

import styles from "@/components/cms/header/ui/trendingLink.module.css";

export default function TrendingLink({
  label,
  path
}: {
  label: string;
  path: string;
}) {
  return (
    <Link
      className={styles.container}
      href={path}
    >
      <span>{label}</span>
      <Image
        className={styles.icon}
        src="/icons/trend.webp"
        alt="arrows icon"
        height={20}
        width={20}
      />
    </Link>
  );
}
