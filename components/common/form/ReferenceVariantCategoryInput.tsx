/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

// components
import ReferenceVariantCategoryEditor from "./ReferenceVariantCategoryEditor";

// fetch APIs
import { getServices } from "@/fetchAPIs/cms/service";
import { getServiceCategories } from "@/fetchAPIs/cms/serviceCategory";

// types
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";
import {
  ReferenceVariantCategoryDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "@/components/common/form/referenceVariantCategoryInput.module.css";

export default function ReferenceVariantCategoryInput({
  title,
  isRequired,
  selfReference,
  defaultValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  selfReference: ServiceDocument;
  defaultValue: ReferenceVariantCategoryDocument[];
  setValue: (
    references: ReferenceVariantCategoryDocument[]
  ) => void;
}) {
  const [references, setReferences] = useState<
    ReferenceVariantCategoryDocument[]
  >(
    defaultValue?.length
      ? defaultValue.length === 1
        ? [
            defaultValue[0],
            // @ts-ignore
            {
              _id: uuid(),
              label: "",
              reference: undefined
            } as ReferenceVariantCategoryDocument
          ]
        : [
            ...defaultValue,
            // @ts-ignore
            {
              _id: uuid(),
              label: "",
              reference: undefined
            } as ReferenceVariantCategoryDocument
          ]
      : [
          {
            _id: uuid(),
            label: "",
            reference: selfReference
          } as ReferenceVariantCategoryDocument,
          // @ts-ignore
          {
            _id: uuid(),
            label: "",
            reference: undefined
          } as ReferenceVariantCategoryDocument
        ]
  );
  const [
    selectedReferences,
    setSelectedReferences
  ] = useState<string[]>([]);

  const [services, setServices] = useState<
    ServiceDocument[]
  >([]);
  const [
    serviceCategoryOptions,
    setServiceCategoryOptions
  ] = useState<OptionType[]>([]);

  const handleAddReference = () => {
    setReferences((prevReferences) => [
      ...prevReferences,
      // @ts-ignore
      {
        _id: uuid(),
        label: "",
        reference: undefined
      } as ReferenceVariantCategoryDocument
    ]);
  };

  const handleDeleteReference = (id: string) => {
    setReferences((prevReferences) => {
      const newReferences = prevReferences.filter(
        ({ _id }) => _id !== id
      );

      if (newReferences.length < 2) {
        newReferences.push(
          // @ts-ignore
          {
            _id: uuid(),
            label: "",
            reference: undefined
          } as ReferenceVariantCategoryDocument
        );
      }

      return newReferences;
    });
  };

  const handleChange = (
    reference: ReferenceVariantCategoryDocument
  ) => {
    setReferences((prevReferences) =>
      prevReferences.map((prevReference) =>
        prevReference._id === reference._id
          ? reference
          : prevReference
      )
    );
  };

  const handleGetServices = () => {
    getServices({
      populate: true,
      active: true,
      offset: 0,
      limit: 0,
      sortBy: "name",
      orderBy: "asc",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setServices(
            responseData.data as ServiceDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          console.log(responseData.status);
        }
      );
  };

  const handleGetServiceCategoryOptions = () => {
    getServiceCategories({
      populate: false,
      active: true,
      offset: 0,
      limit: 0,
      sortBy: "name",
      orderBy: "asc",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setServiceCategoryOptions([
            {
              label: "all",
              value: "all"
            },
            ...(
              responseData.data as ServiceCategoryDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          ]);
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          console.log(responseData.status);
        }
      );
  };

  useEffect(() => {
    handleGetServices();
    handleGetServiceCategoryOptions();
  }, []);

  useEffect(() => {
    setValue(
      references
        .filter(
          ({ label, reference }) =>
            label && reference
        )
        .map(
          ({ _id, label, reference }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              label,
              reference
            }) as ReferenceVariantCategoryDocument
        )
    );

    setSelectedReferences(
      references
        .filter(({ reference }) => reference)
        .map(({ reference }) =>
          (
            reference as Schema.Types.ObjectId
          ).toString()
        )
    );
  }, [references]);

  return (
    <div className={` px-5 pb-5 pt-3`}>
      <legend
        className={`flex items-center gap-1 justify-start text-[14px] font-medium capitalize`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <section
        className={`relative flex items-start justify-start gap-8 overflow-x-scroll pt-5 scrollbar-hide`}
      >
        {references.map((reference, i) => (
          <ReferenceVariantCategoryEditor
            key={reference._id}
            isSelf={i === 0}
            isLast={i === references.length - 1}
            isRequired={
              i === references.length - 1 &&
              references.length === 2
            }
            defaultValue={reference}
            services={services.filter(
              (service) =>
                !selectedReferences.includes(
                  service._id
                )
            )}
            serviceCategoryOptions={
              serviceCategoryOptions
            }
            onDelete={() => {
              handleDeleteReference(
                reference._id
              );
            }}
            setValue={handleChange}
            addAnotherNewCard={handleAddReference}
          />
        ))}
      </section>
    </div>
  );
}
