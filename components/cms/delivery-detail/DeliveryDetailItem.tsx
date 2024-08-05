// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/delivery-detail/deliveryDetailItem.module.css";

export default function DeliveryDetailItem({
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
    <div className={styles.container}>
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
          editBtnSlug="delivery-detail"
          deleteModalLabel="Delivery Detail"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}