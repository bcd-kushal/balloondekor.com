// components
import Day from "@/components/ui/service/info/order/date-time/Day";

// styles
import styles from "@/components/ui/service/info/order/date-time/week.module.css";

// types
import {
  MonthType,
  DateType,
  DayType
} from "@/components/ui/service/info/order/date-time/Day";
import { SetStateAction } from "react";

export default function Week({
  dates,
  isSelected,
  selectedDate,
  inCart,
  dateToHighlight,
  onSelectDate,
  setDateToHighlight
}: {
  dates: Date[];
  isSelected: boolean;
  selectedDate: Date;
  inCart?: boolean;
  onSelectDate: (date: Date) => void;
  dateToHighlight?: {
    date: DateType;
    day: DayType;
    month: MonthType;
  };
  setDateToHighlight?: React.Dispatch<
    SetStateAction<{
      month: MonthType;
      date: DateType;
      day: DayType;
    }>
  >;
}) {
  const isToday = (
    date: Date,
    index: number
  ): boolean =>
    index === 0 &&
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() ===
      new Date().getFullYear();

  const isTomorrow = (
    date: Date,
    index: number
  ): boolean =>
    index === 0 &&
    date.getDate() ===
      new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).getDate() &&
    date.getMonth() ===
      new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).getMonth() &&
    date.getFullYear() ===
      new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).getFullYear();

  const isActive = (date: Date) =>
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() ===
      selectedDate.getFullYear();

  return (
    <section className={styles.container}>
      {dates.map((date, i) => (
        <Day
          key={i}
          month={date.getMonth() as MonthType}
          date={date.getDate() as DateType}
          day={date.getDay() as DayType}
          isToday={isToday(date, i)}
          isTomorrow={isTomorrow(date, i)}
          isActive={isSelected && isActive(date)}
          onClick={() => {
            onSelectDate(date);
          }}
          inCart={inCart}
          setDateToHighlight={setDateToHighlight}
          dateToHighlight={dateToHighlight}
        />
      ))}
    </section>
  );
}
