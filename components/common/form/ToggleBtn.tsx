//styles
import { useState } from "react";

import styles from "@/components/common/form/toggleBtn.module.css";

export default function ToggleBtn({
  isActive,
  toggleActive
}: {
  isActive: boolean;
  toggleActive: () => void;
}) {
  const [hasChanged, setHasChanged] =
    useState<boolean>();

  const handleToggle = () => {
    if (!hasChanged) {
      setHasChanged(true);
    }

    toggleActive();
  };

  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : hasChanged ? styles.inactive : ""}`}
      onClick={handleToggle}
    >
      <span
        className={`${styles.circle} ${
          isActive
            ? styles.circleActive
            : hasChanged
              ? styles.circleInactive
              : ""
        }`}
      ></span>
    </div>
  );
}
