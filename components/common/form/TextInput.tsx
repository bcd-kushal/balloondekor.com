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

// styles
import styles from "./textInput.module.css";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  CrossSVG,
  TickSVG
} from "@/constants/svgs/svg";

type Props = {
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
  disabled?: boolean;
  setValue: (checkboxValue: string) => void;
  handleKeyPress?: (
    e: KeyboardEvent<HTMLInputElement>
  ) => void;
  transform?: (value: string) => string;
  setRef?: (ref: HTMLInputElement | null) => void;
};

// component
export default function TextInput(
  props: Props & { type?: "modern" | "default" }
) {
  // props
  const {
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
    type,
    setValue,
    handleKeyPress,
    transform,
    setRef
  } = props;

  const localRef =
    useRef<HTMLInputElement | null>(null);

  // states
  const [textValue, setTextValue] =
    useState(defaultValue);
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

  useEffect(() => {
    if (setRef) {
      setRef(
        localRef.current as HTMLInputElement
      );
    }
  }, [localRef]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    if (transform) {
      setTextValue(transform(value));
    } else {
      setTextValue(value);
    }
  };

  return (
    <fieldset
      className={`w-full flex flex-col h-fit ${className}`}
    >
      {title ? (
        <legend
          className={`capitalize pb-[4px] text-[14px] font-medium`}
        >
          <span>{title}</span>
          {isRequired && (
            <span
              className={`text-red-500 pl-[2px]`}
            >
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}

      <div className="relative grid *:row-start-1 *:col-start-1">
        <input
          className={
            type && type === "modern"
              ? `bg-transparent border-b-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 pb-3 focus:border-pink-500 outline-none focus:outline-none ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"}  z-30`
              : `bg-transparent ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"} focus:outline-sky-400 focus:outline-2 focus:outline-offset-0  z-30 select-none inset-0 transition-all duration-300 py-[8px] px-[12px] border-[1.5px] rounded-lg focus:outline-none  ${hasSubmitted || hasChanged ? (showError ? "border-[#aa000075] focus:border-[#aa000099] hover:border-[#aa000099]" : "border-[#00aa0075] focus:border-[#00aa0099] hover:border-[#00aa0099]") : "border-[#12121235] focus:border-[#12121285] hover:border-[#12121285]"}`
          }
          ref={localRef}
          type="text"
          name={name}
          placeholder={
            placeholder ? placeholder : ""
          }
          value={textValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          autoComplete="off"
        />
        {errorMessage ? (
          <p
            className={`absolute right-[5px] top-1/2 -translate-y-1/2 flex items-center gap-[4px] w-fit justify-end`}
          >
            {hasSubmitted || hasChanged ? (
              showError ? (
                <CrossSVG stroke="#aa0000" />
              ) : (
                <TickSVG stroke="#00aa00" />
              )
            ) : (
              <></>
            )}
            <span
              className={`${
                (hasSubmitted || hasChanged) &&
                showError
                  ? "block text-[#aa0000]"
                  : "hidden"
              }`}
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
      </div>
    </fieldset>
  );
}
