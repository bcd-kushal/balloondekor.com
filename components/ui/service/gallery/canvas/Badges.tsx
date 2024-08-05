// components
import Badge from "@/components/ui/service/gallery/canvas/Badge";

// styles
import styles from "@/components/ui/service/gallery/canvas/badges.module.css";
import {
  INRSVG,
  SparklesSVG,
  TrustedSVG
} from "@/constants/svgs/svg";

export default function Badges() {
  const badgeData: Array<{
    label: string;
    svg: JSX.Element;
  }> = [
    {
      label: "Lowest price",
      svg: (
        <INRSVG
          dimensions={28}
          stroke="#50187d"
        />
      )
    },
    {
      label: "Trusted brand",
      svg: (
        <TrustedSVG
          dimensions={28}
          stroke="#50187d"
        />
      )
    },
    {
      label: "Customized decoration",
      svg: (
        <SparklesSVG
          dimensions={28}
          stroke="#50187d"
        />
      )
    }
  ];
  return (
    <section className={styles.container}>
      {badgeData.map(({ label, svg }, i) => (
        <div
          className="flex flex-col justify-end items-center gap-4 text-[14px] text-center capitalize max-w-[70px] text-[#50187d] select-none"
          key={i}
        >
          {svg}
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
