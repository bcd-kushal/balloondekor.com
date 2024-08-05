// components
import TimeSlot from "@/components/ui/service/info/order/date-time/TimeSlot";

// styles
import styles from "@/components/ui/service/info/order/date-time/timeSlots.module.css";
import { CrossCalendarSVG } from "@/constants/svgs/svg";

// types
import { TimeSlotDocument } from "@/schemas/cms/deliveryType";

export default function TimeSlots({
  heading,
  timeSlots,
  selected,
  onSelect
}: {
  heading: string;
  timeSlots: TimeSlotDocument[];
  selected: string;
  onSelect: (timeSlotId: string) => void;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {heading}
      </div>
      <span className="text-pink-600 max-w-[250px] relative left-1/2 -translate-x-1/2 text-[16px] text-center leading-tight mt-2 mb-6">
        We will arrive and complete within your
        scheduled slots
      </span>
      <section
        className={`grid grid-cols-1 items-start justify-center min-h-fit  overflow-y-scroll w-full scrollbar-hide  sm:px-0 gap-3 sm:gap-2 pr-1`}
      >
        {timeSlots.length ? (
          timeSlots.map((timeSlot, i) => (
            <TimeSlot
              key={i}
              timeSlot={timeSlot}
              isActive={timeSlot._id === selected}
              onSelect={() => {
                onSelect(timeSlot._id);
              }}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center text-[15px] flex flex-col items-center gap-5 justify-center">
            <CrossCalendarSVG dimensions={44} />
            <span>
              {" "}
              No available time slots today.{" "}
              <br /> Pick a time slot in future
            </span>
          </div>
        )}
      </section>
    </section>
  );
}
