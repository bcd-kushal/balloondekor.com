export type SVGType = {
  dimensions?: number | string;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
};

export const SubHeaderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="tabler-icon tabler-icon-point"
    >
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
    </svg>
  );
};

export const ChevronLeftSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "24"}
      height={dimensions || "24"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={
        className || "lucide lucide-chevron-left"
      }
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export const ChevronDownSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

// sidebar tab svgs ================================
export const DashboardSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="7"
        height="9"
        x="3"
        y="3"
        rx="1"
      />
      <rect
        width="7"
        height="5"
        x="14"
        y="3"
        rx="1"
      />
      <rect
        width="7"
        height="9"
        x="14"
        y="12"
        rx="1"
      />
      <rect
        width="7"
        height="5"
        x="3"
        y="16"
        rx="1"
      />
    </svg>
  );
};

export const PresetSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1" />
      <path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9" />
      <path d="M21 21v-2h-4" />
      <path d="M3 5h4V3" />
      <path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3" />
    </svg>
  );
};
export const CategorySVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M11 4h10" />
      <path d="M11 8h7" />
      <path d="M11 12h4" />
    </svg>
  );
};
export const OrderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="18"
        cy="18"
        r="3"
      />
      <circle
        cx="6"
        cy="6"
        r="3"
      />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
    </svg>
  );
};
export const CustomerSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle
        cx="9"
        cy="7"
        r="4"
      />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};
export const AdminSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
};
export const ImageSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M18 22H4a2 2 0 0 1-2-2V6" />
      <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
      <circle
        cx="12"
        cy="8"
        r="2"
      />
      <rect
        width="16"
        height="16"
        x="6"
        y="2"
        rx="2"
      />
    </svg>
  );
};
export const ProductSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
};

// header svgs ======================================
export const HamburgerSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
      />
      <line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
      />
    </svg>
  );
};
export const SearchSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="11"
        cy="11"
        r="8"
      />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};
export const NotificationSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
};
export const MessageSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

// image management folder ==========================
export const MacOSFolderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="20"
      height="20"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <defs></defs>
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 86.351 17.027 H 35.525 c -1.909 0 -3.706 -0.903 -4.846 -2.435 l -2.457 -3.302 c -0.812 -1.092 -2.093 -1.735 -3.454 -1.735 H 3.649 C 1.634 9.556 0 11.19 0 13.205 V 29.11 c 0 -2.015 1.634 -1.649 3.649 -1.649 h 82.703 c 2.015 0 3.649 -0.366 3.649 1.649 v -8.435 C 90 18.661 88.366 17.027 86.351 17.027 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(48,168,249)",
            fillRule: "nonzero",
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 86.351 80.444 H 3.649 C 1.634 80.444 0 78.81 0 76.795 V 29.11 c 0 -2.015 1.634 -3.649 3.649 -3.649 h 82.703 c 2.015 0 3.649 1.634 3.649 3.649 v 47.685 C 90 78.81 88.366 80.444 86.351 80.444 z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(42,152,234)",
            fillRule: "nonzero",
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
export const NewFolderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
};
export const SortAZSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M20 8h-5" />
      <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
      <path d="M15 14h5l-5 6h5" />
    </svg>
  );
};
export const AddImgSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
      <line
        x1="16"
        x2="22"
        y1="5"
        y2="5"
      />
      <line
        x1="19"
        x2="19"
        y1="2"
        y2="8"
      />
      <circle
        cx="9"
        cy="9"
        r="2"
      />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
};
export const ArrowLeftSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
};
export const ArrowRightSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </svg>
  );
};
export const NoImageSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <line
        x1="2"
        x2="22"
        y1="2"
        y2="22"
      />
      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
      <line
        x1="13.5"
        x2="6"
        y1="13.5"
        y2="21"
      />
      <line
        x1="18"
        x2="21"
        y1="12"
        y2="15"
      />
      <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
      <path d="M21 15V5a2 2 0 0 0-2-2H9" />
    </svg>
  );
};

// common svgs ======================================
export const TickSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};
export const CrossSVG = ({
  dimensions,
  stroke,
  fill,
  className,
  onClick
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
      onClick={onClick}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
export const BinSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line
        x1="10"
        x2="10"
        y1="11"
        y2="17"
      />
      <line
        x1="14"
        x2="14"
        y1="11"
        y2="17"
      />
    </svg>
  );
};
export const PenSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
};
export const PlusSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

