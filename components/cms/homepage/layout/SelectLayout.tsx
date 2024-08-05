"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import BannerSkeleton from "./skeleton/BannerSkeleton";
import CircleSkeleton from "./skeleton/CircleSkeleton";
import CollageSkeleton from "./skeleton/CollageSkeleton";
import FAQSkeleton from "./skeleton/FAQSkeleton";
import SquareLSkeleton from "./skeleton/SquareLSkeleton";
import SquareMSkeleton from "./skeleton/SquareMSkeleton";
import TilesSkeleton from "./skeleton/TilesSkeleton";
import TextSkeleton from "./skeleton/TextSkeleton";

import styles from "@/components/cms/homepage/layout/selectLayout.module.css";
import QuickLinkSkeleton from "./skeleton/QuickLinkSkeleton";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function SelectLayout({
  onSelect
}: {
  onSelect: (
    layout:
      | ""
      | "banner"
      | "circle"
      | "square-m"
      | "square-l"
      | "tiles"
      | "collage"
      | "text"
      | "faq"
      | "quick-link"
  ) => void;
}) {
  const [activeLayout, setActiveLayout] =
    useState<
      | ""
      | "banner"
      | "circle"
      | "square-m"
      | "square-l"
      | "tiles"
      | "collage"
      | "text"
      | "faq"
      | "quick-link"
    >("");

  const handleNext = () => {
    if (activeLayout) {
      onSelect(activeLayout);
    }
  };

  return (
    <CMSPageLayout
      title="Select Layout"
      noAddBtn
    >
      <div className={styles.layouts}>
        <BannerSkeleton
          isActive={activeLayout === "banner"}
          onClick={setActiveLayout}
        />
        <CircleSkeleton
          isActive={activeLayout === "circle"}
          onClick={setActiveLayout}
        />
        <SquareMSkeleton
          isActive={activeLayout === "square-m"}
          onClick={setActiveLayout}
        />
        <SquareLSkeleton
          isActive={activeLayout === "square-l"}
          onClick={setActiveLayout}
        />
        <TilesSkeleton
          isActive={activeLayout === "tiles"}
          onClick={setActiveLayout}
        />
        <CollageSkeleton
          isActive={activeLayout === "collage"}
          onClick={setActiveLayout}
        />
        <TextSkeleton
          isActive={activeLayout === "text"}
          onClick={setActiveLayout}
        />
        <FAQSkeleton
          isActive={activeLayout === "faq"}
          onClick={setActiveLayout}
        />
        <QuickLinkSkeleton
          isActive={activeLayout === "quick-link"}
          onClick={setActiveLayout}
        />
      </div>
      <div className={styles.actions}>
        <Button
          type="secondary"
          label="close"
          variant="link"
          href="/cms/homepage"
        />
        <Button
          className={
            activeLayout ? "" : styles.disabled
          }
          type="primary"
          label="next"
          variant="normal"
          onClick={handleNext}
        />
      </div>
    </CMSPageLayout>
  );
}
