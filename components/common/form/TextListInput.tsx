/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";

import TextListEditor, {
  getInitialTextListValue,
  TextListType
} from "@/components/common/form/TextListEditor";

import Button from "../Button";

import styles from "@/components/common/form/textListInput.module.css";
import { PlusSVG } from "@/constants/svgs/svg";

export default function TextListInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValues,
  srLabel,
  inputType,
  setValue
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValues: string[];
  srLabel: string;
  inputType: "text" | "longText";
  setValue: (textListValues: string[]) => void;
}) {
  const [textListValues, setTextListValues] =
    useState<TextListType[]>(
      defaultValues.length
        ? defaultValues.map((content) => ({
            _id: uuid(),
            content
          }))
        : [
            getInitialTextListValue() as TextListType
          ]
    );
  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setTextListValues((prevTextListValues) => [
      ...prevTextListValues,
      getInitialTextListValue() as TextListType
    ]);
  };

  const handleDelete = (id: string) => {
    if (textListValues.length > 1) {
      setTextListValues((prevTextListValues) =>
        prevTextListValues.filter(
          (prevTextListValue) =>
            prevTextListValue._id !== id
        )
      );
    }
  };

  const handleChange = (
    TextListValue: TextListType
  ) => {
    if (TextListValue.content) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setTextListValues((prevTextListValues) =>
      prevTextListValues.map(
        (prevTextListValue) =>
          prevTextListValue._id ===
          TextListValue._id
            ? TextListValue
            : prevTextListValue
      )
    );
  };

  useEffect(() => {
    setValue(
      textListValues
        .filter(({ content }) => Boolean(content))
        .map(({ content }) => content)
    );
  }, [textListValues]);

  return (
    <fieldset className={styles.container}>
      <legend
        className={`flex items-center justify-start gap-2 font-medium text-[15px] capitalize`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div className={styles.editors}>
        {textListValues.map(
          (textListValue, i) => (
            <TextListEditor
              key={textListValue._id || i}
              srNo={i}
              srNoLabel={srLabel}
              inputType={inputType}
              initialValue={textListValue}
              setValue={(
                TextListValue: TextListType
              ) => {
                handleChange(TextListValue);
              }}
              onDelete={() =>
                handleDelete(
                  textListValue._id as string
                )
              }
            />
          )
        )}
      </div>
      <div
        onClick={handleAdd}
        className="w-fit cursor-pointer flex items-center justify-center gap-3 py-[8px] px-[12px] text-[15px] rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black/70 border-black/30"
      >
        <PlusSVG />
        Add review
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
