/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState
} from "react";
import Image from "next/image";

// styles
import styles from "./passwordInput.module.css";
import {
  CrossSVG,
  EyeOffSVG,
  EyeOnSVG,
  TickSVG
} from "@/constants/svgs/svg";

// component
export default function PasswordInput({
  // common
  title,
  name,
  className,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  // password
  placeholder,
  defaultValue,
  resetValue,
  showPassword,
  type,
  setValue,
  toggleShowPassword
}: {
  // common
  title: string;
  name: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  // password
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  showPassword: boolean;
  type?: "default" | "modern";
  setValue: (value: string) => void;
  toggleShowPassword: () => void;
}) {
  // states
  const [password, setPassword] =
    useState(defaultValue);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setPassword("");
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(password);
  }, [password]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setPassword(value);
  };

  return (
    <fieldset
      className={
        className
          ? className
          : "w-full flex flex-col h-fit"
      }
    >
      {title ? (
        <legend
          className={`capitalize pb-[4px] text-[12px]`}
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
              : `bg-transparent ${className && className.includes("text-[") ? `text-[${className.split("text-[")[1].split("]")[0]}]` : "text-[14px]"}  z-30 select-none inset-0 transition-all duration-300 py-[8px] pl-[12px] pr-[45px] border-[1.5px] rounded-lg focus:outline-none  ${hasSubmitted || hasChanged ? (showError ? "border-[#aa000075] focus:border-[#aa000099] hover:border-[#aa000099]" : "border-[#00aa0075] focus:border-[#00aa0099] hover:border-[#00aa0099]") : "border-[#12121235] focus:border-[#12121285] hover:border-[#12121285]"}`
          }
          type={
            showPassword ? "text" : "password"
          }
          name={name}
          placeholder={
            placeholder ? placeholder : ""
          }
          value={password}
          onChange={handleChange}
        />
        <span
          onClick={toggleShowPassword}
          className="cursor-pointer mr-[4px] absolute right-[10px] top-1/2 -translate-y-1/2 z-50"
        >
          {!showPassword ? (
            <EyeOnSVG dimensions={20} />
          ) : (
            <EyeOffSVG dimensions={20} />
          )}
        </span>
        {errorMessage ? (
          <p
            className={`absolute right-[5px] z-[70] top-1/2 -translate-y-1/2 flex items-center gap-[4px] w-fit justify-end`}
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

  return (
    <fieldset
      className={
        className ? className : styles.container
      }
    >
      {title ? (
        <legend className={styles.title}>
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
      <div
        className={`${styles.inputContainer} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <input
          className={`${styles.input} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
          type={
            showPassword ? "text" : "password"
          }
          name={name}
          placeholder={
            placeholder ? placeholder : ""
          }
          value={password}
          onChange={handleChange}
        />
        <Image
          src={`/icons/eye-${showPassword ? "shown" : "hidden"}-icon.svg`}
          alt={"Password Visibility Toggle Icon"}
          width={25}
          height={25}
          unoptimized
          className={styles.toggleIcon}
          onClick={toggleShowPassword}
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
