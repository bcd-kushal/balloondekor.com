// libraries
import Link from "next/link";

// styles
import styles from "@/components/ui/serviceCategory/quickLinkItem.module.css";

export default function QuickLinkItem({
  name,
  slug,
  openIn
}: {
  name: string;
  slug: string;
  openIn?: string;
}) {
  return (
    <Link
      className={`${styles.container}`}
      href={slug}
      target={openIn || "_self"}
    >
      <span className={styles.label}>{name}</span>
    </Link>
  );
}
