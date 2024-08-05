/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";
import { v4 as uuid } from "uuid";

// components
import Button from "@/components/common/Button";
import SelectImageInput from "./SelectImageInput";

// styles
import styles from "@/components/common/form/bannerEditor.module.css";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import { ImageDocument } from "@/schemas/cms/image";
import { CrossSVG } from "@/constants/svgs/svg";

export const getDefaultBannerValue =
  (): Partial<BannerDocument> => ({
    _id: uuid(),
    desktop: {} as ImageDocument,
    mobile: {} as ImageDocument,
    url: ""
  });

export default function BannerEditor({
  srNo,
  initialValue = getDefaultBannerValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<BannerDocument>;
  setValue: (value: BannerDocument) => void;
  onDelete: () => void;
}) {
  const [banner, setBanner] =
    useState<Partial<BannerDocument>>(
      initialValue
    );

  const handleDesktopImageChange = (
    value: string
  ): void => {
    setBanner((prevBanner) => ({
      ...prevBanner,
      desktop: value
    }));
  };

  const handleMobileImageChange = (
    value: string
  ): void => {
    setBanner((prevBanner) => ({
      ...prevBanner,
      mobile: value
    }));
  };

  const handleUrlChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setBanner((prevBanner) => ({
      ...prevBanner,
      url: value
    }));
  };

  useEffect(() => {
    setValue(banner as BannerDocument);
  }, [banner]);

  return (
    <section className={styles.container}>
      <section
        className={`w-full flex items-center justify-between`}
      >
        <span className={styles.srNo}>
          {`${srNo + 1}.`}
        </span>
        <span
          className="rounded-full text-[12px] font-medium bg-[#aa000020] text-red-500 py-1 px-4 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white"
          onClick={onDelete}
        >
          <CrossSVG dimensions={13} /> Delete
        </span>
      </section>
      <section
        className={styles.imageInputContainer}
      >
        <SelectImageInput
          title=""
          name="desktop"
          isRequired={false}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          defaultValue={
            (banner?.desktop as ImageDocument)
              ?._id
              ? [banner.desktop as ImageDocument]
              : []
          }
          placeholder="desktop"
          resetValue={false}
          setValue={(values) =>
            handleDesktopImageChange(values[0])
          }
        />
        <SelectImageInput
          title=""
          name="mobile"
          isRequired={false}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          defaultValue={
            (banner?.mobile as ImageDocument)?._id
              ? [banner.mobile as ImageDocument]
              : []
          }
          placeholder="mobile"
          resetValue={false}
          setValue={(values) =>
            handleMobileImageChange(values[0])
          }
        />
      </section>
      <input
        className={`border-[1.5px] border-black/30 rounded-xl w-full py-[6px] px-[10px] bg-transparent transition-all hover:border-black/70 focus:outline-blue-400 focus:outline-offset-2 focus:outline-4 text-center`}
        type="text"
        name="url"
        placeholder="Link"
        value={banner.url}
        onChange={handleUrlChange}
      />
    </section>
  );
}
