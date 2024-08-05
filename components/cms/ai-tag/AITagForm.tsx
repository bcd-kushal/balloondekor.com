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
  addAITag,
  updateAITag
} from "@/fetchAPIs/cms/aiTag";

// types
import { AITagDocument } from "@/schemas/cms/aiTag";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/ai-tag/aiTagForm.module.css";

// FORM CONTROL CONFIGURATION
export function getAITagFormConfig({
  label
}: Partial<AITagDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    }
  };
}

export default function AITagForm({
  aiTagId: aiTagId
}: {
  aiTagId?: string;
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
    data: Partial<AITagDocument>
  ): void => {
    if (aiTagId) {
      updateAITag(aiTagId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/ai-tag");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addAITag(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/ai-tag");
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
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              aiTagId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/ai-tag"
          />
        </section>
      </div>
    </form>
  );
}
