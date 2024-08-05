/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";

import {
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";

import VariantCategoryEditor, {
  getInitialVariantCategoryValue
} from "./VariantCategoryEditor";
import Button from "../Button";

import styles from "@/components/common/form/variantCategoryInput.module.css";

export default function VariantCategoryInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  selfReference,
  defaultValues,
  setValues
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  selfReference: ServiceDocument;
  defaultValues?: VariantCategoryDocument[];
  setValues: (
    variantCategoryValues: VariantCategoryDocument[]
  ) => void;
}) {
  const [
    variantCategoryValues,
    setVariantCategoryValues
  ] = useState<VariantCategoryDocument[]>(
    (defaultValues as VariantCategoryDocument[])
      ?.length
      ? (defaultValues as VariantCategoryDocument[])
      : [
          getInitialVariantCategoryValue() as VariantCategoryDocument
        ]
  );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const handleAdd = () => {
    setVariantCategoryValues(
      (prevVariantCategoryValues) => [
        ...prevVariantCategoryValues,
        getInitialVariantCategoryValue() as VariantCategoryDocument
      ]
    );
  };

  const handleDelete = (id: string) => {
    setVariantCategoryValues(
      (prevVariantCategoryValues) =>
        prevVariantCategoryValues.filter(
          (prevVariantCategoryValue) =>
            prevVariantCategoryValue._id !== id
        )
    );
  };

  const handleChange = (
    variantCategoryValue: VariantCategoryDocument
  ) => {
    if (
      variantCategoryValue.label &&
      (variantCategoryValue?.references?.length ||
        variantCategoryValue?.custom?.variants
          .length)
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setVariantCategoryValues(
      (prevVariantCategoryValues) =>
        prevVariantCategoryValues.map(
          (prevVariantCategoryValue) =>
            prevVariantCategoryValue._id ===
            variantCategoryValue._id
              ? variantCategoryValue
              : prevVariantCategoryValue
        )
    );
  };

  useEffect(() => {
    setValues(
      variantCategoryValues
        .filter(
          ({ label, references, custom }) =>
            label &&
            (references.length ||
              custom.variants.length)
        )
        .map(
          ({ _id, label, references, custom }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              label,
              references,
              custom
            }) as VariantCategoryDocument
        )
    );
  }, [variantCategoryValues]);

  return (
    <fieldset className="w-full">
      <legend className={styles.title}>
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div>
        <div
          className={`w-full flex flex-col items-stretch justify-start gap-6`}
        >
          {variantCategoryValues.map(
            (variantCategoryValue, i) => (
              <VariantCategoryEditor
                key={
                  variantCategoryValue._id || i
                }
                srNo={i}
                selfReference={selfReference}
                initialValue={
                  variantCategoryValue
                }
                setValue={(
                  quickLinkValue: VariantCategoryDocument
                ) => {
                  handleChange(quickLinkValue);
                }}
                onDelete={() =>
                  handleDelete(
                    variantCategoryValue._id
                  )
                }
              />
            )
          )}
        </div>
        <div className="w-full flex items-center justify-end pt-4">
          <Button
            className={`bg-black text-white font-medium`}
            type="secondary"
            label="+ &nbsp; new category"
            variant="normal"
            onClick={handleAdd}
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
