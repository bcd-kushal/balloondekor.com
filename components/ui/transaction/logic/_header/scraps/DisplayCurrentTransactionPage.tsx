import { TickSVG } from "@/constants/svgs/svg";
import { CompletionStatusType } from "../../../static/types";
import {
  COMPLETION_ACCENT_COLOR,
  INCOMPLETE_ACCENT_COLOR
} from "../../../static/constants";

export const DisplayCurrentTransactionProgress =
  ({
    label,
    side,
    completed,
    position
  }: {
    label: string;
    side: "left" | "center" | "right";
    completed: CompletionStatusType;
    position: "first" | "last" | "inBetween";
  }) => {
    const IS_LEFT_BAR_COLORED: boolean = (() => {
      if (completed === "completed") return true;
      if (completed === "currentlyActive")
        if (side === "left") return false;
        else return true;
      return false;
    })();

    const IS_RIGHT_BAR_COLORED: boolean = (() => {
      if (completed === "completed") return true;
      if (completed === "currentlyActive")
        if (side === "right") return true;
        else return false;
      return false;
    })();

    return (
      <div className="grid w-[150px] sm:w-[160px] md:w-[200px] *:row-start-1 *:col-start-1 relative">
        {/* ---[ back progress ribbon ]------------------------------------------ */}
        <div className="grid grid-cols-2 *:h-[4px] translate-y-[10px]">
          <span
            className={`${position === "first" ? "translate-x-[36px] w-[calc(100%_-_36px)]" : ""}  ${
              IS_LEFT_BAR_COLORED
                ? COMPLETION_ACCENT_COLOR
                : INCOMPLETE_ACCENT_COLOR
            }`}
          ></span>
          <span
            className={`${position === "last" ? "w-[calc(100%_-_36px)]" : ""} ${
              IS_RIGHT_BAR_COLORED
                ? COMPLETION_ACCENT_COLOR
                : INCOMPLETE_ACCENT_COLOR
            }`}
          ></span>
        </div>

        {/* ----[ front data ]----------------------------------------------------- */}
        <div
          className={`relative *:text-center *:w-[72px] flex flex-col justify-center gap-1 ${side === "left" ? "items-start" : side === "center" ? "items-center" : "items-end"}`}
        >
          <span className="grid *:row-start-1 *:col-start-1 items-center justify-center">
            {/* activity ring ---------------- */}
            <span
              className={`rounded-full w-[24px] aspect-square border-[4px] ${completed === "completed" ? "bg-green-600 border-green-600" : completed === "currentlyActive" ? "bg-white border-green-600" : "bg-white border-[#12121230]"}`}
            ></span>
            {/* pulsing animation --------------- */}
            <span
              className={`rounded-full w-[24px] aspect-square border-[4px] ${completed === "currentlyActive" ? "animate-ping" : ""} ${completed === "completed" ? "bg-green-600 border-green-600" : completed === "currentlyActive" ? "bg-white border-green-600" : "bg-white border-[#12121230]"}`}
            ></span>
            {/* tick svg ------------------ */}
            <span
              className={`grid place-items-center ${
                completed === "completed"
                  ? ""
                  : "hidden"
              }`}
            >
              <TickSVG
                stroke="#fff"
                dimensions={14}
              />
            </span>
          </span>
          <span className="text-[14px]">
            {label}
          </span>
        </div>
      </div>
    );
  };
