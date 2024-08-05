import Image from "next/image";

import styles from "@/components/ui/service/info/order/selectCityUI.module.css";
import { TickSVG } from "@/constants/svgs/svg";

export default function SelectCityUI({
  activeCityName,
  onClick
}: {
  activeCityName?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`cityContainer ${styles.container} ${activeCityName ? "bg-[#00aa0010] border-[#00aa00]" : ""}`}
      onClick={onClick}
    >
      <section className={styles.left}>
        <Image
          src={"/icons/place-icon.svg"}
          alt="Place Icon"
          width={20}
          height={20}
          style={{ filter: "grayscale(1)" }}
        />
        <span className={styles.label}>
          {activeCityName || "Select city"}
        </span>
      </section>
      <span>
        {activeCityName ? (
          <TickSVG
            stroke="#00aa00"
            dimensions={22}
          />
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
