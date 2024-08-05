/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { SEOSchemaDocument } from "@/schemas/cms/serviceCategory";

import styles from "./schemaInput.module.css";
import Input from "./Input";

export default function SchemaInput({
  title,
  name,
  placeholder,
  className,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  rating,
  offers,
  resetValue,
  setValue
}: {
  title: string;
  name: string;
  placeholder?: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue?: SEOSchemaDocument;
  rating?: boolean;
  offers?: boolean;
  resetValue?: boolean;
  setValue: (value: SEOSchemaDocument) => void;
}) {
  const [schemaValue, setSchemaValue] =
    useState<SEOSchemaDocument>(
      defaultValue || ({} as SEOSchemaDocument)
    );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  useEffect(() => {
    if (resetValue) {
      setSchemaValue({} as SEOSchemaDocument);
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(schemaValue);
  }, [schemaValue]);

  const handleChange = (
    key:
      | "@type"
      | "name"
      | "bestRating"
      | "ratingValue"
      | "ratingCount"
      | "highPrice"
      | "lowPrice"
      | "offerCount",
    value: string
  ) => {
    if (
      key !== "@type" &&
      key !== "bestRating" &&
      Boolean(value) &&
      !isNaN(Number(value)) &&
      !hasChanged
    ) {
      setTimeout(() => {
        setHasChanged(true);
      }, 100);
    }

    switch (key) {
      case "@type":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              "@type": value
            }) as SEOSchemaDocument
        );
        break;
      case "name":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              name: value
            }) as SEOSchemaDocument
        );
        break;
      case "bestRating":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              aggregateRating: {
                ...prevSchemaValue.aggregateRating,
                bestRating: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;
      case "ratingValue":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              aggregateRating: {
                ...prevSchemaValue.aggregateRating,
                ratingValue: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;
      case "ratingCount":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              aggregateRating: {
                ...prevSchemaValue.aggregateRating,
                ratingCount: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;
      case "highPrice":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              offers: {
                ...prevSchemaValue.offers,
                highPrice: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;
      case "lowPrice":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              offers: {
                ...prevSchemaValue.offers,
                lowPrice: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;
      case "offerCount":
        setSchemaValue(
          (prevSchemaValue) =>
            ({
              ...prevSchemaValue,
              offers: {
                ...prevSchemaValue.offers,
                offerCount: Number(value)
              }
            }) as SEOSchemaDocument
        );
        break;

      default:
        break;
    }
  };

  return (
    <fieldset className={`${className}`}>
      {title ? (
        <legend
          className={`flex gap-1 items-center justify-start text-[14px] capitalize mb-[8px]`}
        >
          <span>{title}</span>
          {isRequired && (
            <span className={`text-red-500`}>
              *
            </span>
          )}
        </legend>
      ) : (
        <></>
      )}
      <div
        className={`border-[1.5px] flex flex-col items-stretch justify-start gap-5 border-black/30 rounded-2xl p-8 ${(hasSubmitted || hasChanged) && showError ? styles.error : ""}`}
      >
        <section className={styles.section}>
          <h5
            className={`text-2xl font-bold underline w-full text-center`}
          >
            General
          </h5>
          <div className={styles.inputsContainer}>
            <Input
              title="context"
              name="context"
              isRequired={true}
              hasSubmitted={true}
              showError={false}
              errorMessage=""
              variant="text"
              defaultValue={
                schemaValue["@context"] || ""
              }
              setValue={() => {}}
              disabled={true}
            />
            <Input
              title="type"
              name="type"
              isRequired={true}
              hasSubmitted={false}
              showError={
                schemaValue["@type"].length === 0
              }
              errorMessage=""
              variant="text"
              defaultValue={
                schemaValue["@type"] || ""
              }
              setValue={(value: string) => {
                handleChange("@type", value);
              }}
            />
            <Input
              title="name"
              name="name"
              isRequired={true}
              hasSubmitted={false}
              showError={
                schemaValue["name"].length === 0
              }
              errorMessage=""
              variant="text"
              defaultValue={
                schemaValue["name"] || ""
              }
              setValue={(value: string) => {
                handleChange("name", value);
              }}
            />
          </div>
        </section>
        {rating && (
          <section className={styles.section}>
            <h5
              className={`text-2xl font-bold underline w-full text-center`}
            >
              Rating
            </h5>
            <div
              className={styles.inputsContainer}
            >
              <Input
                title="aggregate rating type"
                name="aggregateRatingType"
                isRequired={true}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="text"
                defaultValue={
                  schemaValue.aggregateRating[
                    "@type"
                  ] || ""
                }
                setValue={() => {}}
                disabled={true}
              />
              <Input
                title="best rating"
                name="bestRating"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.aggregateRating
                    .bestRating !== 0 &&
                  !schemaValue.aggregateRating
                    .bestRating
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.aggregateRating
                    .bestRating || NaN
                }
                decimal={true}
                setValue={(value: number) => {
                  handleChange(
                    "bestRating",
                    value.toString()
                  );
                }}
              />
              <Input
                title="rating value"
                name="ratingValue"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.aggregateRating
                    .ratingValue !== 0 &&
                  !schemaValue.aggregateRating
                    .ratingValue
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.aggregateRating
                    .ratingValue || NaN
                }
                decimal={true}
                setValue={(value: number) => {
                  handleChange(
                    "ratingValue",
                    value.toString()
                  );
                }}
              />
              <Input
                title="rating count"
                name="ratingCount"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.aggregateRating
                    .ratingCount !== 0 &&
                  !schemaValue.aggregateRating
                    .ratingCount
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.aggregateRating
                    .ratingCount || NaN
                }
                decimal={false}
                setValue={(value: number) => {
                  handleChange(
                    "ratingCount",
                    value.toString()
                  );
                }}
              />
            </div>
          </section>
        )}
        {offers && (
          <section className={styles.section}>
            <h5
              className={`text-2xl font-bold underline w-full text-center`}
            >
              Offer
            </h5>
            <div
              className={styles.inputsContainer}
            >
              <Input
                title="aggregate offer"
                name="offersType"
                isRequired={true}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="text"
                defaultValue={
                  schemaValue.offers["@type"] ||
                  ""
                }
                setValue={() => {}}
                disabled={true}
              />
              <Input
                title="high price"
                name="highPrice"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.offers.highPrice !==
                    0 &&
                  !schemaValue.offers.highPrice
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.offers.highPrice ||
                  NaN
                }
                decimal={true}
                setValue={(value: number) => {
                  handleChange(
                    "highPrice",
                    value.toString()
                  );
                }}
              />
              <Input
                title="low price"
                name="lowPrice"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.offers.lowPrice !==
                    0 &&
                  !schemaValue.offers.lowPrice
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.offers.lowPrice ||
                  NaN
                }
                decimal={true}
                setValue={(value: number) => {
                  handleChange(
                    "lowPrice",
                    value.toString()
                  );
                }}
              />
              <Input
                title="offer count"
                name="offerCount"
                isRequired={true}
                hasSubmitted={false}
                showError={
                  schemaValue.offers
                    .offerCount !== 0 &&
                  !schemaValue.offers.offerCount
                }
                errorMessage=""
                variant="number"
                defaultValue={
                  schemaValue.offers.offerCount ||
                  NaN
                }
                decimal={false}
                setValue={(value: number) => {
                  handleChange(
                    "offerCount",
                    value.toString()
                  );
                }}
              />
              <Input
                title="price currency"
                name="priceCurrency"
                isRequired={true}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="text"
                defaultValue={
                  schemaValue.offers[
                    "priceCurrency"
                  ] || ""
                }
                setValue={() => {}}
                disabled={true}
              />
            </div>
          </section>
        )}
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
