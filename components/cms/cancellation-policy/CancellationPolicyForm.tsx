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
  addCancellationPolicy,
  updateCancellationPolicy
} from "@/fetchAPIs/cms/cancellationPolicy";

// types
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/cancellation-policy/cancellationPolicyForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCancellationPolicyFormConfig({
  label,
  content
}: Partial<CancellationPolicyDocument>): ConfigType {
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

export default function CancellationPolicyForm({
  cancellationPolicyId
}: {
  cancellationPolicyId?: string;
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
    data: Partial<CancellationPolicyDocument>
  ): void => {
    if (cancellationPolicyId) {
      updateCancellationPolicy(
        cancellationPolicyId,
        data
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/cancellation-policy");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addCancellationPolicy(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/cancellation-policy");
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
          title="content"
          name="content"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["content"]}
          errorMessage={"content is required"}
          variant="longText"
          defaultValue={
            defaultValue["content"] as string
          }
          resetValue={resetValue["content"]}
          setValue={setValue["content"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              cancellationPolicyId
                ? "update"
                : "add"
            }
            variant="page"
            closeBtnLink="/cms/cancellation-policy"
          />
        </section>
      </div>
    </form>
  );
}
