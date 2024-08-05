/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

import { NestedLinkDocument } from "@/schemas/cms/navLink";

import NavLinkEditor, {
  getInitialNavLinkValue
} from "./NavLinkEditor";
import Button from "../Button";

import styles from "@/components/common/form/navLinkInput.module.css";
import { PlusSVG } from "@/constants/svgs/svg";

export default function NavLinkInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  disableTag,
  setValue
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue?: NestedLinkDocument[];
  disableTag?: boolean;
  setValue: (
    QuickLinkValue: NestedLinkDocument[]
  ) => void;
}) {
  const [navLinkValues, setNavLinkValues] =
    useState<NestedLinkDocument[]>(
      (defaultValue as NestedLinkDocument[])
        ?.length
        ? (defaultValue as NestedLinkDocument[])
        : [
            getInitialNavLinkValue() as NestedLinkDocument
          ]
    );
  const [isFullscreen, setIsFullscreen] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setNavLinkValues((prevQuickLinkValues) => [
      ...prevQuickLinkValues,
      getInitialNavLinkValue() as NestedLinkDocument
    ]);
  };

  const handleDelete = (id: string) => {
    if (navLinkValues.length > 1) {
      setNavLinkValues((prevQuickLinkValues) =>
        prevQuickLinkValues.filter(
          (prevQuickLinkValue) =>
            prevQuickLinkValue._id !== id
        )
      );
    }
  };

  const handleChange = (
    navLinkValue: NestedLinkDocument
  ) => {
    if (navLinkValue.label && navLinkValue.url) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setNavLinkValues((prevNavLinkValues) =>
      prevNavLinkValues.map((prevNavLinkValue) =>
        prevNavLinkValue._id === navLinkValue._id
          ? navLinkValue
          : prevNavLinkValue
      )
    );
  };

  useEffect(() => {
    setValue(
      navLinkValues
        .filter(({ label, url }) => label && url)
        .map(
          ({ _id, label, url, tag }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              label,
              url,
              ...(disableTag ? {} : { tag })
            }) as NestedLinkDocument
        )
    );
  }, [navLinkValues]);

  return (
    <fieldset className={styles.container}>
      <legend className={styles.title}>
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div className={styles.editors}>
        {navLinkValues.map((navLinkValue, i) => (
          <NavLinkEditor
            key={navLinkValue._id || i}
            srNo={i}
            initialValue={navLinkValue}
            disableTag={disableTag}
            setValue={(
              quickLinkValue: NestedLinkDocument
            ) => {
              handleChange(quickLinkValue);
            }}
            onDelete={() =>
              handleDelete(navLinkValue._id)
            }
          />
        ))}
      </div>
      <div className="w-full mt-8 flex items-center justify-end mb-5">
        <div
          onClick={handleAdd}
          className="flex items-center justify-end gap-3 py-[8px] px-[13px] rounded-lg cursor-pointer text-white bg-black text-[14px]"
        >
          <PlusSVG />
          Add link
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
