/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ClipboardEvent,
  useEffect,
  useState
} from "react";
import Image from "next/image";
import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

// components
import Backdrop from "../Backdrop";
import Button from "../Button";
import CityPriceEditor, {
  getInitialCityPriceValue
} from "./CityPriceEditor";

// fetch APIs
import { getCities } from "@/fetchAPIs/cms/city";

// types
import { CityDocument } from "@/schemas/cms/city";
import { CityPriceDocument } from "@/schemas/cms/service";
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/common/form/cityPriceInput.module.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusSVG } from "@/constants/svgs/svg";
import PasteSVG from "@/public/icons/clipboard-paste.svg";

export default function CityPriceInput({
  title,
  isRequired,
  hasSubmitted,
  showError,
  errorMessage,
  defaultValue,
  resetValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
  defaultValue?: CityPriceDocument[];
  resetValue?: boolean;
  setValue: (
    cityPriceValue: CityPriceDocument[]
  ) => void;
}) {
  const [cityPriceValues, setCityPriceValues] =
    useState<CityPriceDocument[]>(
      (defaultValue as CityPriceDocument[])
        ?.length
        ? (
            defaultValue as CityPriceDocument[]
          ).map((cityPriceValue) =>
            cityPriceValue._id
              ? cityPriceValue
              : ({
                  ...cityPriceValue,
                  _id: uuid()
                } as CityPriceDocument)
          )
        : [
            getInitialCityPriceValue() as CityPriceDocument
          ]
    );
  const [selectedCities, setSelectedCities] =
    useState<string[]>(
      (defaultValue as CityPriceDocument[])
        ?.length
        ? (defaultValue as CityPriceDocument[])
            .filter(
              (cityPriceValue) =>
                cityPriceValue.city
            )
            .map((cityPriceValue) =>
              (
                cityPriceValue.city as Schema.Types.ObjectId
              ).toString()
            )
        : []
    );
  const [cityPriceJSON, setCityPriceJSON] =
    useState<string>("");
  const [showTextInput, setShowTextInput] =
    useState<boolean>(false);
  const [hasChanged, setHasChanged] =
    useState<boolean>(false);

  const [cityOptions, setCityOptions] = useState<
    OptionType[]
  >([]);

  const handleAdd = () => {
    setCityPriceValues((prevCityPriceValues) => [
      ...prevCityPriceValues,
      getInitialCityPriceValue() as CityPriceDocument
    ]);
  };

  const handleDelete = (id: string) => {
    if (cityPriceValues.length > 1) {
      setCityPriceValues((prevQuickLinkValues) =>
        prevQuickLinkValues.filter(
          (prevQuickLinkValue) =>
            prevQuickLinkValue._id !== id
        )
      );
    }
  };

  const handleChange = (
    cityPriceValue: CityPriceDocument
  ) => {
    if (
      cityPriceValue.city &&
      cityPriceValue.mrp &&
      cityPriceValue.price
    ) {
      if (!hasChanged) {
        setTimeout(() => {
          setHasChanged(true);
        }, 100);
      }
    }

    setCityPriceValues((prevCityPriceValues) =>
      prevCityPriceValues.map(
        (prevCityPriceValue) =>
          prevCityPriceValue._id ===
          cityPriceValue._id
            ? cityPriceValue
            : prevCityPriceValue
      )
    );
  };

  const handleGetCityOptions = () => {
    getCities({
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
          setCityOptions(
            (
              responseData.data as CityDocument[]
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

  const parseJSONFromString = ({
    clipboardData
  }: ClipboardEvent<HTMLTextAreaElement>) => {
    const value = clipboardData
      ?.getData("text")
      .replace(/\r/g, "");

    if (value) {
      const formatted = value
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.split("\t"));

      const props = formatted[0];
      const types = formatted[1];
      const values = formatted.slice(2);

      const arr = values.map((value) => {
        const data = {};

        for (let i = 0; i < props.length; i++) {
          switch (types[i]) {
            case "string":
              // @ts-ignore
              data[props[i]] = value[i];
              break;

            case "number":
              // @ts-ignore
              data[props[i]] = Number(value[i]);
              break;

            default:
              break;
          }
        }

        return data;
      });

      const json = JSON.stringify(arr);
      const formattedJSON = json
        .replace(/\[/g, "[\n")
        .replace(/\{/g, "\n\t{\n\t\t")
        .replace(/\}/g, "\n\t}")
        .replace(/\]/g, "\n]")
        .replace(/},/g, "}$")
        .replace(/,/g, ",\n\t\t")
        .replace(/}\$/g, "},")
        .replace(/:/g, ": ");

      setCityPriceJSON(formattedJSON);
    } else {
      setCityPriceJSON("");
    }
  };

  const handleTextInput = () => {
    if (cityPriceJSON) {
      const newCityPrices = JSON.parse(
        cityPriceJSON
      );

      const cities: string[] = [];

      const validCityPrices = newCityPrices.map(
        // @ts-ignore
        (cityPrice) => {
          if (
            cityOptions.find(
              (option) =>
                option.label.toLowerCase() ===
                cityPrice.city.toLowerCase()
            )
          ) {
            const cityId = cityOptions.find(
              (option) =>
                option.label.toLowerCase() ===
                cityPrice.city.toLowerCase()
            )?.value;

            if (
              cityId &&
              !cities.includes(cityId)
            ) {
              cityPrice.city = cityId;

              cities.push(cityPrice.city);
            } else {
              cityPrice.city = "";
            }
          } else {
            cityPrice.city = "";
          }

          cityPrice._id = uuid();

          return cityPrice;
        }
      );

      setCityPriceValues(
        (prevCityPriceValues) => [
          ...prevCityPriceValues.filter(
            ({ city, mrp, price }) => {
              city && mrp && price;
            }
          ),
          ...validCityPrices
        ]
      );
    }

    setShowTextInput(false);
  };

  useEffect(() => {
    handleGetCityOptions();
  }, []);

  useEffect(() => {
    if (resetValue) {
      setCityPriceJSON("");
      setCityPriceValues([
        getInitialCityPriceValue() as CityPriceDocument
      ]);
    }
  }, [resetValue]);

  useEffect(() => {
    setValue(
      cityPriceValues
        .filter(
          ({ city, mrp, price }) =>
            city && mrp && price
        )
        .map(
          ({ _id, city, mrp, price }) =>
            ({
              ...(mongoose.Types.ObjectId.isValid(
                _id
              )
                ? { _id }
                : {}),
              city,
              mrp,
              price
            }) as CityPriceDocument
        )
    );
    setSelectedCities(
      cityPriceValues
        .filter(
          (cityPriceValue) => cityPriceValue.city
        )
        .map((cityPriceValue) =>
          (
            cityPriceValue.city as Schema.Types.ObjectId
          ).toString()
        )
    );
  }, [cityPriceValues]);

  return (
    <fieldset
      className={`w-full flex flex-col items-stretch justify-start `}
    >
      <legend className={styles.title}>
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div className={styles.textInputBtn}>
        <div
          className={`my-4 w-fit flex items-center justify-start gap-4`}
        >
          <Dialog>
            <DialogTrigger
              asChild
              className="w-full"
            >
              <div className="py-[8px] px-[20px] rounded-lg border-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 cursor-pointer text-black flex items-center justify-center gap-2 text-[14px] whitespace-nowrap">
                <Image
                  src={PasteSVG.src}
                  alt="PasteIcon"
                  height={16}
                  width={16}
                />{" "}
                Paste data
              </div>
            </DialogTrigger>
            <DialogOverlay className="z-[9999]" />
            <DialogContent className="min-w-fit z-[9999]">
              <div className=" min-w-[300px] sm:min-w-[420px] flex flex-col items-stretch justify-start gap-4">
                <div className="text-[16px] font-medium mt-[12px]">
                  Paste data here
                </div>
                <textarea
                  className={
                    "max-h-[70dvh] text-[16px] min-h-[50dvh] w-full rounded-xl border-[1.5px] border-black/30 transition-colors duration-300 hover:black/70 focus:outline-offset-1 focus:outline-blue-400 focus:outline-4"
                  }
                  name="textAreaInput"
                  spellCheck={false}
                  readOnly
                  value={cityPriceJSON}
                  onPaste={parseJSONFromString}
                />
                <div
                  className={`w-full flex items-center justify-between`}
                >
                  <Button
                    className={styles.closeBtn}
                    type="secondary"
                    label="reset"
                    variant="normal"
                    onClick={() => {
                      setCityPriceJSON("");
                    }}
                  />
                  <div
                    className={`flex items-center justify-end gap-3 mt-3`}
                  >
                    <DialogClose>
                      <Button
                        className={
                          styles.closeBtn
                        }
                        type="secondary"
                        label="close"
                        variant="normal"
                        onClick={() => {
                          setShowTextInput(false);
                        }}
                      />
                    </DialogClose>
                    <DialogClose>
                      <Button
                        className={styles.doneBtn}
                        type="primary"
                        label="done"
                        variant="normal"
                        onClick={handleTextInput}
                      />
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div
            onClick={handleAdd}
            className="py-[8px] px-[20px] rounded-lg cursor-pointer text-white bg-black flex items-center justify-center gap-2 text-[14px] whitespace-nowrap"
          >
            <PlusSVG dimensions={16} /> Add more
          </div>
        </div>
      </div>
      <div
        className={`relative grid grid-cols-[1fr_7fr_1fr_1fr_1fr] gap-4`}
      >
        <div
          className={`font-medium text-[16px] capitalize text-center sticky top-[68px] w-full z-50 py-2 bg-backdrop-primary`}
        >
          srNo
        </div>
        <div
          className={`font-medium text-[16px] capitalize sticky top-[68px] w-full z-50 py-2 bg-backdrop-primary`}
        >
          city
        </div>
        <div
          className={`font-medium text-[16px] capitalize text-center sticky top-[68px] w-full z-50 py-2 bg-backdrop-primary`}
        >
          MRP
        </div>
        <div
          className={`font-medium text-[16px] capitalize text-center sticky top-[68px] w-full z-50 py-2 bg-backdrop-primary`}
        >
          price
        </div>
        <div className=""></div>
        {cityPriceValues.map(
          (cityPriceValue, i) => (
            <CityPriceEditor
              key={cityPriceValue._id || i}
              srNo={i}
              cityOptions={cityOptions.filter(
                ({ value }) =>
                  (
                    cityPriceValue?.city as Schema.Types.ObjectId
                  )?.toString() === value ||
                  !selectedCities.includes(value)
              )}
              initialValue={cityPriceValue}
              setValue={(
                cityPriceValue: CityPriceDocument
              ) => {
                handleChange(cityPriceValue);
              }}
              onDelete={() =>
                handleDelete(cityPriceValue._id)
              }
            />
          )
        )}
      </div>
      {showTextInput ? <></> : <></>}
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
