"use client";

// libraries
import Image from "next/image";

// styles
import styles from "@/components/ui/service/info/order/date-time/selectDateTimeUI.module.css";
import { TickSVG } from "@/constants/svgs/svg";

export default function SelectDateTimeUI({
  onClick,
  selectedDateTime: { date, time }
}: {
  onClick: () => void;
  selectedDateTime: {
    date: string;
    time: string;
  };
}) {
  return (
    <div
      className={`dateTimeContainer ${styles.container}  ${date && time !== " - " ? "bg-[#00aa0010] border-[#00aa00]" : ""}`}
      onClick={onClick}
    >
      <span>
        <Image
          src={"/icons/calender-icon.svg"}
          alt="Place Icon"
          width={20}
          height={20}
          style={{ filter: "grayscale(1)" }}
        />
        <span className={styles.label}>
          {date
            ? date
                .substring(0, date.length - 4)
                .trim()
            : "Date "}
          {time !== " - "
            ? date
              ? ` at ${time}`
              : " (select time)"
            : date
              ? " (select time)"
              : "& Time"}
        </span>
      </span>
      <span>
        {date && time !== " - " ? (
          <TickSVG
            dimensions={22}
            stroke="#00aa00"
          />
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
