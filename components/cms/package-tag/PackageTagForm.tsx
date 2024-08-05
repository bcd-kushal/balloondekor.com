/* eslint-disable react-hooks/exhaustive-deps */

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
  addPackageTag,
  updatePackageTag
} from "@/fetchAPIs/cms/packageTag";

// types
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/package-tag/packageTagForm.module.css";

// FORM CONTROL CONFIGURATION
export function getPackageTagFormConfig({
  name,
  colorCode
}: Partial<PackageTagDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    colorCode: {
      isRequired: true,
      type: "text",
      defaultValue: colorCode ? colorCode : ""
    }
  };
}

export default function PackageTagForm({
  packageTagId
}: {
  packageTagId?: string;
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
  const handleSubmit = (
    data: Partial<PackageTagDocument>
  ): void => {
    if (packageTagId) {
      updatePackageTag(packageTagId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/package-tag");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addPackageTag(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/package-tag");
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
          handleSubmit(data);
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
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Color (Hex)"
          name="colorCode"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["colorCode"]}
          errorMessage={
            error["colorCode"]
              ? "Color is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["colorCode"] as string
          }
          resetValue={resetValue["colorCode"]}
          setValue={setValue["colorCode"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              packageTagId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/package-tag"
          />
        </section>
      </div>
    </form>
  );
}
