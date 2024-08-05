/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import Image from "next/image";
import Link from "next/link";

// styles
import styles from "@/components/ui/serviceCategory/banner.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { useEffect, useState } from "react";

export default function Banner({
  desktop,
  mobile,
  url
}: {
  desktop: ImageDocument;
  mobile: ImageDocument;
  url?: string;
}) {
  if (url) {
    return (
      <span className="grid *:row-start-1 *:col-start-1">
        <Link
          className={`block min-[480px]:hidden w-full p-[10px] overflow-hidden`}
          href={url}
        >
          <Image
            className={`rounded-xl object-cover h-auto w-full`}
            src={mobile?.url || ""}
            alt={
              mobile?.alt ||
              desktop?.defaultAlt ||
              "banner"
            }
            width={480}
            height={240}
            quality={100}
            priority={false}
            placeholder="blur"
            blurDataURL={mobile?.url || ""}
          />
        </Link>
        <Link
          className={`hidden min-[480px]:block w-full p-[10px] overflow-hidden`}
          href={url}
        >
          <Image
            className={`rounded-xl object-cover h-auto w-full`}
            src={desktop?.url || ""}
            alt={
              desktop?.alt ||
              mobile?.defaultAlt ||
              "banner"
            }
            width={1500}
            height={400}
            quality={60}
            priority={false}
            placeholder="blur"
            blurDataURL={desktop?.url || ""}
          />
        </Link>
      </span>
    );
  } else {
    return (
      <section className={styles.container}>
        <Image
          className={`rounded-xl object-cover h-auto w-full block min-[480px]:hidden overflow-hidden`}
          src={mobile?.url || ""}
          alt={
            mobile?.alt ||
            desktop?.defaultAlt ||
            "banner"
          }
          width={480}
          height={240}
          quality={100}
          priority={false}
          placeholder="blur"
          blurDataURL={mobile?.url || ""}
        />
        <Image
          className={`rounded-xl object-cover h-auto w-full hidden min-[480px]:block overflow-hidden`}
          src={desktop?.url || ""}
          alt={
            desktop?.alt ||
            mobile?.defaultAlt ||
            "banner"
          }
          width={1500}
          height={400}
          quality={100}
          priority={false}
          placeholder="blur"
          blurDataURL={desktop?.url || ""}
        />
      </section>
    );
  }
}
