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
  addCustomizationQuestion,
  updateCustomizationQuestion
} from "@/fetchAPIs/cms/customizationQuestion";

// types
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/customization-question/customizationQuestionForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCustomizationQuestionFormConfig({
  question
}: Partial<CustomizationQuestionDocument>): ConfigType {
  return {
    question: {
      isRequired: true,
      type: "text",
      defaultValue: question || ""
    }
  };
}

export default function CustomizationQuestionForm({
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
  const handelSubmit = (
    data: Partial<CustomizationQuestionDocument>
  ): void => {
    if (id) {
      updateCustomizationQuestion(id, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/customization-question");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addCustomizationQuestion(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/customization-question");
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
          title="question"
          name="question"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["question"]}
          errorMessage={
            error["question"]
              ? "Question is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["question"] as string
          }
          resetValue={resetValue["question"]}
          setValue={setValue["question"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={id ? "update" : "add"}
            variant="page"
            closeBtnLink="/cms/customization-question"
          />
        </section>
      </div>
    </form>
  );
}
