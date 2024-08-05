import NestedLink from "./NestedLink";

import { NestedSectionDocument } from "@/schemas/cms/navLink";

import styles from "@/components/cms/header/ui/nestedSection.module.css";

export default function NestedSection({
  nestedSection: { heading, nestedLinks }
}: {
  nestedSection: NestedSectionDocument;
}) {
  return (
    <section className={styles.container}>
      <h4 className={styles.heading}>
        {heading}
      </h4>
      <div className={styles.nestedLinks}>
        {nestedLinks.map((nestedLink) => (
          <NestedLink
            key={nestedLink._id}
            nestedLink={nestedLink}
          />
        ))}
      </div>
    </section>
  );
}
