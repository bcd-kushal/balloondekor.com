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
  addFAQ,
  updateFAQ
} from "@/fetchAPIs/cms/faq";

// types
import { FAQDocument as OldFAQDocument } from "@/schemas/cms/serviceCategory";
import { FAQDocument } from "@/schemas/cms/faq";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/faq/faqForm.module.css";

// FORM CONTROL CONFIGURATION
export function getFAQFormConfig({
  category,
  faqs
}: Partial<FAQDocument>): ConfigType {
  return {
    category: {
      isRequired: true,
      type: "text",
      defaultValue: category || ""
    },
    faqs: {
      isRequired: false,
      type: "faq",
      defaultValue: faqs || []
    }
  };
}

export default function FAQForm({
  faqId
}: {
  faqId?: string;
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
    data: Partial<FAQDocument>
  ): void => {
    if (faqId) {
      updateFAQ(faqId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/faq");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addFAQ(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/faq");
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
          title="category"
          name="category"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["category"]}
          errorMessage={
            error["category"]
              ? "category is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["category"] as string
          }
          resetValue={resetValue["category"]}
          setValue={setValue["category"]}
        />
        <Input
          title="faqs"
          name="faqs"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["faqs"]}
          errorMessage={
            error["faqs"]
              ? "faqs is required"
              : " "
          }
          variant="faq"
          defaultValue={
            defaultValue[
              "faqs"
            ] as OldFAQDocument[]
          }
          setValue={setValue["faqs"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              faqId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/faq"
          />
        </section>
      </div>
    </form>
  );
}
