/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import Image from "next/image";

// types
import { OptionType } from "@/types/cms/form";

// styles
import styles from "./advanceCheckboxInput.module.css";
import { CrossSVG } from "@/constants/svgs/svg";

// component
export default function AdvanceCheckboxInput({
  title,
  name,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  options,
  defaultValues,
  disabled,
  setValues
}: {
  title: string;
  name: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  options: OptionType[];
  defaultValues: string[];
  disabled?: boolean;
  setValues: (checkboxValues: string[]) => void;
}) {
  // states
  const [checkboxValues, setCheckboxValues] =
    useState<OptionType[]>([]);
  const [checkedValues, setCheckedValues] =
    useState<string[]>(defaultValues);
  const [keyword, setKeyword] =
    useState<string>("");
  const [searchResults, setSearchResults] =
    useState<OptionType[]>([]);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    setValues(checkedValues);
  }, [checkedValues]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

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

    setKeyword("");
  };

  useEffect(() => {
    const searchResults = checkboxValues.filter(
      ({ label, value }) =>
        !checkedValues.includes(value) &&
        label
          .toLowerCase()
          .includes(keyword.toLowerCase())
    );

    setSearchResults(searchResults);
  }, [checkboxValues, checkedValues, keyword]);

  useEffect(() => {
    setCheckboxValues(options);
  }, [options]);

  return (
    <fieldset
      className={`w-full flex flex-col items-stretch justify-start gap-3  ${showError ? (hasChanged ? "" : "") : ""}`}
    >
      {title ? (
        <legend className={styles.title}>
          <span className="font-medium text-black text-[16px]">
            {title}
          </span>
          {isRequired && (
            <span
              className={`text-2xl pl-[4px] text-red-500`}
            >
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <div
        className={`
          relative flex flex-col items-stretch justify-start gap-[16px] bg-transparent rounded-[8px] border-[1.5px] border-black/40 pb-[20px] px-[12px] max-h-[280px] min-h-[280px] scrollbar-hide overflow-y-scroll
          ${(hasSubmitted || hasChanged) && showError ? styles.error : ""} 
          ${disabled ? styles.disabled : ""}
        `}
      >
        <div
          className={`pt-[20px] w-full sticky top-0 bg-backdrop-primary z-10 ${showError && hasChanged ? "bg-transparent" : ""}`}
        >
          <input
            className={`w-full  text-[14px] text-left border-[1.5px] rounded-xl duration-300 transition-all py-[8px] px-[16px] outline-none focus:outline-none focus:outline-2 focus:outline-blue-300 focus:outline-offset-0 hover:border-black/60 border-black/30 `}
            type="text"
            name={`${name} search`}
            value={keyword}
            placeholder="Search tags"
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => setKeyword(e.target.value)}
          />
        </div>
        <div
          className={`relative flex flex-col items-stretch justify-start gap-[8px]`}
        >
          {keyword ? (
            <></>
          ) : (
            <div
              className={`w-full flex items-center justify-start gap-[8px] flex-wrap`}
            >
              {checkboxValues
                .filter(({ value }) =>
                  checkedValues.includes(value)
                )
                .map(
                  (
                    { label, value },
                    i: number
                  ) => (
                    <label
                      key={i}
                      className={
                        styles.checkedOption
                      }
                    >
                      <input
                        className={
                          styles.checkbox
                        }
                        type="checkbox"
                        name={name}
                        value={value}
                        checked={checkedValues.includes(
                          value
                        )}
                        onChange={
                          handleCheckboxChange
                        }
                      />
                      <span
                        className={styles.label}
                      >
                        {label}
                      </span>
                    </label>
                  )
                )}
            </div>
          )}
          {searchResults.length ? (
            <div
              className={
                styles.uncheckedOptionsContainer
              }
            >
              {searchResults.map(
                ({ label, value }, i: number) => (
                  <label
                    key={i}
                    className={
                      styles.uncheckedOption
                    }
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      name={name}
                      value={value}
                      checked={checkedValues.includes(
                        value
                      )}
                      onChange={
                        handleCheckboxChange
                      }
                    />
                    <span
                      className={styles.label}
                    >
                      {label}
                    </span>
                  </label>
                )
              )}
            </div>
          ) : (
            <span className="text-[14px] flex items-center text-red-500 gap-3 justify-start">
              <CrossSVG
                dimensions={14}
                stroke="#aa000070"
              />{" "}
              No tags match this search
            </span>
          )}
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
