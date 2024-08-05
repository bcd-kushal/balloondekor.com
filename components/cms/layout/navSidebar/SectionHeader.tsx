/* eslint-disable react-hooks/exhaustive-deps */

import { ChevronDownSVG } from "@/constants/svgs/svg";
import {
  useEffect,
  useId,
  useState
} from "react";

type Icon = JSX.Element;

type Props = {
  icon: Icon;
  heading: string;
  hasLinks: boolean;
  showLinks?: boolean;
  isSidebarOpen: boolean;
};

export default function SectionHeader(
  props: Props
) {
  const {
    icon,
    heading,
    hasLinks,
    showLinks,
    isSidebarOpen
  } = props;
  const id = useId();
  const [isArrowDown, setIsArrowDown] =
    useState(true);
  const [clickCount, setClickCount] =
    useState<number>(0);

  useEffect(() => {
    document.getElementById(String(id))?.animate(
      {
        transform:
          isArrowDown && clickCount > 0
            ? "rotate(180deg)"
            : "rotate(0deg)"
      },
      { duration: 200, fill: "forwards" }
    );
    setIsArrowDown((prev) => !prev);
    setClickCount((prev) => prev + 1);
  }, [showLinks, id]);

  return (
    <>
      <div
        className={`flex items-center justify-center my-[4px] relative transition-all duration-300`}
      >
        {/* tab icon ------------ */}
        <span
          className={`w-[36px] flex items-center ${isSidebarOpen ? "justify-start" : "justify-center"} `}
        >
          {icon}
        </span>
        {/* tab title ------------- */}
        <h4
          className={`capitalize text-[14px] ${isSidebarOpen ? "" : "hidden"}`}
        >
          {heading}
        </h4>
      </div>
      {/* tab chevron indicator ----------- */}
      {hasLinks ? (
        <span
          id={id}
          className={`${isSidebarOpen ? "" : "hidden"}`}
        >
          <ChevronDownSVG />
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
