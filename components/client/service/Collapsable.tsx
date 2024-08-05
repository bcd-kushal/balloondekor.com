"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";

import styles from "@/components/client/service/collapsable.module.css";

export default function Collapsable(
  props: {
    radiusAmount?: string;
    heading: string;
    isCollapsedProp?: boolean;
    noSeparator?: boolean;
    children?: ReactNode;
    showSvg?: boolean;
  } & (
    | {
        onClick?: undefined;
      }
    | {
        onClick: () => void;
        isCollapsedProp: boolean;
      }
  ) &
    (
      | {
          headingIconSrc?: undefined;
        }
      | {
          headingIconSrc: string;
          headingIconAlt: string;
        }
    ) &
    (
      | {
          collapseIconSrc?: undefined;
        }
      | {
          collapseIconSrc: string;
          collapseIconAlt: string;
          notCollapseIconSrc: string;
          notCollapseIconAlt?: string;
        }
    )
) {
  const {
    radiusAmount,
    heading,
    headingIconSrc,
    isCollapsedProp,
    collapseIconSrc,
    noSeparator,
    onClick,
    children,
    showSvg
  } = props;

  const [isCollapsed, setIsCollapsed] =
    useState<boolean>(true);

  const rightSideSvg =
    showSvg === undefined ? true : showSvg;

  return (
    <section
      className={styles.container}
      style={{
        borderRadius: `${radiusAmount}`
      }}
    >
      <section
        className={`
          ${styles.header}
          ${noSeparator ? styles.noBorder : ""}
        `}
        onClick={
          onClick
            ? onClick
            : () => {
                setIsCollapsed(!isCollapsed);
              }
        }
      >
        <section
          className={styles.headingContainer}
        >
          {headingIconSrc && (
            <Image
              className={styles.headingIcon}
              src={headingIconSrc}
              alt={props.headingIconAlt}
              width={20}
              height={20}
            />
          )}
          <div className={styles.heading}>
            {heading}
          </div>
        </section>
        {rightSideSvg && collapseIconSrc && (
          <Image
            className={styles.collapseIcon}
            src={
              (onClick && isCollapsedProp) ||
              (!onClick && isCollapsed)
                ? collapseIconSrc
                : props.notCollapseIconSrc
            }
            alt={
              isCollapsedProp ||
              (!onClick && isCollapsed)
                ? props.collapseIconAlt
                : props.notCollapseIconAlt
                  ? props.notCollapseIconAlt
                  : props.collapseIconAlt
            }
            width={15}
            height={15}
          />
        )}
      </section>
      {((onClick && !isCollapsedProp) ||
        (!onClick && !isCollapsed)) && (
        <section className={styles.children}>
          {children}
        </section>
      )}
    </section>
  );
}
