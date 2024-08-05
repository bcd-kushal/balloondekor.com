import Link from "next/link";

import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";

import styles from "@/components/cms/footer/ui/linkSection.module.css";

export default function LinkSection({
  footerLinkSection: { heading, links }
}: {
  footerLinkSection: FooterLinkSectionDocument;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.sectionHeading}>
        {heading}
      </div>
      <div className={styles.links}>
        {links.map(({ _id, label, url }) => (
          <Link
            key={_id}
            className={styles.link}
            href={url}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
