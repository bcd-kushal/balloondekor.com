// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/header/headerLinkItem.module.css";

export default function HeaderLinkItem({
  id,
  srNo,
  label,
  isActive,
  onToggleActive,
  onMoveUp,
  onMoveDown,
  onDelete
}: {
  id: string;
  srNo: number;
  label: string;
  isActive: boolean;
  onToggleActive: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.labelContainer}>
        <span>{label}</span>
      </div>
      <div className={styles.orderContainer}>
        <Image
          className={styles.icon}
          src={`/icons/up-icon.svg`}
          alt={`Up Icon`}
          width={30}
          height={30}
          onClick={onMoveUp}
        />
        <Image
          className={styles.icon}
          src={`/icons/down-icon.svg`}
          alt={`Down Icon`}
          width={30}
          height={30}
          onClick={onMoveDown}
        />
      </div>
      <div className={styles.activeContainer}>
        <Image
          className={styles.icon}
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
          editBtnSlug="header"
          deleteModalLabel="Nav Link"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
