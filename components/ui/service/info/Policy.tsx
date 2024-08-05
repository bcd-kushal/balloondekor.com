import Collapsable from "@/components/client/service/Collapsable";

import styles from "@/components/ui/service/info/policy.module.css";

export default function Policy({
  title,
  policies
}: {
  title: string;
  policies: string;
}) {
  return (
    <Collapsable
      heading={title}
      headingIconSrc="/icons/policy-icon.svg"
      headingIconAlt="Includes Icon"
      collapseIconSrc="/icons/plus-icon.svg"
      notCollapseIconSrc="/icons/minus-icon.svg"
      collapseIconAlt="Collapse Icon"
    >
      {policies.split("\n").map((policy, i) => (
        <p
          key={i}
          className={styles.policy}
        >
          {`• ${policy}`}
        </p>
      ))}
    </Collapsable>
  );
}
