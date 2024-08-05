// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/faq/faqItem.module.css";

export default function FAQItem({
  id,
  srNo,
  category,
  count,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  category: string;
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
      <div className={styles.categoryContainer}>
        <span>{category}</span>
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
          editBtnSlug="faq"
          deleteModalLabel="faq"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
