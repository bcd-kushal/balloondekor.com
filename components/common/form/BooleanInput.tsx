/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// components
import ToggleBtn from "./ToggleBtn";

// styles
import styles from "@/components/common/form/booleanInput.module.css";

// component
export default function BooleanInput({
  title,
  defaultValue,
  value,
  setValue
}: {
  title: string;
  defaultValue: boolean;
  value?: boolean;
  setValue: (booleanValue: boolean) => void;
}) {
  // states
  const [booleanValue, setBooleanValue] =
    useState<boolean>(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setBooleanValue(value);
    }
  }, [value]);

  useEffect(() => {
    setValue(booleanValue);
  }, [booleanValue]);

  return (
    <fieldset
      className={`mt-[6px] ${styles.container}`}
    >
      {title ? (
        <div
          className={` sm:min-w-[180px] ${styles.title}`}
        >
          <span>{title}</span>
        </div>
      ) : (
        <></>
      )}
      <ToggleBtn
        isActive={booleanValue}
        toggleActive={() => {
          setBooleanValue(!booleanValue);
        }}
      />
    </fieldset>
  );
}
