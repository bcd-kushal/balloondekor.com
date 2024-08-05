import Collapsable from "@/components/client/service/Collapsable";

import styles from "@/components/ui/service/info/delivery.module.css";

export default function Delivery({
  title,
  details
}: {
  title: string;
  details: string;
}) {
  return (
    <Collapsable
      heading={title}
      headingIconSrc="/icons/delivery-icon.svg"
      headingIconAlt="Includes Icon"
      collapseIconSrc="/icons/plus-icon.svg"
      notCollapseIconSrc="/icons/minus-icon.svg"
      collapseIconAlt="Collapse Icon"
    >
      {details.split("\n").map((detail, i) => (
        <p
          key={i}
          className={styles.detail}
        >
          {`• ${detail}`}
        </p>
      ))}
    </Collapsable>
  );
}