export const SwitchOffSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="20"
        height="12"
        x="2"
        y="6"
        rx="6"
        ry="6"
      />
      <circle
        cx="8"
        cy="12"
        r="2"
      />
    </svg>
  );
};

export const SwitchOnSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="20"
        height="12"
        x="2"
        y="6"
        rx="6"
        ry="6"
      />
      <circle
        cx="16"
        cy="12"
        r="2"
      />
    </svg>
  );
};
export const SettingsSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
};
export const PagesSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
      />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
};
export const ContentsSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        x="3"
        y="5"
        width="6"
        height="6"
        rx="1"
      />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </svg>
  );
};
export const InfoSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
};
export const LinkExternalSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
};
export const EyeOnSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
};
export const EyeOffSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line
        x1="2"
        x2="22"
        y1="2"
        y2="22"
      />
    </svg>
  );
};
export const LoaderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
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
export const BuildingSVG = ({
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
      className={className || ""}
    >
      <path
        d="M18.871 3.838C19.7933 3.42454 20.7382 4.36939 20.3247 5.29172L13.8301 19.7797C13.2154 21.1509 11.2904 21.2097 10.5931 19.8786L9.00442 16.8456C8.62675 16.1246 8.03812 15.536 7.31712 15.1583L4.28415 13.5696C2.95299 12.8723 3.01181 10.9473 4.38306 10.3326L18.871 3.838Z"
        stroke={stroke || "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const TrendingSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || "none"}
      width={dimensions || "18"}
      height={dimensions || "18"}
      stroke={stroke || "currentColor"}
      viewBox="-3 0 32 32"
      version="1.1"
      className={className || ""}
      strokeWidth={"2"}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
};
export const CompassSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "#dd3b94"}
      className={className || ""}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8103 5.94919C21.5951 4.19841 19.8016 2.40485 18.0508 3.18969L3.64527 9.64735C1.52435 10.5981 1.43336 13.5756 3.49228 14.6541L6.508 16.2337C7.04568 16.5154 7.48464 16.9543 7.76628 17.492L9.34594 20.5077C10.4244 22.5666 13.4019 22.4757 14.3527 20.3547L20.8103 5.94919Z"
        fill={fill || "#dd3b94"}
      />
    </svg>
  );
};
export const FilterSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
};
export const CopySVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="14"
        height="14"
        x="8"
        y="8"
        rx="2"
        ry="2"
      />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
};

export const INRSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
};

export const TrustedSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
    </svg>
  );
};

export const SparklesSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
};

export const CartSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="8"
        cy="21"
        r="1"
      />
      <circle
        cx="19"
        cy="21"
        r="1"
      />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
};

export const CrossCalendarSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m17 22 5-5" />
      <path d="m17 17 5 5" />
    </svg>
  );
};

export const NoPersonSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M2 21a8 8 0 0 1 11.873-7" />
      <circle
        cx="10"
        cy="8"
        r="5"
      />
      <path d="m17 17 5 5" />
      <path d="m22 17-5 5" />
    </svg>
  );
};

export const SmileSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line
        x1="9"
        x2="9.01"
        y1="9"
        y2="9"
      />
      <line
        x1="15"
        x2="15.01"
        y1="9"
        y2="9"
      />
    </svg>
  );
};

export const TruckSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle
        cx="17"
        cy="18"
        r="2"
      />
      <circle
        cx="7"
        cy="18"
        r="2"
      />
    </svg>
  );
};

export const RecycleSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
};

export const RestoreSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path
        stroke-width="2"
        d="M8,3 L3,8 L8,13 M12,20 L15,20 C18.3137085,20 21,17.3137085 21,14 C21,10.6862915 18.3137085,8 15,8 L4,8"
      />
    </svg>
  );
};

export const ContactUsSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  );
};

export const UserSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle
        cx="12"
        cy="7"
        r="4"
      />
    </svg>
  );
};

export const StarSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export const Loader2SVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export const PhoneSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
};

export const EmailSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
};

export const WhatsappSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path
        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z"
        fill={stroke || "currentColor"}
      />
    </svg>
  );
};

export const HomeSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
};

export const DownloadSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M12 17V3" />
      <path d="m6 11 6 6 6-6" />
      <path d="M19 21H5" />
    </svg>
  );
};

export const CircleQuestionSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
};

