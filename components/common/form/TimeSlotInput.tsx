/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

import { TimeSlotDocument } from "@/schemas/cms/deliveryType";

import TimeSlotEditor, {
  getInitialTimeSlotValue
} from "@/components/common/form/TimeSlotEditor";
import Button from "../Button";

import styles from "@/components/common/form/timeSlotInput.module.css";
import { PlusSVG } from "@/constants/svgs/svg";

export default function TimeSlotInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValues,
  setValue
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValues: TimeSlotDocument[];
  setValue: (
    timeSlots: TimeSlotDocument[]
  ) => void;
}) {
  const [timeSlots, setTimeSlots] = useState<
    TimeSlotDocument[]
  >(
    defaultValues.length
      ? defaultValues
      : [
          getInitialTimeSlotValue() as TimeSlotDocument
        ]
  );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setTimeSlots((prevTimeSlots) => [
      ...prevTimeSlots,
      getInitialTimeSlotValue() as TimeSlotDocument
    ]);
  };

  const handleDelete = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.filter(
          (prevTimeSlot) =>
            prevTimeSlot._id !== id
        )
      );
    }
  };

  const handleChange = (
    timeSlot: TimeSlotDocument
  ) => {
    if (
      timeSlot.label &&
      timeSlot.startTime &&
      timeSlot.endTime
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.map((prevTimeSlot) =>
        prevTimeSlot._id === timeSlot._id
          ? timeSlot
          : prevTimeSlot
      )
    );
  };

  useEffect(() => {
    setValue(
      timeSlots
        .filter(
          ({ label, startTime, endTime }) =>
            label && startTime && endTime
        )
        .map(
          ({ _id, label, startTime, endTime }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              label,
              startTime,
              endTime
            }) as TimeSlotDocument
        )
    );
  }, [timeSlots]);

  return (
    <fieldset className={styles.container}>
      <legend
        className={`flex items-center justify-start gap-2 text-[15px] font-medium capitalize pb-8`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div className={styles.header}>
        <div className={styles.heading}>srNo</div>
        <div className={styles.inputHeadings}>
          <div className={styles.heading}>
            start time
          </div>
          <div className={styles.heading}>
            end time
          </div>
          <div className={styles.heading}>
            label
          </div>
        </div>
      </div>
      <div className={styles.input}>
        <div className={styles.editors}>
          {timeSlots.map((timeSlot, i) => (
            <TimeSlotEditor
              key={timeSlot._id || i}
              srNo={i}
              initialValue={timeSlot}
              setValue={(
                timeSlot: TimeSlotDocument
              ) => {
                handleChange(timeSlot);
              }}
              onDelete={() =>
                handleDelete(timeSlot._id)
              }
            />
          ))}
        </div>
      </div>
      <div
        onClick={handleAdd}
        className="absolute translate-y-8 bottom-0 right-0 bg-black text-white cursor-pointer px-[12px] py-[8px] rounded-lg text-[15px] flex items-center justify-end gap-3"
      >
        <PlusSVG />
        Add slot
      </div>
      {errorMessage ? (
        <p className={styles.errorMessage}>
          {hasSubmitted || hasChanged ? (
            <Image
              className={styles.errorMessageIcon}
              src={`/icons/${showError ? "error" : "success"}-icon.svg`}
              alt={"Validation Icon"}
              width={12}
              height={12}
              unoptimized
            />
          ) : (
            <></>
          )}
          <span
            className={styles.errorMessageText}
          >
            {(hasSubmitted || hasChanged) &&
            showError
              ? errorMessage
              : ""}
          </span>
        </p>
      ) : (
        <></>
      )}
    </fieldset>
  );
}
