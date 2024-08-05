import { useRouter } from "next/navigation";
import { NestedLinkDocument } from "@/schemas/cms/navLink";

import styles from "@/components/cms/header/ui/nestedLink.module.css";

export default function NestedLink({
  nestedLink: { label, url, tag }
}: {
  nestedLink: NestedLinkDocument;
}) {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => router.push(url)}
    >
      <span className={styles.link}>{label}</span>
      {tag.label && tag.color ? (
        <div
          className={styles.tag}
          style={{
            backgroundColor: tag.color
          }}
        >
          {tag.label}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
