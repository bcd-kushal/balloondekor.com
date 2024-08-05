/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

// components
import BannerEditor, {
  getDefaultBannerValue
} from "@/components/common/form/BannerEditor";
import Button from "../Button";

// styles
import styles from "@/components/common/form/bannerInput.module.css";

// types
import { BannerDocument } from "@/schemas/cms/banner";

export default function BannerInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  initialValue,
  setValue
}: {
  title?: string;
  isRequired?: boolean;
  hasSubmitted?: boolean;
  showError?: boolean;
  errorMessage?: string;
  initialValue?: BannerDocument[];
  setValue: (
    QuickLinkValue: BannerDocument[]
  ) => void;
}) {
  const [banners, setBanners] = useState<
    BannerDocument[]
  >(
    (initialValue as BannerDocument[])?.length
      ? (initialValue as BannerDocument[])
      : [
          getDefaultBannerValue() as BannerDocument
        ]
  );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setBanners((prevBanners) => [
      ...prevBanners,
      getDefaultBannerValue() as BannerDocument
    ]);
  };

  const handleDelete = (id: string) => {
    setBanners((prevBanners) =>
      prevBanners.filter(
        (prevBanner) => prevBanner._id !== id
      )
    );
  };

  const handleChange = (
    banner: BannerDocument
  ) => {
    if (
      banner.desktop ||
      banner.mobile ||
      banner.url
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setBanners((prevBanners) =>
      prevBanners.map((prevBanner) =>
        prevBanner._id === banner._id
          ? banner
          : prevBanner
      )
    );
  };

  useEffect(() => {
    setValue(
      banners
        .filter(
          ({ desktop, mobile }) =>
            desktop && mobile
        )
        .map(
          ({ _id, desktop, mobile, url }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              desktop,
              mobile,
              url
            }) as BannerDocument
        )
    );
  }, [banners]);

  return (
    <fieldset className={styles.container}>
      {title && (
        <legend className={styles.title}>
          <span>{title}</span>
          {isRequired && (
            <span className={styles.required}>
              *
            </span>
          )}
        </legend>
      )}
      <section
        className={`${styles.input} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <section className={styles.editors}>
          {banners.map((banner, i) => (
            <BannerEditor
              key={banner._id || i}
              srNo={i}
              initialValue={banner}
              setValue={(
                banner: BannerDocument
              ) => {
                handleChange(banner);
              }}
              onDelete={() => {
                handleDelete(banner._id);
              }}
            />
          ))}
        </section>
        <Button
          className={`bg-black mt-5 text-white py-3 px-5 rounded-xl text-[14px] cursor-pointer`}
          type="icon"
          label="+ &nbsp; Add Banner"
          variant="normal"
          onClick={handleAdd}
          onlyIcon
        />
      </section>
      {errorMessage ? (
        <p className={styles.errorMessage}>
          {hasSubmitted || hasChanged ? (
            <Image
              className={styles.errorMessageIcon}
              src={`/icons/${showError ? "error" : "success"}-icon.svg`}
              alt={"Validation Icon"}
              width={12}
              height={12}
              unoptimized
            />
          ) : (
            <></>
          )}
          <span
            className={styles.errorMessageText}
          >
            {(hasSubmitted || hasChanged) &&
            showError
              ? errorMessage
              : ""}
          </span>
        </p>
      ) : (
        <></>
      )}
    </fieldset>
  );
}
