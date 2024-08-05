// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/review/reviewItem.module.css";

export default function ReviewItem({
  id,
  srNo,
  reviewCategory,
  count,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  reviewCategory: string;
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
      <div
        className={styles.reviewCategoryContainer}
      >
        <span>{reviewCategory}</span>
        <span className={styles.pill}>
          {count}
        </span>
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
          editBtnSlug="review"
          deleteModalLabel="Review"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
