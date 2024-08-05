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
  addGST,
  updateGST
} from "@/fetchAPIs/cms/gst";

// types
import { GSTDocument } from "@/schemas/cms/gst";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/gst/gstForm.module.css";

// FORM CONTROL CONFIGURATION
export function getGSTFormConfig({
  label,
  value
}: Partial<GSTDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    },
    value: {
      isRequired: true,
      type: "number",
      defaultValue: value ? value : NaN
    }
  };
}

export default function GSTForm({
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
    data: Partial<GSTDocument>
  ): void => {
    if (id) {
      updateGST(id, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/gst");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addGST(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/gst");
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
          title="value"
          name="value"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["value"]}
          errorMessage={"value is required"}
          variant="number"
          defaultValue={
            defaultValue["value"] as number
          }
          resetValue={resetValue["value"]}
          setValue={setValue["value"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={id ? "update" : "add"}
            variant="page"
            closeBtnLink="/cms/gst"
          />
        </section>
      </div>
    </form>
  );
}
