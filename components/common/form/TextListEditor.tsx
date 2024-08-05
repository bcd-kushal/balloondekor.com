/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

import Button from "@/components/common/Button";

import styles from "@/components/common/form/textListEditor.module.css";
import { BinSVG } from "@/constants/svgs/svg";

export type TextListType = {
  _id: string;
  content: string;
};

export const getInitialTextListValue =
  (): TextListType => ({
    _id: uuid(),
    content: ""
  });

export default function TextListEditor({
  srNo,
  srNoLabel,
  inputType,
  initialValue = getInitialTextListValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  srNoLabel: string;
  inputType: "text" | "longText";
  initialValue?: TextListType;
  setValue: (value: TextListType) => void;
  onDelete: () => void;
}) {
  const [
    textListItemValue,
    setTextListItemValue
  ] = useState<TextListType>(initialValue);

  const handleChange = ({
    target: { value }
  }:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>) => {
    setTextListItemValue((prevFAQValue) => ({
      ...prevFAQValue,
      content: value
    }));
  };

  useEffect(() => {
    setValue(textListItemValue as TextListType);
  }, [textListItemValue]);

  return (
    <div
      className={`w-full flex flex-col items-stretch justify-start`}
    >
      <span
        className={`flex items-center justify-between`}
      >
        <span className={styles.srNo}>
          {`${srNoLabel || ""} ${srNo + 1}`}
        </span>
        <div
          className="flex items-center justify-center gap-4 py-[8px] px-[12px] transition-all duration-300 cursor-pointer text-[14px] border-[1.9px] rounded-lg border-[#aa000050] bg-[#aa000015] text-red-500 hover:text-white hover:bg-red-700"
          onClick={onDelete}
        >
          <BinSVG /> Delete
        </div>
      </span>
      <label className={`w-full my-4`}>
        {inputType === "text" ? (
          <input
            className={styles.textInput}
            type="text"
            name="content"
            value={textListItemValue.content}
            onChange={handleChange}
          />
        ) : (
          <textarea
            className={`w-full min-h-[150px] rounded-lg border-[1.5px] border-black/30 hover:border-black/70 transition-all duration-300 p-4 text-[15px]`}
            name="content"
            value={textListItemValue.content}
            onChange={handleChange}
          />
        )}
      </label>
    </div>
  );
}
