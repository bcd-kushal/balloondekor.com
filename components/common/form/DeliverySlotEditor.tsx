/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import Input from "./Input";

import { getDeliveryType } from "@/fetchAPIs/cms/deliveryType";

import { DeliverySlotDocument } from "@/schemas/cms/service";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { OptionType } from "@/types/cms/form";
import { ResponseDataType } from "@/types/cms/api";

import styles from "@/components/common/form/deliverySlotEditor.module.css";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialDeliverySlotValue =
  (): Partial<DeliverySlotDocument> => ({
    _id: uuid(),
    // @ts-ignore
    deliveryType: "",
    timeSlots: [],
    price: NaN
  });

export default function DeliverySlotEditor({
  srNo,
  initialValue = getInitialDeliverySlotValue(),
  deliveryTypeOptions,
  setValue,
  onDelete
}: {
  srNo: number;
  initialValue?: Partial<DeliverySlotDocument>;
  deliveryTypeOptions: OptionType[];
  setValue: (value: DeliverySlotDocument) => void;
  onDelete: () => void;
}) {
  const [
    deliverySlotValue,
    setDeliverySlotValue
  ] =
    useState<Partial<DeliverySlotDocument>>(
      initialValue
    );

  const [showDetails, setShowDetails] =
    useState<boolean>(
      initialValue.deliveryType ? true : false
    );

  const [timeSlotOptions, setTimeSlotOptions] =
    useState<OptionType[]>([]);

  const handleDeliveryTypeChange = (
    value: string
  ): void => {
    setDeliverySlotValue(
      // @ts-ignore
      (prevDeliverySlotValue) => ({
        ...prevDeliverySlotValue,
        deliveryType: value
      })
    );
  };

  const handlePriceChange = (
    value: number
  ): void => {
    setDeliverySlotValue(
      (prevDeliverySlotValue) => ({
        ...prevDeliverySlotValue,
        price: value
      })
    );
  };

  const handleTimeSlotsChange = (
    value: string[]
  ): void => {
    setDeliverySlotValue(
      // @ts-ignore
      (prevDeliverySlotValue) => ({
        ...prevDeliverySlotValue,
        timeSlots: value
      })
    );
  };

  const handleGetTimeSlotOptions = (
    deliveryTypeId: string
  ) => {
    getDeliveryType(deliveryTypeId)
      .then((responseData: ResponseDataType) => {
        setTimeSlotOptions(
          (
            responseData.data as DeliveryTypeDocument
          ).timeSlots.map(({ _id, label }) => ({
            label,
            value: _id
          }))
        );
        setDeliverySlotValue(
          (prevDeliverySlotValue) => ({
            ...prevDeliverySlotValue,
            timeSlots:
              (
                initialValue.deliveryType as Schema.Types.ObjectId
              ).toString() ===
                (
                  deliverySlotValue.deliveryType as Schema.Types.ObjectId
                ).toString() &&
              initialValue?.timeSlots?.length
                ? initialValue.timeSlots
                : [],
            price:
              (
                initialValue.deliveryType as Schema.Types.ObjectId
              ).toString() ===
                (
                  deliverySlotValue.deliveryType as Schema.Types.ObjectId
                ).toString() && initialValue.price
                ? initialValue.price
                : (
                    responseData.data as DeliveryTypeDocument
                  ).price
          })
        );
        setTimeout(() => {
          setShowDetails(true);
        }, 100);
      })
      .catch((responseData: ResponseDataType) => {
        console.log(responseData.status);
      });
  };

  useEffect(() => {
    setShowDetails(false);

    if (deliverySlotValue.deliveryType) {
      handleGetTimeSlotOptions(
        (
          deliverySlotValue.deliveryType as Schema.Types.ObjectId
        ).toString()
      );
    }
  }, [deliverySlotValue.deliveryType]);

  useEffect(() => {
    setValue(
      deliverySlotValue as DeliverySlotDocument
    );
  }, [deliverySlotValue]);

  return (
    <div
      className={`border-[1.5px] border-black/30 rounded-xl overflow-hidden`}
    >
      <div
        className={`bg-zinc-200 px-5 flex w-full items-center justify-between`}
      >
        <div className="flex items-center justify-start gap-6 text-[14px]">
          <span>Type:</span>
          <Input
            title=""
            name=""
            isRequired={false}
            hasSubmitted={false}
            showError={false}
            errorMessage=""
            variant="dropdown"
            options={deliveryTypeOptions}
            defaultValue={(
              deliverySlotValue.deliveryType as Schema.Types.ObjectId
            ).toString()}
            setValue={(value) => {
              handleDeliveryTypeChange(
                value as string
              );
            }}
          />
        </div>
        <div
          onClick={onDelete}
          className="transition-all duration-300 cursor-pointer py-[8px] text-[14px] px-[10px] hover:bg-red-700 hover:text-white bg-[#aa000020] text-red-600 border-[1.5px] border-[#aa000060] rounded-lg flex items-center justify-center gap-3"
        >
          <BinSVG />
          Delete
        </div>
      </div>
      <div
        className={`w-full flex flex-col items-stretch justify-start gap-4 px-5 pt-3 pb-5`}
      >
        {showDetails ? (
          <>
            <Input
              title="Amount"
              name=""
              isRequired={false}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="number"
              defaultValue={
                (deliverySlotValue.price as number) ||
                NaN
              }
              decimal
              setValue={(value) => {
                handlePriceChange(
                  value as number
                );
              }}
            />
            <Input
              title="Timings"
              name=""
              isRequired={false}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="advance-checkbox"
              options={timeSlotOptions}
              defaultValues={(
                deliverySlotValue.timeSlots as Schema.Types.ObjectId[]
              ).map((timeSlot) =>
                timeSlot.toString()
              )}
              setValues={(values) => {
                handleTimeSlotsChange(values);
              }}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
