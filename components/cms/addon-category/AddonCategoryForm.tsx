"use client";

// libraries
import { FormEvent } from "react";
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
  addAddonCategory,
  updateAddonCategory
} from "@/fetchAPIs/cms/addonCategory";

// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/addon-category/addonCategoryForm.module.css";

// FORM CONTROL CONFIGURATION
export function getAddonCategoryFormConfig({
  name
}: Partial<AddonCategoryDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    }
  };
}

export default function AddonCategoryForm({
  addonCategoryId
}: {
  addonCategoryId?: string;
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

  // handlers
  const handelSubmit = (
    data: Partial<AddonCategoryDocument>
  ): void => {
    if (addonCategoryId) {
      updateAddonCategory(addonCategoryId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/addon-category");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addAddonCategory(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/addon-category");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

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
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              addonCategoryId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/addon-category"
          />
        </section>
      </div>
    </form>
  );
}
