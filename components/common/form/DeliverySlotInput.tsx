/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose, { Schema } from "mongoose";

import DeliverySlotEditor, {
  getInitialDeliverySlotValue
} from "@/components/common/form/DeliverySlotEditor";
import Button from "../Button";

import { getDeliveryTypes } from "@/fetchAPIs/cms/deliveryType";

import { DeliverySlotDocument } from "@/schemas/cms/service";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";

import styles from "@/components/common/form/deliverySlotInput.module.css";
import { PlusSVG } from "@/constants/svgs/svg";

export default function DeliverySlotInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValues,
  setValues
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValues?: DeliverySlotDocument[];
  setValues: (
    deliverySlotValues: DeliverySlotDocument[]
  ) => void;
}) {
  const [
    deliverySlotValues,
    setDeliverySlotValues
  ] = useState<DeliverySlotDocument[]>(
    (defaultValues as DeliverySlotDocument[])
      ?.length
      ? (defaultValues as DeliverySlotDocument[])
      : [
          getInitialDeliverySlotValue() as DeliverySlotDocument
        ]
  );
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const [
    deliveryTypeOptions,
    setDeliveryTypeOptions
  ] = useState<OptionType[]>([]);

  const handleAdd = () => {
    setDeliverySlotValues(
      (prevDeliverySlotValues) => [
        ...prevDeliverySlotValues,
        getInitialDeliverySlotValue() as DeliverySlotDocument
      ]
    );
  };

  const handleDelete = (id: string) => {
    if (deliverySlotValues.length > 1) {
      setDeliverySlotValues(
        (prevDeliverySlotValues) =>
          prevDeliverySlotValues.filter(
            (prevDeliverySlotValue) =>
              prevDeliverySlotValue._id !== id
          )
      );
    }
  };

  const handleChange = (
    deliverySlotValue: DeliverySlotDocument
  ) => {
    if (
      deliverySlotValue.deliveryType &&
      (
        deliverySlotValue.timeSlots as Schema.Types.ObjectId[]
      ).length &&
      deliverySlotValue.price
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setDeliverySlotValues(
      (prevDeliverySlotValues) =>
        prevDeliverySlotValues.map(
          (prevDeliverySlotValue) =>
            prevDeliverySlotValue._id ===
            deliverySlotValue._id
              ? deliverySlotValue
              : prevDeliverySlotValue
        )
    );
  };

  const handleGetDeliveryTypeOptions = () => {
    getDeliveryTypes({
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
          setDeliveryTypeOptions(
            (
              responseData.data as DeliveryTypeDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
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

  useEffect(() => {
    handleGetDeliveryTypeOptions();
  }, []);

  useEffect(() => {
    setValues(
      deliverySlotValues
        .filter(
          ({ deliveryType, timeSlots, price }) =>
            deliveryType &&
            (timeSlots as Schema.Types.ObjectId[])
              .length &&
            price
        )
        .map(
          ({
            _id,
            deliveryType,
            timeSlots,
            price
          }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              deliveryType,
              timeSlots,
              price
            }) as DeliverySlotDocument
        )
    );
  }, [deliverySlotValues]);

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
      <div
        className={`relative grid grid-cols-2 gap-6`}
      >
        {deliverySlotValues.map(
          (deliverySlotValue, i) => (
            <DeliverySlotEditor
              key={deliverySlotValue._id || i}
              srNo={i}
              initialValue={deliverySlotValue}
              deliveryTypeOptions={
                deliveryTypeOptions
              }
              setValue={(
                deliverySlot: DeliverySlotDocument
              ) => {
                handleChange(deliverySlot);
              }}
              onDelete={() =>
                handleDelete(
                  deliverySlotValue._id
                )
              }
            />
          )
        )}
      </div>
      <div
        className="bg-black text-white px-[20px] py-[8px] rounded-lg flex items-center justify-center gap-3 text-[14px] mt-7 w-fit cursor-pointer"
        onClick={handleAdd}
      >
        <PlusSVG /> Add more
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
