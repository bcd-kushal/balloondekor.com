/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

// styles
import styles from "./dateInput.module.css";

interface Props {
  title: string;
  name: string;
  isRequired: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue: string;
  resetValue?: boolean;
  setValue: (dateValue: string) => void;
}

// component
export default function DateInput(props: Props) {
  // props
  const {
    title,
    name,
    isRequired,
    showError,
    errorMessage,
    defaultValue,
    resetValue,
    setValue
  } = props;

  // states
  const [dateValue, setDateValue] =
    useState(defaultValue);

  useEffect(() => {
    if (resetValue) {
      setDateValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(dateValue);
  }, [dateValue]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setDateValue(value);
  };

  return (
    <fieldset className={styles.container}>
      {title ? (
        <legend
          className={`text-[15px] font-medium flex items-center justify-start gap-2 capitalize mb-2`}
        >
          <span>{title}</span>
          {isRequired && (
            <span className={styles.required}>
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <input
        placeholder={""}
        className={`border-[1.5px] border-black/30 rounded-lg text-left w-full py-[8px] px-[10px] text-[14px] uppercase ${showError ? styles.error : ""}`}
        type="date"
        name={name}
        value={dateValue}
        onChange={handleChange}
      />
      {showError && (
        <p className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
}
