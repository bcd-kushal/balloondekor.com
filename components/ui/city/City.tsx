// libraries
import Image from "next/image";

// constants
import {
  BuildingSVG,
  CompassSVG,
  TrendingSVG
} from "@/constants/svgs/svg";

// styles
import styles from "@/components/ui/city/city.module.css";

export default function City({
  name,
  isTopCity,
  onSelect
}: {
  name: string;
  isTopCity?: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={styles.container}
      onClick={onSelect}
    >
      <section className={styles.left}>
        <CompassSVG stroke="#dd3b94" />
        <span className={styles.name}>
          {name}
        </span>
      </section>
      {isTopCity && (
        <TrendingSVG
          stroke="#386"
          dimensions={20}
          className="scale-150 translate-y-[2px]"
        />
      )}
    </article>
  );
}
