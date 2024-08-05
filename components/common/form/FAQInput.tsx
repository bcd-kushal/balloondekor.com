/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

import FAQEditor, {
  getInitialFAQValue
} from "./FAQEditor";

import { FAQDocument } from "@/schemas/cms/serviceCategory";

import Button from "../Button";

import styles from "./FAQInput.module.css";

export default function FAQInput({
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  setValue
}: {
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue?: FAQDocument[];
  setValue: (FAQValues: FAQDocument[]) => void;
}) {
  const [FAQValues, setFAQValues] = useState<
    FAQDocument[]
  >(
    (defaultValue as FAQDocument[])?.length
      ? (defaultValue as FAQDocument[])
      : [getInitialFAQValue() as FAQDocument]
  );
  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setFAQValues((prevFAQValues) => [
      ...prevFAQValues,
      getInitialFAQValue() as FAQDocument
    ]);
  };

  const handleDelete = (id: string) => {
    if (FAQValues.length > 1) {
      setFAQValues((prevFAQValues) =>
        prevFAQValues.filter(
          (prevFAQValue) =>
            prevFAQValue._id !== id
        )
      );
    }
  };

  const handleChange = (
    FAQValue: FAQDocument
  ) => {
    if (FAQValue.question && FAQValue.answer) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setFAQValues((prevFAQValues) =>
      prevFAQValues.map((prevFAQValue) =>
        prevFAQValue._id === FAQValue._id
          ? FAQValue
          : prevFAQValue
      )
    );
  };

  useEffect(() => {
    setValue(
      FAQValues.filter(
        ({ question, answer }) =>
          question && answer
      ).map(
        ({ _id, question, answer }) =>
          ({
            ...(mongoose.Types.ObjectId.isValid(
              _id
            )
              ? { _id }
              : {}),
            question,
            answer
          }) as FAQDocument
      )
    );
  }, [FAQValues]);

  return (
    <fieldset className={styles.container}>
      <legend
        className={`font-medium text-black text-[14px] flex items-center justify-start mb-[6px]`}
      >
        <span>FAQs</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div
        className={`transition-all duration-300 border-[1.5px] border-black/30 rounded-xl ${isFullscreen ? styles.fullscreen : ""} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <div
          className={`max-h-[400px] overflow-y-scroll scrollbar-hide p-4 flex flex-col items-stretch justify-start gap-[28px]`}
        >
          {FAQValues.map((FAQValue, i) => (
            <FAQEditor
              key={FAQValue._id || i}
              srNo={i}
              initialValue={FAQValue}
              setValue={(
                FAQValue: FAQDocument
              ) => {
                handleChange(FAQValue);
              }}
              onDelete={() =>
                handleDelete(
                  FAQValue._id as string
                )
              }
            />
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Button
            className={styles.toggleBtn}
            type="icon"
            label=""
            variant="normal"
            onClick={() =>
              setIsFullscreen(!isFullscreen)
            }
            iconSrc={`/icons/${isFullscreen ? "minimize" : "maximize"}-icon.svg`}
            iconSize={20}
          />
          <Button
            className={`bg-black text-white flex items-center justify-end `}
            type="icon"
            label="Add FAQ"
            variant="normal"
            onClick={handleAdd}
            iconSrc="/icons/add-icon-white.svg"
            iconSize={30}
          />
        </div>
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
