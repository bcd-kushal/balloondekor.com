/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

import styles from "./numberInput.module.css";
import Image from "next/image";

export default function NumberInput({
  title,
  name,
  placeholder,
  className,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  resetValue,
  disabled,
  decimal,
  type,
  setValue
}: {
  title: string;
  name: string;
  placeholder?: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue: number;
  resetValue?: boolean;
  disabled?: boolean;
  decimal?: boolean;
  type?: "default" | "modern";
  setValue: (value: number) => void;
}) {
  // states
  const [numberValue, setNumberValue] =
    useState<string>(
      defaultValue === 0 || defaultValue
        ? defaultValue.toString()
        : ""
    );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setNumberValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    let numericValue = numberValue;
    if (numericValue.includes(".")) {
      const [int, frac] = numberValue.split(".");
      numericValue = `${int}.${frac ? frac.padEnd(2, "0").slice(0, 2) : "00"}`;
    }

    setValue(
      numericValue ? Number(numericValue) : NaN
    );
  }, [numberValue]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    if (decimal) {
      const numberFormatted = value
        .replace(/[^0-9.]/g, "")
        .replace(".", "$")
        .replaceAll(".", "")
        .replace("$", ".");
      const [int, frac] =
        numberFormatted.split(".");
      const numericValue = `${int ? int : value.includes(".") ? "0" : ""}${value.includes(".") ? "." : ""}${frac ? frac : ""}`;

      setNumberValue(numericValue);
    } else {
      const numericValue = value.replace(
        /[^0-9]/g,
        ""
      );

      setNumberValue(
        numericValue === ""
          ? ""
          : Number(numericValue).toString()
      );
    }
  };

  return (
    <fieldset
      className={`flex flex-col items-stretch justify-center gap-6 ${className}`}
    >
      {title ? (
        <legend
          className={`flex items-center justify-start mb-2 text-[14px] font-medium capitalize`}
        >
          <span>{title}</span>
          {isRequired && (
            <span className={`pl-1 text-red-500`}>
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <input
        className={`
          bg-transparent px-[12px] py-[8px] ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"} border-[1.5px] border-black/30 rounded-lg mt-[1px] transition-all duration-300 hover:border-black/70 outline-offset-1 focus:outline-4 focus:outline-blue-400
          ${disabled ? styles.disabled : ""} 
          ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}
        `}
        type="text"
        name={name}
        placeholder={
          placeholder ? placeholder : ""
        }
        value={numberValue}
        onChange={handleChange}
        disabled={disabled}
      />
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
