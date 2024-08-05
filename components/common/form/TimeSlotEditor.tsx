/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";

import { TimeSlotDocument } from "@/schemas/cms/deliveryType";

import styles from "@/components/common/form/timeSlotEditor.module.css";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialTimeSlotValue =
  (): Partial<TimeSlotDocument> => ({
    _id: uuid(),
    label: "",
    startTime: "",
    endTime: ""
  });

export default function TimeSlotEditor({
  srNo,
  initialValue = getInitialTimeSlotValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<TimeSlotDocument>;
  setValue: (value: TimeSlotDocument) => void;
  onDelete: () => void;
}) {
  const [timeSlot, setTimeSlot] =
    useState<Partial<TimeSlotDocument>>(
      initialValue
    );

  const formatDate = (date: string) => {
    const [hoursStr, minutesStr] =
      date.split(":");
    const [hours, minutes] = [
      Number(hoursStr),
      Number(minutesStr)
    ];

    const isAM = hours < 12;

    return `${isAM ? (!hours ? "12" : hours.toString().padStart(2, "0")) : hours === 12 ? "12" : (hours - 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAM ? "AM" : "PM"}`;
  };

  const handleLabelChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setTimeSlot((prevTimeSlot) => ({
      ...prevTimeSlot,
      label: value
    }));
  };

  const handleStartTimeChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setTimeSlot((prevTimeSlot) => ({
      ...prevTimeSlot,
      startTime: value
    }));

    if (timeSlot.endTime) {
      setTimeSlot((prevTimeSlot) => ({
        ...prevTimeSlot,
        label: `${formatDate(value)} - ${formatDate(prevTimeSlot.endTime!)}`
      }));
    }
  };

  const handleEndTimeChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setTimeSlot((prevTimeSlot) => ({
      ...prevTimeSlot,
      endTime: value
    }));

    if (timeSlot.startTime) {
      setTimeSlot((prevTimeSlot) => ({
        ...prevTimeSlot,
        label: `${formatDate(prevTimeSlot.startTime!)} - ${formatDate(value)}`
      }));
    }
  };

  useEffect(() => {
    setValue(timeSlot as TimeSlotDocument);
  }, [timeSlot]);

  return (
    <div className={styles.container}>
      <span className={styles.srNoContainer}>
        {`${srNo + 1}.`}
      </span>
      <div className={styles.inputsContainer}>
        <input
          className={`border-[1.5px] border-black/30 p-4 rounded-lg bg-transparent`}
          type="time"
          min={"00:01"}
          max={"23:59"}
          name="startTime"
          value={timeSlot.startTime}
          onChange={handleStartTimeChange}
        />
        <input
          className={`border-[1.5px] border-black/30 p-4 rounded-lg bg-transparent`}
          type="time"
          min={"00:01"}
          max={"23:59"}
          name="endTime"
          value={timeSlot.endTime}
          onChange={handleEndTimeChange}
        />
        <input
          className={`border-[1.5px] border-black/30 p-4 rounded-lg bg-transparent`}
          type="text"
          name="label"
          placeholder="label"
          value={timeSlot.label}
          onChange={handleLabelChange}
        />
      </div>
      <div
        onClick={onDelete}
        className="p-5 cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 hover:bg-red-700 group"
      >
        <BinSVG
          className="group-hover:stroke-white transition-all duration-300"
          dimensions={20}
        />
      </div>
    </div>
  );
}
