import Image from "next/image";

import styles from "@/components/ui/service/info/detail.module.css";
import {
  CrossSVG,
  TickSVG
} from "@/constants/svgs/svg";

export default function Detail({
  content,
  isExclude
}: {
  content: string;
  isExclude?: boolean;
}) {
  return (
    <span className={styles.container}>
      {isExclude ? (
        <CrossSVG
          dimensions={19}
          stroke="#aa0000"
          className="translate-y-[2px]"
        />
      ) : (
        <TickSVG
          dimensions={19}
          stroke="#00aa00"
          className="translate-y-[2px]"
        />
      )}
      <span className={styles.content}>
        {content}
      </span>
    </span>
  );
}
