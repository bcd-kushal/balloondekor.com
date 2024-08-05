/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

import { NestedSectionDocument } from "@/schemas/cms/navLink";

import NavSectionEditor, {
  getInitialNavSectionValue
} from "./NavSectionEditor";
import Button from "../Button";

import styles from "@/components/common/form/navSectionInput.module.css";

export default function NavSectionInput({
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
  defaultValue?: NestedSectionDocument[];
  disableTag?: boolean;
  setValue: (
    navSectionValue: NestedSectionDocument[]
  ) => void;
}) {
  const [navSectionValues, setNavSectionValues] =
    useState<NestedSectionDocument[]>(
      (defaultValue as NestedSectionDocument[])
        .length
        ? (defaultValue as NestedSectionDocument[])
        : [
            getInitialNavSectionValue() as NestedSectionDocument
          ]
    );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setNavSectionValues(
      (prevNavSectionValues) => [
        ...prevNavSectionValues,
        getInitialNavSectionValue() as NestedSectionDocument
      ]
    );
  };

  const handleDelete = (id: string) => {
    if (navSectionValues.length > 1) {
      setNavSectionValues(
        (prevNavSectionValues) =>
          prevNavSectionValues.filter(
            (prevNavSectionValue) =>
              prevNavSectionValue._id !== id
          )
      );
    }
  };

  const handleChange = (
    navSectionValue: NestedSectionDocument
  ) => {
    if (
      navSectionValue.heading &&
      navSectionValue.nestedLinks.length
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setNavSectionValues((prevNavSectionValues) =>
      prevNavSectionValues.map(
        (prevNavSectionValue) =>
          prevNavSectionValue._id ===
          navSectionValue._id
            ? navSectionValue
            : prevNavSectionValue
      )
    );
  };

  useEffect(() => {
    setValue(
      navSectionValues
        .filter(
          ({ heading, nestedLinks }) =>
            heading && nestedLinks.length
        )
        .map(
          ({ _id, heading, nestedLinks }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              heading,
              nestedLinks
            }) as NestedSectionDocument
        )
    );
  }, [navSectionValues]);

  return (
    <fieldset>
      <legend
        className={`flex items-center justify-start text-[14px] font-medium gap-2 mb-[6px]`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={`text-red-500`}>
            *
          </span>
        )}
      </legend>
      {navSectionValues.map(
        (quickLinkValue, i) => (
          <div
            key={quickLinkValue._id || i}
            className={`border-[1.5px] mb-8 border-black/30 rounded-xl max-h-[400px] overflow-y-scroll scrollbar-hide flex flex-col items-stretch justify-start gap-5`}
          >
            <NavSectionEditor
              srNo={i}
              initialValue={quickLinkValue}
              disableTag={disableTag}
              setValue={(
                quickLinkValue: NestedSectionDocument
              ) => {
                handleChange(quickLinkValue);
              }}
              onDelete={() =>
                handleDelete(quickLinkValue._id)
              }
            />
          </div>
        )
      )}
      <Button
        className={`w-fit text-[16px] font-medium bg-black text-white hover:bg-black`}
        type="secondary"
        label="new section"
        variant="normal"
        onClick={handleAdd}
      />
      <br />
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
