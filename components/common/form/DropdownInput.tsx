/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import Image from "next/image";

import { OptionType } from "@/types/cms/form";

// styles
import styles from "./dropdownInput.module.css";
import { capitalize } from "./SearchInput";
import {
  CrossSVG,
  TickSVG
} from "@/constants/svgs/svg";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// component
export default function DropdownInput({
  title,
  name,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  options,
  defaultValue,
  resetValue,
  className,
  canSelectNone,
  setValue
}: {
  title: string;
  name: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  options: OptionType[];
  defaultValue: string | number;
  resetValue?: boolean;
  className?: string;
  canSelectNone?: boolean;
  setValue: (
    checkboxValue: string | number
  ) => void;
}) {
  // states
  const [dropdownValue, setDropdownValue] =
    useState(defaultValue);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setDropdownValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(dropdownValue);
  }, [dropdownValue]);

  useEffect(() => {
    setTimeout(
      () => setDropdownValue(defaultValue),
      1500
    );
  }, [defaultValue]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setDropdownValue(value);
  };

  return (
    <fieldset
      className={`h-fit py-[8px] min-w-[220px] ${className}`}
    >
      {title ? (
        <legend
          className={`font-medium text-2xl`}
        >
          <span>{capitalize(title)}</span>
          {isRequired && (
            <span
              className={`ml-[4px] text-red-400`}
            >
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <span className="grid relative ">
        <select
          className={`row-start-1 col-start-1 z-10 ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"} bg-transparent appearance-none focus:outline-none w-full py-[8px] pl-[12px] pr-[64px] rounded-lg border-[1.5px] transition-colors duration-300 cursor-pointer hover:bg-[#7b7b7b05] ${hasSubmitted || hasChanged ? (showError ? "border-[#aa000040] hover:border-[#aa000090]" : "border-[#00aa0080] hover:border-[#1a611a]") : "border-[#12121230] hover:border-[#12121285]"}`}
          name={name}
          value={dropdownValue}
          onChange={handleChange}
        >
          <option
            className={`bg-backdrop-primary`}
            value=""
            disabled={!canSelectNone}
          >
            None
          </option>
          {options.map(
            ({ label, value }, i: number) => (
              <option
                key={i}
                className={`capitalize py-[8px] bg-backdrop-primary`}
                value={value}
              >
                {label}
              </option>
            )
          )}
        </select>

        <span className="row-start-1 col-start-1 absolute right-[12px] top-1/2 -translate-y-1/2">
          <ChevronDownIcon
            width={18}
            height={18}
          />
        </span>
        {errorMessage ? (
          <p
            className={`row-start-1 col-start-1 absolute right-[40px] top-1/2 -translate-y-1/2`}
          >
            {hasSubmitted || hasChanged ? (
              showError ? (
                <CrossSVG />
              ) : (
                <TickSVG
                  stroke="#00aa00"
                  dimensions={18}
                />
              )
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
      </span>
    </fieldset>
  );
}
