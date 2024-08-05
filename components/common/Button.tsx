// LIBRARIES
import Image from "next/image";
import Link from "next/link";

// STYLES
import styles from "./button.module.css";

// TYPES
interface CommonProps {
  type:
    | "primary"
    | "secondary"
    | "danger"
    | "icon";
  label: string;
  className?: string;
}

// normal variant (handle click event)
type NormalVariant = {
  variant: "normal";
  onClick: () => void;
  onlyIcon?: boolean;
  iconSrc?: string;
  iconSize?: number;
};

// link variant (handle navigation)
type LinkVariant = {
  variant: "link";
  href: string;
  iconSrc?: string;
  iconSize?: number;
};

// submit variant (handle form)
type SubmitVariant = {
  variant: "submit";
};

// onClick trigger event (handle form variant)
type onClickVariant = {
  variant: "onClick";
  uploadProps: {
    label: string;
    changeState: () => void;
  };
};

type Props = CommonProps &
  (
    | NormalVariant
    | LinkVariant
    | SubmitVariant
    | onClickVariant
  );

const primaryBtnStyles =
  "border-[#d4378f] text-[#d4378f] font-semibold hover:border-[#d4378f] hover:text-white hover:bg-[#d4378f]";
const secondaryBtnStyles =
  "border-[#12121235] hover:border-[#d4378f80] hover:text-[#d4378f] hover:bg-[#d4378f15]";
const dangerBtnStyles =
  "border-[#12121235] hover:border-[#aa000080] hover:text-[#aa0000] bg-[#aa000015] hover:bg-[#aa000050]";
const iconBtnStyles = "border-[#12121235]";

// EXPORT
export default function Button(props: Props) {
  const { type, label, className, variant } =
    props;

  const classes = {
    primary: `${styles.btn} ${styles.primary}`,
    secondary: `${styles.btn} ${styles.secondary}`,
    danger: `${styles.btn} ${styles.danger}`,
    icon: styles.icon
  };

  if (variant === "normal") {
    const {
      onClick,
      onlyIcon,
      iconSrc,
      iconSize
    } = props as NormalVariant;

    return (
      <div
        className={`
          ${
            onlyIcon
              ? ""
              : `capitalize 
                 py-[8px] 
                 px-[20px] 
                 border-[1px] 
                 border-[#12121230] 
                 rounded-lg 
                 cursor-pointer
                 text-center
                 transition-colors 
                 text-[14px] 
                 duration-300 
                 hover:bg-[#12121210]`
          }
          ${className ? className : ""}`}
        onClick={onClick}
      >
        {iconSrc ? (
          <Image
            className={styles.iconImg}
            src={iconSrc}
            alt="Button Icon"
            width={iconSize || 20}
            height={iconSize || 20}
            unoptimized
          />
        ) : (
          <></>
        )}
        {label}
      </div>
    );
  } else if (variant === "link") {
    const { href, iconSrc, iconSize } =
      props as LinkVariant;

    return (
      <Link
        className={`${type === "secondary" ? secondaryBtnStyles : type === "primary" ? primaryBtnStyles : type === "danger" ? dangerBtnStyles : iconBtnStyles} px-[20px] py-[8px] border-[1px] cursor-pointer transition-colors duration-300 rounded-lg text-[14px] capitalize ${className ? className : ""}`}
        href={href}
      >
        {iconSrc ? (
          <Image
            className={styles.iconImg}
            src={iconSrc}
            alt="Button Icon"
            width={iconSize || 20}
            height={iconSize || 20}
            unoptimized
          />
        ) : (
          <></>
        )}
        {label}
      </Link>
    );
  } else if (variant === "submit") {
    return (
      <input
        className={`capitalize py-[8px] px-[20px]  border-[1px] border-[#12121230] bg-[#121212] text-white text-[14px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-tab-primary hover:shadow-lg hover:shadow-[#0075FE35] hover:border-[#0075FE]`}
        type="submit"
        value={label}
      />
    );
  } else if (variant === "onClick") {
    return (
      <div
        className={`${classes[type]} text-[14px] ${className ? className : ""}`}
        onClick={props.uploadProps.changeState}
      >
        {props.uploadProps.label}
      </div>
    );
  }

  return null;
}
