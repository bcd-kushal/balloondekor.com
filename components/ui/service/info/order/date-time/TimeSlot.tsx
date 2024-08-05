// styles
import styles from "@/components/ui/service/info/order/date-time/timeSlot.module.css";

// types
import { TimeSlotDocument } from "@/schemas/cms/deliveryType";
import { ClockIcon } from "@radix-ui/react-icons";

export default function TimeSlot({
  timeSlot,
  isActive,
  onSelect
}: {
  timeSlot: TimeSlotDocument;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={`
        ${styles.container} 
        ${isActive ? styles.active : ""}
      `}
      onClick={onSelect}
    >
      <ClockIcon
        height={18}
        width={18}
      />
      <span className={styles.label}>
        {timeSlot.label}
      </span>
    </article>
  );
}
