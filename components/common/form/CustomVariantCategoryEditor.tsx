/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/form/Input";
import PriceModal from "./PriceModal";

import { ImageDocument } from "@/schemas/cms/image";
import {
  CustomVariantCategoryOptionsDocument,
  CustomVariantDocument,
  PriceDocument
} from "@/schemas/cms/service";
import { UnitDocument } from "@/schemas/cms/unit";

import styles from "@/components/common/form/customVariantCategoryEditor.module.css";
import { CrossSVG } from "@/constants/svgs/svg";

export default function CustomVariantCategoryEditor({
  options,
  unit,
  isSelf,
  initialValue,
  showCityPrice,
  onDelete,
  setValue,
  onClick
}: {
  options: CustomVariantCategoryOptionsDocument;
  unit?: UnitDocument;
  isSelf: boolean;
  initialValue: CustomVariantDocument;
  showCityPrice?: boolean;
  onDelete: () => void;
  setValue: (
    variant: CustomVariantDocument
  ) => void;
  onClick: () => void;
}) {
  const [image, setImage] = useState<string>(
    initialValue.image
      ? (initialValue.image as ImageDocument)._id
      : ""
  );
  const [unitValue, setUnitValue] =
    useState<number>(initialValue.value || NaN);
  const [label, setLabel] = useState<string>(
    initialValue.label || ""
  );
  const [price, setPrice] =
    useState<PriceDocument>(initialValue.price);

  const [showPriceModal, setShowPriceModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSelf) {
      setValue({
        ...initialValue,
        ...(options.unit
          ? { value: unitValue }
          : {}),
        ...(options.unit ? {} : { label })
      } as CustomVariantDocument);
    } else {
      setValue({
        ...initialValue,
        ...(options.image && image
          ? { image }
          : {}),
        ...(options.unit && unitValue
          ? { value: unitValue }
          : {}),
        ...(!options.unit && label
          ? { label }
          : {}),
        price
      } as CustomVariantDocument);
    }
  }, [image, unitValue, label, price]);

  return (
    <div
      className={`mt-4 transition-all duration-300 hover:border-black/60 relative flex flex-col items-stretch justify-start gap-3 p-3 border-[1.5px] rounded-lg border-black/30 w-fit`}
    >
      {isSelf ? (
        <></>
      ) : (
        <span
          className="p-2 rounded-full bg-red-500 text-white absolute -right-5 -top-3 cursor-pointer"
          onClick={onDelete}
        >
          <CrossSVG />
        </span>
      )}
      {options.image ? (
        <div
          className={`flex items-center justify-center ${isSelf ? styles.disabled : ""}`}
        >
          <Input
            title=""
            name="image"
            isRequired={true}
            hasSubmitted={false}
            showError={false}
            errorMessage=""
            variant="selectImage"
            defaultValue={
              initialValue.image
                ? [
                    initialValue.image as ImageDocument
                  ]
                : []
            }
            setValue={(selectedImages) => {
              setImage(
                (selectedImages as string[])[0] ||
                  ""
              );
            }}
          />
        </div>
      ) : (
        <></>
      )}
      {options.unit ? (
        <Input
          title=""
          name="unitValue"
          isRequired={true}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          variant="number"
          disabled={!unit}
          defaultValue={unitValue}
          decimal
          placeholder={
            (unit as UnitDocument)?.abbr ||
            "select unit"
          }
          setValue={setUnitValue}
        />
      ) : (
        <></>
      )}
      {options.unit ? (
        <></>
      ) : (
        <Input
          title=""
          name="label"
          isRequired={true}
          hasSubmitted={false}
          showError={false}
          errorMessage=""
          variant="text"
          defaultValue={label}
          placeholder="label"
          setValue={setLabel}
        />
      )}
      <Button
        className={isSelf ? styles.disabled : ""}
        type="primary"
        label="price"
        variant="normal"
        onClick={() => {
          setShowPriceModal(true);
        }}
      />
      {showPriceModal ? (
        <PriceModal
          initialValue={price}
          showCityPrice={showCityPrice}
          onClose={() => {
            setShowPriceModal(false);
          }}
          onDone={setPrice}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
