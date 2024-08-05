/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import Input from "./Input";

import { CityPriceDocument } from "@/schemas/cms/service";

import styles from "@/components/common/form/cityPriceEditor.module.css";
import { OptionType } from "@/types/cms/form";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialCityPriceValue =
  (): Partial<CityPriceDocument> => ({
    _id: uuid(),
    city: undefined,
    mrp: NaN,
    price: NaN
  });

export default function CityPriceEditor({
  srNo,
  cityOptions,
  initialValue = getInitialCityPriceValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  cityOptions: OptionType[];
  initialValue?: Partial<CityPriceDocument>;
  setValue: (value: CityPriceDocument) => void;
  onDelete: () => void;
}) {
  const [cityPriceValue, setCityPriceValue] =
    useState<Partial<CityPriceDocument>>(
      initialValue
    );

  const handleCityChange = (
    value: string | number
  ): void => {
    // @ts-ignore
    setCityPriceValue((prevCityPriceValue) => ({
      ...prevCityPriceValue,
      city: value
    }));
  };

  const handleMRPChange = (
    value: number
  ): void => {
    setCityPriceValue((prevCityPriceValue) => ({
      ...prevCityPriceValue,
      mrp: value
    }));
  };

  const handlePriceChange = (
    value: number
  ): void => {
    setCityPriceValue((prevCityPriceValue) => ({
      ...prevCityPriceValue,
      price: value
    }));
  };

  useEffect(() => {
    setValue(cityPriceValue as CityPriceDocument);
  }, [cityPriceValue]);

  return (
    <>
      <span className="font-medium text-[16px] flex items-center justify-center">{`${srNo + 1}.`}</span>
      <Input
        title=""
        name="city"
        isRequired={false}
        hasSubmitted={false}
        showError={false}
        errorMessage=""
        variant="dropdown"
        options={cityOptions}
        defaultValue={
          // @ts-ignore
          (cityPriceValue.city as string) || ""
        }
        setValue={handleCityChange}
      />
      <Input
        title=""
        name="mrp"
        isRequired={false}
        hasSubmitted={false}
        showError={false}
        errorMessage=""
        variant="number"
        defaultValue={
          cityPriceValue.mrp as number
        }
        decimal
        setValue={handleMRPChange}
        className="justify-center text-center"
      />
      <Input
        title=""
        name="price"
        isRequired={false}
        hasSubmitted={false}
        showError={false}
        errorMessage=""
        variant="number"
        defaultValue={
          cityPriceValue.price as number
        }
        decimal
        setValue={handlePriceChange}
        className="justify-center text-center"
      />
      <span
        onClick={onDelete}
        className="h-full w-full flex items-center justify-center cursor-pointer group"
      >
        <BinSVG
          dimensions={18}
          className="group-hover:stroke-red-500 transition-all duration-200"
        />
      </span>
    </>
  );
}
