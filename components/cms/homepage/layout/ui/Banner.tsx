"use client";

//libraries
import { useEffect, useState } from "react";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

//styles
import styles from "@/components/cms/homepage/layout/ui/banner.module.css";
import BannerCarousel from "@/components/client/BannerCarousel";

export default function Banner({
  layout
}: {
  layout: HomepageLayoutDocument;
}) {
  const [banners, setBanners] = useState<
    BannerDocument[]
  >(layout.banners);

  return (
    <div className={styles.container}>
      <BannerCarousel banners={banners} />
    </div>
  );
}
