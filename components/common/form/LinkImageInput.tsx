/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

// components
import QuickLinkEditor, {
  getInitialQuickLinkValue
} from "./LinkImageEditor";
import Button from "../Button";

// styles
import styles from "./linkImageInput.module.css";

// types
import { LinkImageDocument } from "@/schemas/cms/serviceCategory";

export default function LinkImageInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue?: LinkImageDocument[];
  setValue: (
    QuickLinkValue: LinkImageDocument[]
  ) => void;
}) {
  const [linkImageValues, setLinkImageValues] =
    useState<LinkImageDocument[]>(
      (defaultValue as LinkImageDocument[])
        ?.length
        ? (defaultValue as LinkImageDocument[])
        : [
            getInitialQuickLinkValue() as LinkImageDocument
          ]
    );
  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setLinkImageValues((prevQuickLinkValues) => [
      ...prevQuickLinkValues,
      getInitialQuickLinkValue() as LinkImageDocument
    ]);
  };

  const handleDelete = (id: string) => {
    if (linkImageValues.length > 1) {
      setLinkImageValues((prevQuickLinkValues) =>
        prevQuickLinkValues.filter(
          (prevQuickLinkValue) =>
            prevQuickLinkValue._id !== id
        )
      );
    }
  };

  const handleChange = (
    linkImageValue: LinkImageDocument
  ) => {
    if (
      linkImageValue.label ||
      linkImageValue.url ||
      linkImageValue.image
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setLinkImageValues((prevQuickLinkValues) =>
      prevQuickLinkValues.map(
        (prevQuickLinkValue) =>
          prevQuickLinkValue._id ===
          linkImageValue._id
            ? linkImageValue
            : prevQuickLinkValue
      )
    );
  };

  useEffect(() => {
    setValue(
      linkImageValues
        .filter(({ label, url }) => label && url)
        .map(
          ({ _id, label, url, image }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              label,
              url,
              image
            }) as LinkImageDocument
        )
    );
  }, [linkImageValues]);

  return (
    <fieldset className={styles.container}>
      <legend
        className={`font-medium text-[14px] capitalize pb-2`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div
        className={` ${isFullscreen ? styles.fullscreen : ""} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <div
          className={`flex flex-col items-stretch justify-start max-h-[400px] border-[1.5px] border-black/30 rounded-xl scrollbar-hide overflow-y-scroll`}
        >
          {linkImageValues.map(
            (quickLinkValue, i) => (
              <QuickLinkEditor
                key={quickLinkValue._id || i}
                srNo={i}
                initialValue={quickLinkValue}
                setValue={(
                  quickLinkValue: LinkImageDocument
                ) => {
                  handleChange(quickLinkValue);
                }}
                onDelete={() =>
                  handleDelete(quickLinkValue._id)
                }
              />
            )
          )}
        </div>

        {/* bottom row =============================================================== */}
        <div
          className={`w-full mt-[12px] flex items-center justify-between`}
        >
          {/* minimize/maximize btn --------------------- */}
          <Button
            className={`flex items-center justify-center`}
            type="icon"
            label=""
            variant="normal"
            onClick={() =>
              setIsFullscreen(!isFullscreen)
            }
            iconSrc={`/icons/${isFullscreen ? "minimize" : "maximize"}-icon.svg`}
            iconSize={20}
          />
          {/* add another category ------------------------- */}
          <Button
            className={`bg-black text-white flex items-center justify-between rounded-xl py-1 text-[13px]`}
            label="Add"
            type="primary"
            variant="normal"
            onClick={handleAdd}
            iconSrc="/icons/add-icon-white.svg"
            iconSize={30}
          />
        </div>
      </div>
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
