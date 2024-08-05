// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/customization-question/customizationQuestionItem.module.css";

export default function CustomizationQuestionItem({
  id,
  srNo,
  question,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  question: string;
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
        <span>{question}</span>
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
          editBtnSlug="customization-question"
          deleteModalLabel="Question"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
