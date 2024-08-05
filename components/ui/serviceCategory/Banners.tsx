"use client";

// components
import Banner from "./Banner";

// styles
import styles from "@/components/ui/serviceCategory/banners.module.css";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import { ImageDocument } from "@/schemas/cms/image";

export default function Banners({
  banners
}: {
  banners: BannerDocument[];
}) {
  return (
    <section className={styles.container}>
      {banners.map(
        ({ _id, desktop, mobile, url }) => (
          <Banner
            key={_id}
            desktop={desktop as ImageDocument}
            mobile={mobile as ImageDocument}
            url={url}
          />
        )
      )}
    </section>
  );
}
