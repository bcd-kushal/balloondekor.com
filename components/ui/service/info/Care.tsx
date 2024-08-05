import Collapsable from "@/components/client/service/Collapsable";

import styles from "@/components/ui/service/info/care.module.css";

export default function Care({
  title,
  infos
}: {
  title: string;
  infos: string;
}) {
  return (
    <Collapsable
      radiusAmount="0rem 0rem 1rem 1rem"
      heading={title}
      headingIconSrc="/icons/care-icon.svg"
      headingIconAlt="Includes Icon"
      collapseIconSrc="/icons/plus-icon.svg"
      notCollapseIconSrc="/icons/minus-icon.svg"
      collapseIconAlt="Collapse Icon"
    >
      {infos.split("\n").map((info, i) => (
        <p
          key={i}
          className={styles.info}
        >
          {`• ${info}`}
        </p>
      ))}
    </Collapsable>
  );
}
