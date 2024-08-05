/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

// components
import SelectDateUI from "@/components/ui/service/info/order/date-time/SelectDateUI";
import { DialogClose } from "@/components/ui/dialog";

export default function SelectDate({
  heading,
  isSelected,
  isMobile,
  startDate,
  selectedDate,
  onSelect,
  inCart,
  handleSubmitChosenDate,
  serviceId,
  prevDate
}: {
  heading: string;
  isSelected: boolean;
  isMobile: boolean;
  startDate: Date;
  selectedDate: Date;
  onSelect: (date: Date) => void;
  inCart?: boolean;
  handleSubmitChosenDate?: (
    serviceId: string,
    relatedDate: string,
    chosenDate: Date
  ) => void;
  serviceId?: string;
  prevDate?: string;
}) {
  const [weekDates, setWeekDates] = useState<
    Date[]
  >([
    startDate,
    ...Array.from({ length: 6 }).map((_, i) =>
      addDays(startDate, i + 1)
    )
  ]);
  const [inWeek, setInWeek] =
    useState<boolean>(false);

  const [showCalendar, setShowCalendar] =
    useState<boolean>(false);

  const [chosenDate, setChosenDate] =
    useState<Date>(selectedDate);

  const handleDateSelect = (date: Date) => {
    setChosenDate((prev) => date);
  };

  useEffect(() => {
    setInWeek(
      Boolean(
        weekDates.filter(
          (date) =>
            date.getDate() ===
              selectedDate.getDate() &&
            date.getMonth() ===
              selectedDate.getMonth() &&
            date.getFullYear() ===
              selectedDate.getFullYear()
        ).length
      )
    );
  }, [selectedDate]);

  return (
    <>
      <SelectDateUI
        heading={heading}
        isSelected={isSelected}
        startDate={startDate}
        selectedDate={selectedDate}
        isMobile={isMobile}
        weekDates={weekDates}
        inWeek={inWeek}
        showCalendar={showCalendar}
        onChangeShowCalendar={setShowCalendar}
        onSelect={
          inCart ? handleDateSelect : onSelect
        }
        inCart={inCart}
      />
      {inCart &&
      handleSubmitChosenDate &&
      prevDate &&
      serviceId ? (
        <DialogClose>
          <div
            className="bg-[#cd378c] rounded-xl text-[18px] capitalize font-medium tracking-wider flex items-center justify-center text-white py-3 mt-4"
            onClick={() =>
              handleSubmitChosenDate(
                serviceId,
                prevDate,
                chosenDate
              )
            }
          >
            Save
          </div>
        </DialogClose>
      ) : (
        <></>
      )}
    </>
  );
}
