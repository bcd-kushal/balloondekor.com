/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";

import { FAQDocument } from "@/schemas/cms/serviceCategory";

import styles from "./FAQEditor.module.css";

export const getInitialFAQValue =
  (): Partial<FAQDocument> => ({
    _id: uuid(),
    question: "",
    answer: ""
  });

export default function FAQEditor({
  srNo,
  initialValue = getInitialFAQValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<FAQDocument>;
  setValue: (value: FAQDocument) => void;
  onDelete: () => void;
}) {
  const [FAQValue, setFAQValue] =
    useState<Partial<FAQDocument>>(initialValue);

  const handleQuestionChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setFAQValue((prevFAQValue) => ({
      ...prevFAQValue,
      question: value
    }));
  };

  const handleAnswerChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setFAQValue((prevFAQValue) => ({
      ...prevFAQValue,
      answer: value
    }));
  };

  useEffect(() => {
    setValue(FAQValue as FAQDocument);
  }, [FAQValue]);

  return (
    <div
      className={`relative w-full flex flex-col items-stretch justify-start gap-5 border-[1px] border-black/30 rounded-xl p-6`}
    >
      <Button
        className={`absolute -top-[23px] -right-[40px] scale-110 border-none`}
        type="icon"
        label=""
        variant="normal"
        onClick={onDelete}
        iconSrc="/icons/close-icon-red.svg"
        iconSize={30}
      />
      <label className={styles.inputContainer}>
        <span className={styles.heading}>
          {`Question ${srNo + 1}`}
        </span>
        <input
          className={`border-[1.5px] border-black/30 hover:border-black/70 focus:outline-blue-400 focus:outline-offset-2 rounded-xl transition-all duration-300 w-full py-[8px] px-[12px] text-[14px]`}
          type="text"
          name="question"
          value={FAQValue.question}
          onChange={handleQuestionChange}
        />
      </label>
      <label className={styles.inputContainer}>
        <span className={styles.heading}>
          {`Answer ${srNo + 1}`}
        </span>
        <textarea
          className={`border-[1.5px] border-black/30 hover:border-black/70 focus:outline-blue-400 focus:outline-offset-2 rounded-xl transition-all duration-300 w-full py-[8px] px-[12px] text-[14px]`}
          name="answer"
          value={FAQValue.answer}
          onChange={handleAnswerChange}
          cols={30}
          rows={6}
        />
      </label>
    </div>
  );
}
