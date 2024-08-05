/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import RichTextEditor from "./RichTextEditor";

import styles from "./richTextInput.module.css";

type Props = {
  title: string;
  name: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue: string;
  resetValue?: boolean;
  setValue: (value: string) => void;
};

export default function RichTextInput(
  props: Props
) {
  const {
    title,
    name,
    className,
    isRequired,
    hasSubmitted,
    showError,
    errorMessage,
    defaultValue,
    resetValue,
    setValue
  } = props;

  // states
  const [textValue, setTextValue] =
    useState<string>(defaultValue);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setTextValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(textValue);
  }, [textValue]);

  const handleChange = (value: string) => {
    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setTextValue(value);
  };

  return (
    <fieldset className={`${className}`}>
      {title ? (
        <legend
          className={`flex items-center justify-start gap-1 text-[14px] font-medium capitalize mb-[4px]`}
        >
          <span>{title}</span>
          {isRequired && (
            <span className={`text-red-500`}>
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <div
        className={`bg-transparent ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <RichTextEditor
          defaultValue={textValue}
          onChange={handleChange}
        />
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
