"use client";
// libraries
import Image from "next/image";
import Link from "next/link";

// styles
import styles from "@/components/ui/serviceCategory/relatedCategory.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  useEffect,
  useId,
  useState
} from "react";

export default function RelatedCategory({
  name,
  slug,
  openIn,
  icon
}: {
  name: string;
  slug: string;
  openIn?: string;
  icon?: ImageDocument;
}) {
  return (
    <Link
      className={`${styles.container} ${icon ? "" : styles.link}`}
      href={slug}
      target={openIn || "_self"}
    >
      {icon && (
        <div
          className={`${styles.iconContainer}`}
        >
          <Image
            className={styles.icon}
            src={icon.url}
            alt={icon.alt || icon.defaultAlt}
            width={150}
            height={150}
          />
        </div>
      )}
      <span
        className={`truncate ${styles.label}`}
      >
        {name}
      </span>
    </Link>
  );
}
