"use client";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import StatusItem from "./StatusItem";

//styles
import styles from "./status.module.css";

export default function Status() {
  const { statusList, dismissStatus: dismiss } =
    useStatusContext();

  return (
    <div className={styles.container}>
      {statusList.map((status) => (
        <StatusItem
          key={status._id as string}
          status={status}
          dismissStatus={dismiss}
        />
      ))}
    </div>
  );
}
