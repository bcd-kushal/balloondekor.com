// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// styles
import styles from "@/components/cms/package-tag/packageTagItem.module.css";

export default function PackageTagItem({
  id,
  srNo,
  name,
  colorCode,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  name: string;
  colorCode: string;
  isActive: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.previewContainer}>
        <div
          className={styles.preview}
          style={{ backgroundColor: colorCode }}
        ></div>
      </div>
      <div className={styles.nameContainer}>
        <span>{name}</span>
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
          editBtnSlug="package-tag"
          deleteModalLabel="Package Tag"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
