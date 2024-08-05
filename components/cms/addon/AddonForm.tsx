/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import {
  addAddon,
  updateAddon
} from "@/fetchAPIs/cms/addon";
import { getAddonCategories } from "@/fetchAPIs/cms/addonCategory";

import { OptionType } from "@/types/cms/form";
// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { ImageDocument } from "@/schemas/cms/image";
import {
  ResponseDataType,
  PaginationResponseDataType
} from "@/types/cms/api";

// styles
import styles from "@/components/cms/addon/addonForm.module.css";

// FORM CONTROL CONFIGURATION
export function getAddonFormConfig({
  category,
  name,
  isCustomizable,
  price,
  image,
  customizableLabel
}: Partial<AddonDocument>): ConfigType {
  return {
    category: {
      type: "dropdown",
      isRequired: true,
      defaultValue:
        (category as AddonCategoryDocument)
          ?._id || ""
    },
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    image: {
      isRequired: true,
      type: "selectImage",
      defaultValue: image
        ? [image as ImageDocument]
        : []
    },
    price: {
      isRequired: true,
      type: "number",
      defaultValue: price || NaN
    },
    isCustomizable: {
      type: "boolean",
      isRequired: false,
      defaultValue: isCustomizable || false
    },
    customizableLabel: {
      isRequired: false,
      type: "text",
      defaultValue: customizableLabel || ""
    }
  };
}

export default function AddonForm({
  addonId
}: {
  addonId?: string;
}) {
  // hooks
  const { push } = useRouter();

  const {
    defaultValue,
    resetValue,
    onReset,
    value,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const { addStatus } = useStatusContext();
  const [
    addonCategoriesOptions,
    setAddonCategoriesOptions
  ] = useState<OptionType[]>([]);

  const [
    showCustomizableLabel,
    setShowCustomizableLabel
  ] = useState<boolean>(
    (defaultValue["isCustomizable"] as boolean) ||
      false
  );

  // handlers
  const handelSubmit = (
    data: Partial<AddonDocument>
  ): void => {
    if (addonId) {
      updateAddon(addonId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/addon");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addAddon(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/addon");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  const handleGetAddonCategoriesOptions = () => {
    getAddonCategories({
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
          setAddonCategoriesOptions(
            (
              responseData.data as AddonCategoryDocument[]
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
          addStatus(responseData.status);
        }
      );
  };

  useEffect(() => {
    handleGetAddonCategoriesOptions();
  }, []);

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handelSubmit(data);
        })
      }
    >
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="category"
          name="category"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["category"]}
          errorMessage={"Category is required"}
          variant="dropdown"
          options={addonCategoriesOptions}
          defaultValue={
            defaultValue["category"] as string
          }
          resetValue={resetValue["category"]}
          setValue={setValue["category"]}
        />
        <Input
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "Name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <Input
          title="image"
          name="image"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["image"]}
          errorMessage={"image is required"}
          variant="selectImage"
          defaultValue={
            defaultValue[
              "image"
            ] as ImageDocument[]
          }
          resetValue={resetValue["image"]}
          setValue={setValue["image"]}
        />
        <Input
          title="price"
          name="price"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["price"]}
          errorMessage={"price is required"}
          variant="number"
          defaultValue={
            defaultValue["price"] as number
          }
          resetValue={resetValue["price"]}
          decimal
          setValue={setValue["price"]}
        />
        <Input
          title="is customizable"
          name="isCustomizable"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["isCustomizable"]}
          errorMessage={
            "Is Customizable is required"
          }
          variant="boolean"
          defaultValue={showCustomizableLabel}
          setValue={setShowCustomizableLabel}
        />
        {showCustomizableLabel ? (
          <Input
            title="Customizable Label"
            name="customizableLabel"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["customizableLabel"]}
            errorMessage={
              error["customizableLabel"]
                ? "Customizable Label is required"
                : " "
            }
            variant="text"
            defaultValue={
              defaultValue[
                "customizableLabel"
              ] as string
            }
            resetValue={
              resetValue["customizableLabel"]
            }
            setValue={
              setValue["customizableLabel"]
            }
          />
        ) : (
          <></>
        )}
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              addonId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/addon"
          />
        </section>
      </div>
    </form>
  );
}
