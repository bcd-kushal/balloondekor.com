// components
import DeliverySlot from "@/components/ui/service/info/order/date-time/DeliverySlot";

// styles
import styles from "@/components/ui/service/info/order/date-time/deliverySlots.module.css";

// types
import { DeliverySlotDocument } from "@/schemas/cms/service";

export default function DeliverySlots({
  heading,
  deliverySlots,
  selected,
  onSelect
}: {
  heading: string;
  deliverySlots: DeliverySlotDocument[];
  selected: string;
  onSelect: (deliveryTypeId: string) => void;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {heading}
      </div>
      <section
        className={`grid grid-cols-1 items-start justify-center gap-5 py-4 px-3 sm:px-0 sm:gap-2 max-h-[50dvh] overflow-y-scroll scrollbar-hide`}
      >
        {deliverySlots.map((deliverySlot, i) => (
          <DeliverySlot
            key={i}
            deliverySlot={deliverySlot}
            isActive={
              deliverySlot._id === selected
            }
            onSelect={() => {
              onSelect(deliverySlot._id);
            }}
          />
        ))}
      </section>
    </section>
  );
}
