// libraries
import Image from "next/image";

// components
import Actions from "@/components/cms/Actions";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "@/components/cms/city/cityItem.module.css";

export default function CityItem({
  id,
  srNo,
  name,
  isTopCity,
  icon,
  isActive,
  onToggleActive,
  onDelete
}: {
  id: string;
  srNo: number;
  name: string;
  isTopCity: boolean;
  icon: ImageDocument | null;
  isActive: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.srNoContainer}>
        {srNo}
      </div>
      <div className={styles.iconContainer}>
        {icon ? (
          <Image
            className={styles.icon}
            src={icon.url}
            alt={icon.alt}
            width={40}
            height={40}
          />
        ) : (
          <div className={styles.iconPlaceholder}>
            no icon
          </div>
        )}
      </div>
      <div className={styles.nameContainer}>
        <span>{name}</span>
        {isTopCity ? (
          <span className={styles.pill}>
            top city
          </span>
        ) : (
          <></>
        )}
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
          editBtnSlug="city"
          deleteModalLabel="city"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
