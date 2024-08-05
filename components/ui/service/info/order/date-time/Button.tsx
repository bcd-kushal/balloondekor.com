import styles from "@/components/ui/service/info/order/date-time/button.module.css";
import Link from "next/link";

export default function Button({
  label,
  isDisabled,
  url
}: {
  label: string;
  isDisabled?: boolean;
  url: string;
}) {
  return (
    <Link
      className={`
        ${styles.container} 
        ${isDisabled ? styles.disabled : ""}
      `}
      href={url}
      target="_blank"
    >
      {label}
    </Link>
  );
}

export function SaveDateTimeButton({
  label,
  isDisabled
}: {
  label: string;
  isDisabled?: boolean;
}) {
  return (
    <div
      className={`
        ${styles.container} 
        ${isDisabled ? styles.disabled : ""}
      `}
    >
      {label}
    </div>
  );
}
