// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/delivery-type/deliveryTypeItem.module.css";

export default function DeliveryTypeItem({
  id,
  srNo,
  name,
  price,
  count,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  name: string;
  price: number;
  count: number;
  isActive: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.nameContainer}>
        <span>{name}</span>
        <span className={styles.pill}>
          {count}
        </span>
      </div>
      <div className={styles.priceContainer}>
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
          editBtnSlug="delivery-type"
          deleteModalLabel="Type"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
