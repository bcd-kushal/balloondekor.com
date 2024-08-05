import { SVGType } from "./types";

export const SearchSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "18"}
      height={dimensions || "18"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="11"
        cy="11"
        r="8"
      ></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  );
};
export const LoadingSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "18"}
      height={dimensions || "18"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  );
};
export const TelescopeSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "18"}
      height={dimensions || "18"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
      <circle
        cx="12"
        cy="13"
        r="2"
      />
    </svg>
  );
};
