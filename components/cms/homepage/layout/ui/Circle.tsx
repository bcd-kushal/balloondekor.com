/* eslint-disable react-hooks/exhaustive-deps */

"use client";

//libraries
import {
  useEffect,
  useRef,
  useState
} from "react";
import Image from "next/image";
import Link from "next/link";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import { ImageDocument } from "@/schemas/cms/image";

//styles
import styles from "@/components/cms/homepage/layout/ui/circle.module.css";

export default function Circle({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  const containerRef =
    useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] =
    useState<number>(0);

  const handleScrollLeft = () => {
    setScrollPosition((prevPosition) =>
      Math.max(prevPosition - 300, 0)
    );
  };

  const handleScrollRight = () => {
    setScrollPosition((prevPosition) =>
      Math.min(
        prevPosition + 300,
        containerRef.current?.scrollWidth! -
          containerRef.current?.clientWidth! || 0
      )
    );
  };

  useEffect(() => {
    containerRef.current?.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  }, [scrollPosition]);

  return (
    <div className={styles.container}>
      {layout.heading || layout.subHeading ? (
        <div className={styles.header}>
          {layout.heading ? (
            <h3 className={styles.heading}>
              {layout.heading}
            </h3>
          ) : (
            <></>
          )}
          {layout.subHeading ? (
            <h4 className={styles.subHeading}>
              {layout.subHeading}
            </h4>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* IMAGES ROW =================================== */}
      <div className={styles.linkImagesContainer}>
        {/* left arrow -------------------- */}
        <span
          onClick={handleScrollLeft}
          className="cursor-pointer"
        >
          <Image
            className={`${styles.buttonLeft} cursor-pointer ${scrollPosition === 0 ? styles.disabled : ""}`}
            src="/icons/left-icon.svg"
            height={30}
            width={30}
            alt="left age slide"
            unoptimized
            priority={false}
          />
        </span>

        {/* images container ---------------- */}
        <div className={styles.scrollContainer}>
          <div
            className={styles.linkImages}
            ref={containerRef}
          >
            {layout.sections[0].linkImages.map(
              ({ _id, label, url, image }) => (
                <Link
                  key={_id}
                  className={styles.linkImage}
                  href={url}
                >
                  <section
                    className={
                      styles.imageContainer
                    }
                  >
                    <Image
                      className={styles.image}
                      src={
                        (image as ImageDocument)
                          .url || ""
                      }
                      alt={
                        (image as ImageDocument)
                          .alt ||
                        (image as ImageDocument)
                          .defaultAlt
                      }
                      width={200}
                      height={200}
                      quality={60}
                      priority={false}
                      placeholder="blur"
                      blurDataURL={
                        (image as ImageDocument)
                          .url || ""
                      }
                    />
                  </section>
                  <span className={styles.label}>
                    {label}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
        {/* right arrow ----------------- */}
        <span
          onClick={handleScrollRight}
          className="cursor-pointer"
        >
          <Image
            className={`${styles.buttonRight} cursor-pointer ${scrollPosition === containerRef.current?.scrollWidth! - containerRef.current?.clientWidth! ? styles.disabled : ""}`}
            src="/icons/right-icon.svg"
            height={30}
            width={30}
            alt="right age slide"
            priority={false}
          />
        </span>
      </div>
    </div>
  );
}
