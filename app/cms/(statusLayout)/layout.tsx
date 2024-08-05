// libraries
import { ReactNode } from "react";

// components
import Status from "@/components/common/status/Status";

// styles
import styles from "./layout.module.css";

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.resize}>
      {children}
      <Status />
    </div>
  );
}
