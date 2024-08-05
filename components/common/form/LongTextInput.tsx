/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import Image from "next/image";

// styles
import styles from "./longTextInput.module.css";

const toList = (value: string) =>
  value
    .split("\n")
    .map((item) =>
      item.startsWith("•")
        ? item.slice(2, item.length).trim()
          ? item
          : ""
        : `• ${item}`
    )
    .join("\n");

const toText = (value: string) =>
  value
    .split("\n")
    .map((item) =>
      item.startsWith("•")
        ? item.slice(2, item.length).trim()
          ? item.slice(2, item.length).trim()
          : ""
        : ""
    )
    .filter((item) => item)
    .join("\n");

export default function LongTextInput({
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
  isList,
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
  defaultValue: string;
  resetValue?: boolean;
  isList?: boolean;
  setValue: (checkboxValue: string) => void;
}) {
  // states
  const [textValue, setTextValue] = useState(
    isList ? toList(defaultValue) : defaultValue
  );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setTextValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(
      isList ? toText(textValue) : textValue
    );
  }, [textValue]);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setTextValue(isList ? toList(value) : value);
  };

  return (
    <fieldset
      className={
        className
          ? className
          : "h-[170px] max-h-[270px] flex flex-col items-stretch justify-start gap-5 overflow-y-scroll scrollbar-hide"
      }
    >
      {title ? (
        <legend
          className={`flex items-center justify-start gap-3 text-[14px] capitalize font-medium`}
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
      <textarea
        className={`textArea w-full ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"} bg-transparent p-6 border-[1.5px] overflow-y-scroll scrollbar-hide border-black/30 hover:border-black/80 focus:outline-blue-400 focus:outline-4 outline-offset-[1px] transition-all duration-300 rounded-lg mt-2 ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
        name={name}
        placeholder={
          placeholder ? placeholder : ""
        }
        value={textValue}
        onChange={handleChange}
        cols={30}
        rows={10}
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
