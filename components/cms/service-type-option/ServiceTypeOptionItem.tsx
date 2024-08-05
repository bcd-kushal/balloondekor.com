// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/service-type-option/serviceTypeOptionItem.module.css";

export default function ServiceTypeOptionItem({
  id,
  srNo,
  name,
  price,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  name: string;
  price: number;
  isActive: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.labelContainer}>
        <span>{name}</span>
      </div>
      <div className={styles.valueContainer}>
        <span>{price}</span>
      </div>
      <div className={styles.activeContainer}>
        <Image
          className={styles.activeIcon}
          src={`/icons/${isActive ? "active" : "inactive"}-icon.svg`}
          alt={`${isActive ? "Active" : "Inactive"} Icon`}
          width={30}
          height={30}
          onClick={onToggleActive}
        />
      </div>
      <div className={styles.btnContainer}>
        <Actions
          id={id}
          editBtnSlug="service-type-option"
          deleteModalLabel="Service Type Option"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
