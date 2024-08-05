/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import CustomVariantCategoryEditor from "@/components/common/form/CustomVariantCategoryEditor";

import {
  CustomVariantCategoryDocument,
  CustomVariantDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { UnitDocument } from "@/schemas/cms/unit";

import styles from "@/components/common/form/customVariantCategoryInput.module.css";
import mongoose from "mongoose";
import { ImageDocument } from "@/schemas/cms/image";
import { PlusSVG } from "@/constants/svgs/svg";

export default function CustomVariantCategoryInput({
  title,
  isRequired,
  selfReference,
  initialValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  selfReference: ServiceDocument;
  initialValue: CustomVariantCategoryDocument;
  setValue: (
    variants: CustomVariantDocument[]
  ) => void;
}) {
  const [variants, setVariants] = useState<
    CustomVariantDocument[]
  >(
    initialValue.variants.length
      ? initialValue.variants
      : [
          {
            _id: uuid(),
            label: "base",
            price: selfReference.price,
            image: selfReference.media.primary,
            value: NaN
          } as CustomVariantDocument,
          {
            _id: uuid(),
            label: ""
          } as CustomVariantDocument
        ]
  );

  const handleAddVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      // @ts-ignore
      {
        _id: uuid(),
        label: ""
      } as CustomVariantDocument
    ]);
  };

  const handleDeleteVariant = (id: string) => {
    setVariants((prevVariants) => {
      const newVariants = prevVariants.filter(
        ({ _id }) => _id !== id
      );

      if (newVariants.length < 2) {
        newVariants.push({
          _id: uuid(),
          label: ""
        } as CustomVariantDocument);
      }

      return newVariants;
    });
  };

  const handleChange = (
    variant: CustomVariantDocument
  ) => {
    setVariants((prevVariants) =>
      prevVariants.map((prevVariant) =>
        prevVariant._id === variant._id
          ? variant
          : prevVariant
      )
    );
  };

  useEffect(() => {
    setValue(
      variants
        .filter(
          ({ label, price, image, value }) => {
            if (
              initialValue.options.image &&
              initialValue.options.unit
            ) {
              return image && value && price;
            } else if (
              initialValue.options.image &&
              !initialValue.options.unit
            ) {
              return image && label && price;
            } else if (
              !initialValue.options.image &&
              initialValue.options.unit
            ) {
              return value && price;
            } else if (
              !initialValue.options.image &&
              !initialValue.options.unit
            ) {
              return label && price;
            }
          }
        )
        .map(
          ({ _id, label, price, image, value }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              ...(label ? { label } : {}),
              price,
              ...(image
                ? {
                    image:
                      typeof image === "string"
                        ? image
                        : (image as ImageDocument)
                            ._id
                  }
                : {}),
              ...(value ? { value } : {})
            }) as CustomVariantDocument
        )
    );
  }, [variants]);

  return (
    <div className={`pb-5 px-5 text-[14px] pt-4`}>
      <legend className={styles.title}>
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div
        className={`w-full relative max-w-[calc(100dvw_-_281px)] overflow-x-scroll scrollbar-hide flex items-end justify-start gap-5`}
      >
        {variants.map((variant, i) => (
          <CustomVariantCategoryEditor
            key={variant._id || i}
            options={initialValue.options}
            unit={
              (initialValue.unit as UnitDocument) ||
              undefined
            }
            isSelf={i === 0}
            initialValue={variant}
            showCityPrice={Boolean(
              selfReference.price.cities.length
            )}
            onDelete={() => {
              handleDeleteVariant(variant._id);
            }}
            setValue={handleChange}
            onClick={() => {
              handleAddVariant();
            }}
          />
        ))}
        <span className="bg-backdrop-primary translate-x-[2px] z-50 flex items-center pl-4 pr-[2px] sticky right-0">
          <div
            onClick={handleAddVariant}
            className="bg-black text-white px-[15px] py-[8px] cursor-pointer rounded-lg text-[15px] flex items-center justify-center gap-3"
          >
            <PlusSVG />
            Add
          </div>
        </span>
      </div>
    </div>
  );
}
