/* eslint-disable react-hooks/exhaustive-deps */

"use client";

//libraries
import Image from "next/image";
import { useState } from "react";

//styles
import styles from "@/components/cms/homepage/layout/ui/faqItem.module.css";

export default function FAQItem({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  const [showAnswer, setShowAnswer] =
    useState<boolean>(false);

  const handleToggleShowAnswer = () => {
    setShowAnswer(
      (prevShowAnswer) => !prevShowAnswer
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.questionContainer}
        onClick={handleToggleShowAnswer}
      >
        <div className={styles.question}>
          {question}
        </div>
        <Image
          className={styles.icon}
          src={`/icons/${showAnswer ? "up" : "down"}-icon.svg`}
          alt="plus image"
          height={20}
          width={20}
          unoptimized
        />
      </div>
      {showAnswer && (
        <p className={styles.answer}>{answer}</p>
      )}
    </div>
  );
}
