"use client";
// libraries
import Image from "next/image";
import Link from "next/link";

// styles
import styles from "@/components/ui/serviceCategory/quickLinkWithImg.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  useEffect,
  useId,
  useState
} from "react";

export default function QuickLinkWithImg({
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
  const quickLinkId = useId();
  const [showImg, setShowImg] =
    useState<boolean>(true);
  useEffect(() => {
    addEventListener("scroll", () => {
      const linkBtn =
        document.getElementById(quickLinkId);
      const linkYOffset =
        linkBtn?.getBoundingClientRect().y || 50;
      if (showImg && linkYOffset <= 8)
        setShowImg((prev) => false);
      if (!showImg && linkYOffset > 159)
        setShowImg((prev) => true);
      // console.log(linkYOffset);
    });
  }, [showImg, quickLinkId]);
  return (
    <Link
      className={`${showImg ? "" : "py-[11px] px-[15px] border-[1.5px] border-[#a5089d45] rounded-2xl hover:bg-[#a5089d25] hover:text-[#a5089d] transition-all duration-300"} ${styles.container} ${icon ? "" : styles.link}`}
      href={slug}
      target={openIn || "_self"}
      id={quickLinkId}
    >
      {icon && (
        <div
          className={` ${showImg ? "" : "hidden"} ${styles.iconContainer}`}
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
      <span className={styles.label}>{name}</span>
    </Link>
  );
}
