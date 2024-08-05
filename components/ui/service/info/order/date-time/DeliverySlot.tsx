// styles
import styles from "@/components/ui/service/info/order/date-time/deliverySlot.module.css";

// types
import { DeliverySlotDocument } from "@/schemas/cms/service";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";

export default function DeliverySlot({
  deliverySlot,
  isActive,
  onSelect
}: {
  deliverySlot: DeliverySlotDocument;
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
      <span className={styles.name}>
        {
          (
            deliverySlot.deliveryType as DeliveryTypeDocument
          ).name
        }
      </span>
      <span className={styles.price}>
        {deliverySlot.price === 0
          ? " Free"
          : ` ₹ ${deliverySlot.price}`}
      </span>
    </article>
  );
}
