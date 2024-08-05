"use client";

//libraries
import Image from "next/image";

// types
import { StatusType } from "@/types/cms/common";

//styles
import styles from "./statusItem.module.css";

export default function StatusItem({
  status,
  dismissStatus
}: {
  status: StatusType;
  dismissStatus: (statusId: string) => void;
}) {
  const { _id: id, type, message } = status;

  return (
    <div
      className={`${styles.container} ${type === "success" ? styles.success : ""} ${type === "warning" ? styles.warning : ""} ${type === "error" ? styles.error : ""}`}
    >
      <Image
        className={styles.statusIcon}
        src={`/icons/${type}-icon.svg`}
        alt="Status Icon"
        height={50}
        width={50}
        unoptimized
      />
      <Image
        className={styles.closeIcon}
        src="/icons/close-icon.svg"
        height={15}
        width={15}
        unoptimized
        alt="Dismiss Icon"
        onClick={() =>
          dismissStatus(id as string)
        }
      />
      <div className={styles.content}>
        <p className={styles.message}>
          {message}
        </p>
      </div>
    </div>
  );
}
