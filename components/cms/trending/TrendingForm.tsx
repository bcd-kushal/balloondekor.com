"use client";

// libraries
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import {
  addTrending,
  updateTrending
} from "@/fetchAPIs/cms/trending";

// types
import { TrendingDocument } from "@/schemas/cms/trending";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/trending/trendingForm.module.css";

// FORM CONTROL CONFIGURATION
export function getTrendingFormConfig({
  label,
  path
}: Partial<TrendingDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    },
    path: {
      isRequired: true,
      type: "text",
      defaultValue: path ? path : ""
    }
  };
}

export default function TrendingForm({
  id
}: {
  id?: string;
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
    data: Partial<TrendingDocument>
  ): void => {
    if (id) {
      updateTrending(id, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/settings/trending");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addTrending(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/settings/trending");
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
              ? "label is required"
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
          title="path"
          name="path"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["path"]}
          errorMessage={
            error["path"]
              ? "path is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["path"] as string
          }
          resetValue={resetValue["path"]}
          setValue={setValue["path"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={id ? "update" : "add"}
            variant="page"
            closeBtnLink="/cms/settings/trending"
          />
        </section>
      </div>
    </form>
  );
}
