import Link from "next/link";

import styles from "@/components/cms/homepage/layout/ui/quickLinkLink.module.css";

export default function QuickLinkLink({
  label,
  url,
  isLast
}: {
  label: string;
  url: string;
  isLast: boolean;
}) {
  return (
    <>
      <Link
        className={styles.link}
        href={url}
      >
        {label}
      </Link>
      {isLast ? (
        <></>
      ) : (
        <div className={styles.separator}>|</div>
      )}
    </>
  );
}
