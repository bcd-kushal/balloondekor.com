import Image from "next/image";

// components
import Calendar from "@/components/ui/service/info/order/date-time/Calendar";
import Day from "@/components/ui/service/info/order/date-time/Day";
import Week from "@/components/ui/service/info/order/date-time/Week";

// styles
import styles from "@/components/ui/service/info/order/date-time/selectDateUI.module.css";

// types
import {
  MonthType,
  DateType,
  DayType
} from "@/components/ui/service/info/order/date-time/Day";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";

export default function SelectDateUI({
  heading,
  isSelected,
  isMobile,
  startDate,
  selectedDate,
  weekDates,
  inWeek,
  showCalendar,
  onChangeShowCalendar,
  onSelect,
  inCart
}: {
  heading: string;
  isSelected: boolean;
  isMobile: boolean;
  startDate: Date;
  selectedDate: Date;
  weekDates: Date[];
  inWeek: boolean;
  showCalendar: boolean;
  onChangeShowCalendar: (
    showCalendar: boolean
  ) => void;
  onSelect: (date: Date) => void;
  inCart?: boolean;
}) {
  const [dateToHighlight, setDateToHighlight] =
    useState<{
      date: DateType;
      day: DayType;
      month: MonthType;
    }>({
      date:
        (selectedDate.getDate() as DateType) || 1,
      day:
        (selectedDate.getDay() as DayType) || 1,
      month:
        (selectedDate.getMonth() as MonthType) ||
        0
    });

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {heading}
      </div>
      <span className="text-pink-600 max-w-[90dvw] relative left-1/2 -translate-x-1/2 text-[15px] text-center leading-tight mt-2 mb-6">
        We will arrive and complete within your
        scheduled slots
      </span>
      <section className={styles.days}>
        <Week
          dates={weekDates}
          isSelected={isSelected}
          selectedDate={selectedDate}
          onSelectDate={onSelect}
          inCart={inCart}
          setDateToHighlight={setDateToHighlight}
          dateToHighlight={dateToHighlight}
        />
        <section className={styles.selectDate}>
          {inWeek ? (
            isMobile ? (
              <Sheet>
                <SheetTrigger>
                  <div className={styles.btn}>
                    <CalendarIcon
                      width={24}
                      height={24}
                    />
                    <span
                      className={styles.btnLabel}
                    ></span>
                  </div>
                </SheetTrigger>
                <SheetContent
                  side={"bottom"}
                  className="min-w-fit min-h-fit px-2 pb-8 pt-0 rounded-ss-3xl rounded-se-3xl"
                >
                  <span className="relative">
                    <Calendar
                      startDate={startDate}
                      initialValue={selectedDate}
                      onSelect={
                        inCart
                          ? (date: Date) => {
                              setDateToHighlight(
                                (prev) => ({
                                  date:
                                    (date.getDate() as DateType) ||
                                    1,
                                  day:
                                    (date.getDay() as DayType) ||
                                    1,
                                  month:
                                    (date.getMonth() as MonthType) ||
                                    0
                                })
                              );
                              onSelect(date);
                            }
                          : onSelect
                      }
                      onClose={() => {}}
                      showClose={true}
                    />
                  </span>
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <div className={styles.btn}>
                    <CalendarIcon
                      width={24}
                      height={24}
                    />
                    <span
                      className={styles.btnLabel}
                    ></span>
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-fit min-h-fit rounded-2xl">
                  <span className="relative">
                    <Calendar
                      startDate={startDate}
                      initialValue={selectedDate}
                      onSelect={
                        inCart
                          ? (date: Date) => {
                              setDateToHighlight(
                                (prev) => ({
                                  date:
                                    (date.getDate() as DateType) ||
                                    1,
                                  day:
                                    (date.getDay() as DayType) ||
                                    1,
                                  month:
                                    (date.getMonth() as MonthType) ||
                                    0
                                })
                              );
                              onSelect(date);
                            }
                          : onSelect
                      }
                      onClose={() => {}}
                      showClose={false}
                    />
                  </span>
                </DialogContent>
              </Dialog>
            )
          ) : (
            <Day
              month={
                selectedDate.getMonth() as MonthType
              }
              date={
                selectedDate.getDate() as DateType
              }
              day={
                selectedDate.getDay() as DayType
              }
              isActive={true}
              onClick={() => {
                onChangeShowCalendar(true);
              }}
            />
          )}
        </section>
      </section>
    </section>
  );
}
