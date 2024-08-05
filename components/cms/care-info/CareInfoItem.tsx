// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/care-info/careInfoItem.module.css";

export default function CareInfoItem({
  id,
  srNo,
  label,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  label: string;
  isActive: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.labelContainer}>
        <span>{label}</span>
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
          editBtnSlug="care-info"
          deleteModalLabel="Care Info"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
