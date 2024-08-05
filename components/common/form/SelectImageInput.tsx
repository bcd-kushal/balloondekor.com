/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import Image from "next/image";

// components
import Button from "../Button";
import ImageManagementModal from "@/components/cms/image-management/ImageManagementModal";

// types
import { ImageDocument } from "@/schemas/cms/image";

// styles
import styles from "./selectImageInput.module.css";
import { NoImageSVG } from "@/constants/svgs/svg";

// component
export default function SelectImageInput({
  title,
  name,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  placeholder,
  resetValue,
  setValue,
  multiple
}: {
  title: string;
  name: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue: ImageDocument[];
  placeholder?: string;
  resetValue?: boolean;
  setValue: (selectedImages: string[]) => void;
  multiple?: boolean;
}) {
  const [selectedImages, setSelectedImages] =
    useState<ImageDocument[]>(defaultValue || []);
  const [showModal, setShowModal] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const toggleShowModal = () => {
    setShowModal(
      (prevShowModal) => !prevShowModal
    );
  };

  const handleSelect = (
    images: ImageDocument[]
  ) => {
    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setSelectedImages((prevSelectedImages) => [
      ...(multiple ? prevSelectedImages : []),
      ...images
    ]);
  };

  const handleRemoveSelectedImage = (
    event: Event,
    removeImageId: string
  ) => {
    event.stopPropagation();
    if (!hasChanged) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    setSelectedImages(
      selectedImages.filter(
        (selectedImage) =>
          selectedImage._id !== removeImageId
      )
    );
  };

  useEffect(() => {
    if (resetValue) {
      setSelectedImages([]);
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(
      selectedImages.map(
        ({ _id }) => _id as string
      )
    );
  }, [selectedImages]);

  return (
    <fieldset
      className={` ${styles.container}`}
      style={{
        width: multiple ? "100%" : "fit-content"
      }}
    >
      {title ? (
        <legend className={styles.title}>
          <span>{title}</span>
          {isRequired && (
            <span className={styles.required}>
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <div
        className={`border-dashed p-[12px] cursor-pointer duration-200 transition-all hover:border-zinc-500 border-[3px] rounded-2xl border-zinc-400 h-[130px] ${multiple ? "w-full  overflow-x-scroll scrollbar-hide" : "aspect-square"} ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
        onClick={toggleShowModal} // pop open image folder to select another <<-----------------
      >
        {selectedImages.length ? (
          <div
            className={`flex items-center justify-start gap-[12px] w-full`}
          >
            {selectedImages.map(
              ({ _id, alt, url }) => (
                <div
                  key={_id}
                  className={
                    "group min-w-fit grid relative *:row-start-1 *:col-start-1"
                  }
                >
                  {/* close red cross btn ----------------- */}
                  <Button
                    className={
                      "absolute -right-[18px] -top-[8px] opacity-0 group-hover:opacity-100 duration-200 transition-all"
                    }
                    type="icon"
                    label=""
                    variant="normal"
                    // @ts-ignore
                    onClick={(e) => {
                      handleRemoveSelectedImage(
                        e,
                        _id as string
                      );
                    }}
                    onlyIcon
                    iconSrc="/icons/close-icon-red.svg"
                    iconSize={20}
                  />

                  <Image
                    className={
                      "rounded-2xl aspect-square overflow-hidden object-cover"
                    }
                    src={url as string}
                    alt={alt as string}
                    unoptimized
                    priority
                    height={100}
                    width={100}
                  />
                </div>
              )
            )}
          </div>
        ) : (
          <div
            className={
              styles.placeholderContainer
            }
          >
            <NoImageSVG
              dimensions={24}
              stroke="#777"
            />
            {placeholder && (
              <span
                className={styles.placeholder}
              >
                {placeholder}
              </span>
            )}
          </div>
        )}
      </div>
      {/* ================================================
        image management popup on pic click <<=============
      ================================================ */}
      {showModal && (
        <ImageManagementModal
          onClose={toggleShowModal}
          onSelect={handleSelect}
          multiple={multiple}
        />
      )}
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
