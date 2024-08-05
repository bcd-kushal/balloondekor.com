/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import CustomVariantCategoryInput from "./CustomVariantCategoryInput";
import Input from "./Input";
import ReferenceVariantCategoryInput from "./ReferenceVariantCategoryInput";

import { getUnits } from "@/fetchAPIs/cms/unit";

import {
  CustomVariantDocument,
  CustomVariantCategoryDocument,
  CustomVariantCategoryOptionsDocument,
  ReferenceVariantCategoryDocument,
  VariantCategoryDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";
import { UnitDocument } from "@/schemas/cms/unit";

import styles from "@/components/common/form/variantCategoryEditor.module.css";
import { BinSVG } from "@/constants/svgs/svg";

export const getInitialVariantCategoryValue =
  (): Partial<VariantCategoryDocument> => ({
    _id: uuid(),
    label: "",
    references:
      [] as ReferenceVariantCategoryDocument[],
    custom: {
      options: {
        image: false,
        unit: false
      } as CustomVariantCategoryOptionsDocument,
      variants: [] as CustomVariantDocument[]
    } as CustomVariantCategoryDocument
  });

export default function VariantCategoryEditor({
  srNo,
  selfReference,
  initialValue = getInitialVariantCategoryValue(),
  setValue,
  onDelete
}: {
  srNo: number;
  selfReference: ServiceDocument;
  initialValue?: Partial<VariantCategoryDocument>;
  setValue: (
    value: VariantCategoryDocument
  ) => void;
  onDelete: () => void;
}) {
  const [
    variantCategoryValue,
    setVariantCategoryValue
  ] =
    useState<Partial<VariantCategoryDocument>>(
      initialValue
    );
  const [category, setCategory] = useState<
    "" | "reference" | "custom"
  >(
    variantCategoryValue?.references?.length ||
      variantCategoryValue?.custom?.variants
        ?.length
      ? variantCategoryValue?.references?.length
        ? "reference"
        : "custom"
      : ""
  );

  const [unit, setUnit] = useState<
    UnitDocument | undefined
  >(
    (variantCategoryValue?.custom
      ?.unit as UnitDocument) || undefined
  );
  const [resetUnit, setResetUnit] =
    useState<boolean>(false);

  const [units, setUnits] = useState<
    UnitDocument[]
  >([]);
  const [unitOptions, setUnitOptions] = useState<
    OptionType[]
  >([]);

  const handleLabelChange = (
    label: string
  ): void => {
    setVariantCategoryValue(
      (prevVariantCategoryValue) => ({
        ...prevVariantCategoryValue,
        label
      })
    );
  };

  const handleReferencesChange = (
    references: ReferenceVariantCategoryDocument[]
  ): void => {
    setVariantCategoryValue(
      (prevVariantCategoryValue) => ({
        ...prevVariantCategoryValue,
        // @ts-ignore
        custom: {
          options: {
            image: false,
            unit: false
          },
          variants:
            [] as VariantCategoryDocument[]
        } as CustomVariantCategoryDocument,
        references
      })
    );
  };

  const handleCustomOptionImageChange = (
    imageOption: boolean
  ): void => {
    setVariantCategoryValue(
      (prevVariantCategoryValue) =>
        ({
          ...prevVariantCategoryValue,
          custom: {
            options: {
              ...prevVariantCategoryValue.custom
                ?.options,
              image: imageOption
            } as CustomVariantCategoryOptionsDocument,
            ...(prevVariantCategoryValue.custom
              ?.unit
              ? {
                  unit: prevVariantCategoryValue
                    .custom?.unit
                }
              : {}),
            variants: prevVariantCategoryValue
              .custom
              ?.variants as CustomVariantDocument[]
          }
        }) as VariantCategoryDocument
    );
  };

  const handleCustomOptionUnitChange = (
    unitOption: boolean
  ): void => {
    setVariantCategoryValue(
      (prevVariantCategoryValue) =>
        ({
          ...prevVariantCategoryValue,
          custom: {
            options: {
              ...prevVariantCategoryValue.custom
                ?.options,
              unit: unitOption
            } as CustomVariantCategoryOptionsDocument,
            ...(prevVariantCategoryValue.custom
              ?.unit
              ? {
                  unit: prevVariantCategoryValue
                    .custom?.unit
                }
              : {}),
            variants: prevVariantCategoryValue
              .custom
              ?.variants as CustomVariantDocument[]
          }
        }) as VariantCategoryDocument
    );

    if (!unitOption && unit) {
      setResetUnit(true);
    }
  };

  const handleUnitChange = (id: string): void => {
    if (units.length) {
      setVariantCategoryValue(
        (prevVariantCategoryValue) =>
          ({
            ...prevVariantCategoryValue,
            custom: {
              options: prevVariantCategoryValue
                .custom
                ?.options as CustomVariantCategoryOptionsDocument,
              unit: units.find(
                ({ _id }) => _id === id
              ),
              variants: prevVariantCategoryValue
                .custom
                ?.variants as CustomVariantDocument[]
            }
          }) as VariantCategoryDocument
      );
    }
  };

  const handleCustomVariantsChange = (
    variants: CustomVariantDocument[]
  ): void => {
    setVariantCategoryValue(
      (prevVariantCategoryValue) =>
        ({
          ...prevVariantCategoryValue,
          custom: {
            ...prevVariantCategoryValue.custom,
            variants
          },
          references:
            [] as ReferenceVariantCategoryDocument[]
        }) as VariantCategoryDocument
    );
  };

  const handleGetUnits = () => {
    getUnits({
      active: true,
      offset: 0,
      limit: 0,
      sortBy: "",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setUnits(
            responseData.data as UnitDocument[]
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
    handleGetUnits();
  }, []);

  useEffect(() => {
    setUnitOptions(
      units.map(({ _id, name }) => ({
        label: name,
        value: _id
      }))
    );
  }, [units]);

  useEffect(() => {
    if (resetUnit) {
      setResetUnit(false);
    }
  }, [resetUnit]);

  useEffect(() => {
    setValue(
      variantCategoryValue as VariantCategoryDocument
    );
  }, [variantCategoryValue]);

  return (
    <div
      className={`relative min-w-full rounded-xl border-[1.5px] border-black/30 max-h-[450px] scrollbar-hide overflow-y-scroll`}
    >
      <section
        className={`w-full sticky top-0 bg-zinc-200 px-5 flex items-center justify-between z-[999]`}
      >
        <span
          className={`flex items-center justify-start gap-7 *:text-[16px] capitalize font-semibold`}
        >
          <span>{`category ${srNo + 1}`}</span>
          <span>
            <Input
              title=""
              name="variantCategory"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="dropdown"
              options={[
                {
                  label: "reference",
                  value: "reference"
                },
                {
                  label: "custom",
                  value: "custom"
                }
              ]}
              defaultValue={category}
              setValue={(category) => {
                setCategory(
                  category as
                    | ""
                    | "reference"
                    | "custom"
                );
              }}
            />
          </span>
        </span>
        <div
          className="py-2 px-5 rounded-lg border-[1.5px] border-[#aa000060] bg-[#aa000020] text-red-600 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-700 hover:text-white cursor-pointer text-[14px]"
          onClick={onDelete}
        >
          <BinSVG /> Delete
        </div>
      </section>
      {category === "custom" ? (
        <div
          className={`px-5 flex items-center justify-start gap-10 w-full min-h-[63px]`}
        >
          <div
            className={`flex items-center justify-start gap-3 text-[14px] capitalize`}
          >
            <span className={styles.toggleLabel}>
              include image
            </span>
            <span className="-translate-y-[2px]">
              <Input
                title=""
                name="includeImage"
                isRequired={false}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="boolean"
                defaultValue={
                  variantCategoryValue?.custom
                    ?.options?.image || false
                }
                setValue={
                  handleCustomOptionImageChange
                }
              />
            </span>
          </div>
          <div
            className={`flex items-center justify-start gap-3 text-[14px] capitalize`}
          >
            <span className={styles.toggleLabel}>
              include unit
            </span>
            <span className="-translate-y-[2px]">
              <Input
                title=""
                name="includeUint"
                isRequired={false}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="boolean"
                defaultValue={
                  variantCategoryValue?.custom
                    ?.options?.unit || false
                }
                setValue={
                  handleCustomOptionUnitChange
                }
              />
            </span>
          </div>
          <div
            className={`items-center justify-start gap-3 ${
              variantCategoryValue?.custom
                ?.options?.unit
                ? "flex"
                : "hidden"
            }`}
          >
            <span className="text-[15px] font-medium ml-4">
              Unit:
            </span>
            <Input
              title=""
              name="unit"
              isRequired={false}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="dropdown"
              options={unitOptions}
              resetValue={resetUnit}
              defaultValue={
                (
                  variantCategoryValue?.custom
                    ?.unit as UnitDocument
                )?._id || ""
              }
              setValue={(value) => {
                handleUnitChange(value as string);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        {category === "reference" ? (
          <>
            <div className="w-full px-4 py-3 ">
              <Input
                title="label"
                name="variantCategoryLabel"
                isRequired={true}
                hasSubmitted={true}
                showError={
                  !Boolean(
                    (
                      variantCategoryValue.label as string
                    ).length
                  )
                }
                errorMessage=""
                variant="text"
                disabled={!category}
                defaultValue={
                  variantCategoryValue.label as string
                }
                setValue={handleLabelChange}
              />
            </div>
            <ReferenceVariantCategoryInput
              title="references"
              isRequired
              selfReference={selfReference}
              defaultValue={
                variantCategoryValue.references as ReferenceVariantCategoryDocument[]
              }
              setValue={handleReferencesChange}
            />
          </>
        ) : (
          <></>
        )}
        {category === "custom" ? (
          <>
            <div className="w-full px-4 py-3 ">
              <Input
                title="label"
                name="variantCategoryLabel"
                isRequired={true}
                hasSubmitted={true}
                showError={
                  !Boolean(
                    (
                      variantCategoryValue.label as string
                    ).length
                  )
                }
                errorMessage=""
                variant="text"
                disabled={!category}
                defaultValue={
                  variantCategoryValue.label as string
                }
                setValue={handleLabelChange}
              />
            </div>
            <CustomVariantCategoryInput
              title="custom variants"
              isRequired
              selfReference={selfReference}
              initialValue={
                variantCategoryValue.custom as CustomVariantCategoryDocument
              }
              setValue={
                handleCustomVariantsChange
              }
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
