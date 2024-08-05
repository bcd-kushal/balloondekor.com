import styles from "@/components/ui/service/info/order/date-time/day.module.css";
import { SetStateAction, useState } from "react";

export const MONTH = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec"
};

export const DAY = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat"
};

export type MonthType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;

export type DateType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type DayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default function Day({
  month,
  date,
  day,
  isActive,
  isToday,
  isTomorrow,
  inCart,
  dateToHighlight,
  onClick,
  setDateToHighlight
}: {
  month: MonthType;
  date: DateType;
  day: DayType;
  isActive?: boolean;
  isToday?: boolean;
  isTomorrow?: boolean;
  inCart?: boolean;
  dateToHighlight?: {
    date: DateType;
    day: DayType;
    month: MonthType;
  };
  onClick: () => void;
  setDateToHighlight?: React.Dispatch<
    SetStateAction<{
      month: MonthType;
      date: DateType;
      day: DayType;
    }>
  >;
}) {
  const handleCartAction = () => {
    onClick();
    if (setDateToHighlight)
      setDateToHighlight((prev) => ({
        month: month,
        date: date,
        day: day
      }));
  };

  const getSuffix = (date: number): string => {
    if (
      date === 1 ||
      date === 21 ||
      date === 31
    ) {
      return "st";
    } else if (date === 2 || date === 22) {
      return "nd";
    } else if (date === 3 || date === 23) {
      return "rd";
    } else {
      return "th";
    }
  };

  return (
    <article
      className={`
        ${styles.container}
        ${isActive || (inCart && dateToHighlight && dateToHighlight.date === date && dateToHighlight.day === day && dateToHighlight.month === month) ? styles.active : ""}
      `}
      onClick={
        inCart ? handleCartAction : onClick
      }
    >
      {isToday || isTomorrow ? (
        <>
          <span
            className={
              isToday
                ? styles.today
                : styles.tomorrow
            }
          >
            {isToday ? "today" : "tomorrow"}
          </span>
          <span className={styles.todayDate}>
            {`${DAY[day]} ${date}${getSuffix(date)}`}
          </span>
        </>
      ) : (
        <>
          <span className={styles.month}>
            {MONTH[month]}
          </span>
          <span className={styles.date}>
            {date}
          </span>
          <span className={styles.day}>
            {DAY[day]}
          </span>
        </>
      )}
    </article>
  );
}
