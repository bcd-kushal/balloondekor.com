/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

// styles
import styles from "./checkboxInput.module.css";

interface Props {
  title: string;
  name: string;
  isRequired: boolean;
  showError: boolean;
  errorMessage: string;
  options: { label: string; value: string }[];
  defaultValues: string[];
  setValues: (checkboxValues: string[]) => void;
}

// component
export default function CheckboxInput(
  props: Props
) {
  // props
  const {
    title,
    name,
    isRequired,
    showError,
    errorMessage,
    options,
    defaultValues,
    setValues
  } = props;

  type State = {
    [key: string]: boolean;
  };

  const state: State = {};
  options.map(({ value }) => {
    state[value] = defaultValues.includes(value);
  });

  // states
  const [checkboxValues, setCheckboxValues] =
    useState(state);
  const [checkedValues, setCheckedValues] =
    useState(defaultValues);

  useEffect(() => {
    setValues(checkedValues);
  }, [checkedValues]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [value]: checked
    }));
    if (checked) {
      setCheckedValues((prevState) => [
        ...prevState,
        value
      ]);
    } else {
      setCheckedValues((prevState) =>
        prevState.filter(
          (prevValue) => prevValue !== value
        )
      );
    }
  };

  return (
    <fieldset
      className={`${styles.container} ${showError ? styles.error : ""}`}
    >
      <legend className={styles.title}>
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      {options.map(
        ({ label, value }, i: number) => (
          <label
            key={i}
            className={styles.option}
          >
            <input
              className={styles.checkbox}
              type="checkbox"
              name={name}
              value={value}
              checked={checkboxValues[value]}
              onChange={handleCheckboxChange}
            />
            <span className={styles.label}>
              {label}
            </span>
          </label>
        )
      )}
      {showError && (
        <p className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
}
