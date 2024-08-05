// libraries
import Image from "next/image";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// components
import Backdrop from "@/components/common/Backdrop";

// styles
import styles from "@/components/ui/service/info/order/date-time/calendar.module.css";
import "react-calendar/dist/Calendar.css";
import "@/components/ui/service/info/order/date-time/calendar.css";
import { CrossSVG } from "@/constants/svgs/svg";
import { SheetClose } from "@/components/ui/sheet";

export default function Calendar({
  startDate,
  initialValue,
  showClose,
  onSelect,
  onClose
}: {
  startDate: Date;
  initialValue: Date;
  showClose: boolean;
  onSelect: (date: Date) => void;
  onClose: () => void;
}) {
  return (
    <section className={styles.container}>
      <section className={styles.calendar}>
        <ReactCalendar
          minDate={startDate}
          view="month"
          defaultValue={initialValue}
          onClickDay={onSelect}
        />
        <div className={styles.doneBtnContainer}>
          {showClose ? (
            <SheetClose>
              <span className={styles.closeBtn}>
                Close
              </span>
            </SheetClose>
          ) : (
            <></>
          )}
          <SheetClose>
            <button
              className={styles.doneBtn}
              onClick={() => {}}
            >
              done
            </button>
          </SheetClose>
        </div>
      </section>
    </section>
  );
}
