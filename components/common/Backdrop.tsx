import { ReactNode } from "react";

import styles from "./backdrop.module.css";

type Position = {
  [key: string]: string;
};

const vertical: Position = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end"
};

const horizontal: Position = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

export default function Backdrop({
  verticalPosition = "center",
  horizontalPosition = "center",
  onClick = () => {},
  children
}: {
  verticalPosition?: "top" | "center" | "bottom";
  horizontalPosition?:
    | "left"
    | "center"
    | "right";
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={styles.container}
      style={{
        alignItems: vertical[verticalPosition],
        justifyContent:
          horizontal[horizontalPosition]
      }}
    >
      <div
        className={styles.backdrop}
        onClick={onClick}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
