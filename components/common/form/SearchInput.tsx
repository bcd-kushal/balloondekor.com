/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from "react";
import Image from "next/image";

// hooks
import { useHotkeys } from "react-hotkeys-hook";
import { useSearchContext } from "@/hooks/useSearchContext";

// components
import Button from "../Button";

// styles
import styles from "./searchInput.module.css";
import {
  CrossSVG,
  SearchSVG
} from "@/constants/svgs/svg";

export const capitalize = (str: string) => {
  return (
    str[0].toUpperCase() +
    str.substring(1, str.length)
  );
};

export default function SearchInput({
  // common
  title,
  name,
  className,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  // search
  placeholder,
  defaultValue,
  resetValue,
  setValue
  // setRef
}: {
  // common
  title: string;
  name: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  // search
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  setValue: (checkboxValue: string) => void;
}) {
  // hooks
  const {
    searchRef,
    setSearchRef,
    setSearch,
    keyword,
    setKeyword
  } = useSearchContext();

  useHotkeys("shift+ctrl+f", () => {
    searchRef?.focus();
  });

  // states
  const [searchKeyword, setSearchKeyword] =
    useState(defaultValue);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);
  const [reset, setReset] =
    useState<boolean>(false);

  // reference
  const localRef =
    useRef<HTMLInputElement | null>(null);

  // handlers
  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearch(true);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setSearchKeyword(value);
  };

  const handleReset = () => {
    setReset(true);
    setSearchKeyword("");
    setSearch(true);
  };

  // lifecycle
  useEffect(() => {
    if (resetValue) {
      handleReset();
    }
  }, [resetValue]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    setValue(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    setSearchRef(
      localRef.current as HTMLInputElement
    );
  }, [localRef]);

  return (
    <fieldset
      className={className ? className : ""}
    >
      {title ? (
        <legend>
          <span>{title}</span>
          {isRequired && <span>*</span>}
        </legend>
      ) : (
        <></>
      )}
      <div
        className={`w-full flex items-center justify-stretch gap-[4px] px-[12px] py-[8px] rounded-xl border-[1px] border-[#12121220] transition-colors duration-300 hover:border-[#12121285] focus:border-[#12121285] ${className}`}
      >
        {/* search icon ==================== */}
        <span
          onClick={() => setSearch(true)}
          className="w-[24px] flex items-center justify-start"
        >
          <SearchSVG
            stroke={
              keyword ? "#121212" : "#12121275"
            }
          />
        </span>
        {/* input field ==================== */}
        <div
          className={`grid self-stretch w-full`}
        >
          <input
            className={` focus:outline-none bg-transparent text-[#12121275] w-full row-start-1 col-start-1 h-full flex items-center text-[14px]  ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
            ref={localRef}
            type="search"
            name={name}
            placeholder={
              placeholder
                ? capitalize(placeholder)
                : ""
            }
            value={searchKeyword}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <span
            onClick={handleReset}
            className={` row-start-1 col-start-1 h-full items-center justify-end ${keyword ? "flex" : "hidden"}`}
          >
            <CrossSVG stroke="#12121275" />
          </span>
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