export const BalloonsSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "14px"}
      height={dimensions || "14px"}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <rect
          x="248.388"
          y="377.03"
          fill={fill || "#000"}
        />
        <rect
          x="97.53"
          y="383.029"
          fill={fill || "#000"}
        />
        <rect
          x="402.06"
          y="383.029"
          fill={fill || "#000"}
        />
        <path
          fill={fill || "#000000"}
          d="M123.815,109.005c-6.486-1.201-13.188-1.876-20.074-1.876C44.365,107.13-2.452,152.682,0.1,224.17   c2.664,74.405,55.383,120.552,90.247,130.756l-9.837,18.152h46.462l-9.865-18.199c16.053-4.684,35.858-16.934,52.861-36.127   c-30.791-30.431-56.424-76.161-58.563-135.828C110.455,156.245,114.756,131.138,123.815,109.005z M79.709,165.372   c-4.244,2.47-8.098,5.485-11.495,9.008c-7.48,7.76-12.765,17.637-15.636,29.653c-1.224,5.136-6.371,8.304-11.506,7.08   c-5.124-1.224-8.304-6.377-7.08-11.506c3.534-14.899,10.408-28.081,20.474-38.501c4.632-4.799,9.894-8.905,15.613-12.245   c4.564-2.659,10.408-1.115,13.074,3.437C85.805,156.862,84.273,162.707,79.709,165.372z"
        />
        <path
          fill={fill || "#000000"}
          d="M511.9,224.17c2.562-71.488-44.265-117.041-103.63-117.041c-6.885,0-13.588,0.674-20.086,1.876   c9.059,22.133,13.36,47.24,12.411,73.919c-2.128,59.667-27.76,105.397-58.552,135.834c17.009,19.187,36.808,31.432,52.862,36.121   l-9.866,18.199h46.462l-9.837-18.152C456.528,344.723,509.252,298.582,511.9,224.17z"
        />
        <path
          fill={fill || "#000000"}
          d="M383.037,182.295c3.134-87.628-54.262-143.469-127.032-143.469c-72.781,0-130.166,55.841-127.043,143.469   c3.265,91.202,67.886,147.775,110.618,160.288l-12.055,22.248h56.95l-12.051-22.248   C315.164,330.076,379.79,273.509,383.037,182.295z M226.541,110.218c-5.193,3.031-9.917,6.726-14.08,11.043   c-9.174,9.517-15.648,21.624-19.171,36.356c-1.498,6.291-7.812,10.175-14.103,8.676c-6.291-1.499-10.18-7.818-8.682-14.109   c4.336-18.261,12.765-34.423,25.096-47.194c5.673-5.879,12.124-10.912,19.136-15.007c5.593-3.26,12.764-1.372,16.025,4.215   C234.021,99.786,232.134,106.958,226.541,110.218z"
        />
      </g>
    </svg>
  );
};

export const OfficeSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <rect
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2"
        ry="2"
      />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
};

export const LocationPinSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle
        cx="12"
        cy="10"
        r="3"
      />
    </svg>
  );
};

export const HalfStarSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  );
};

export const CurvedUnderlineSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1283 132"
      fill={fill || "#000"}
      stroke={stroke || "#000"}
      className={className || ""}
    >
      <path d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"></path>
    </svg>
  );
};

export const TwitterBadgeSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width={dimensions || "16"}
      height={dimensions || "16"}
      className={className || ""}
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill={fill || "#1d9bf0"}
      />
    </svg>
  );
};

export const NewOrderSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || "16"}
      height={dimensions || "16"}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ""}
    >
      <path d="M16 16h6" />
      <path d="M19 13v6" />
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line
        x1="12"
        x2="12"
        y1="22"
        y2="12"
      />
    </svg>
  );
};

export const TotalCustomersSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width={dimensions || "16"}
      height={dimensions || "16"}
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      className={className || ""}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle
        cx="9"
        cy="7"
        r="4"
      />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

export const OrderedListSVG = ({
  dimensions,
  stroke,
  fill,
  className
}: SVGType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width={dimensions || "16"}
      height={dimensions || "16"}
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      className={className || ""}
    >
      <line
        x1="10"
        x2="21"
        y1="6"
        y2="6"
      />
      <line
        x1="10"
        x2="21"
        y1="12"
        y2="12"
      />
      <line
        x1="10"
        x2="21"
        y1="18"
        y2="18"
      />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
};
