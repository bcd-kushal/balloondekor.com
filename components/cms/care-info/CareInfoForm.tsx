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
  addCareInfo,
  updateCareInfo
} from "@/fetchAPIs/cms/careInfo";

// types
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/care-info/careInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCareInfoFormConfig({
  label,
  content
}: Partial<CareInfoDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    },
    content: {
      isRequired: true,
      type: "text",
      defaultValue: content ? content : ""
    }
  };
}

export default function CareInfoForm({
  careInfoId
}: {
  careInfoId?: string;
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
    data: Partial<CareInfoDocument>
  ): void => {
    if (careInfoId) {
      updateCareInfo(careInfoId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/care-info");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addCareInfo(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/care-info");
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
          title="label"
          name="label"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["label"]}
          errorMessage={
            error["label"]
              ? "Label is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["label"] as string
          }
          resetValue={resetValue["label"]}
          setValue={setValue["label"]}
        />
        <Input
          title="content"
          name="content"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["content"]}
          errorMessage={
            error["content"]
              ? "Content is required"
              : " "
          }
          variant="longText"
          defaultValue={
            defaultValue["content"] as string
          }
          resetValue={resetValue["content"]}
          setValue={setValue["content"]}
        />
        <div className={`translate-y-[100px]`}>
          <FormActions
            submitBtnLabel={
              careInfoId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/care-info"
          />
        </div>
      </div>
    </form>
  );
}
