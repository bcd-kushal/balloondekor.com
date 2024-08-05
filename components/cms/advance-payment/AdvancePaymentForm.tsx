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
  addAdvancePayment,
  updateAdvancePayment
} from "@/fetchAPIs/cms/advancePayment";

// types
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/advance-payment/advancePaymentForm.module.css";

// FORM CONTROL CONFIGURATION
export function getAdvancePaymentFormConfig({
  label,
  value
}: Partial<AdvancePaymentDocument>): ConfigType {
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

export default function AdvancePaymentForm({
  advancePaymentId
}: {
  advancePaymentId?: string;
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
    data: Partial<AdvancePaymentDocument>
  ): void => {
    if (advancePaymentId) {
      updateAdvancePayment(advancePaymentId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/presets/advance-payments");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addAdvancePayment(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/presets/advance-payments");
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
            submitBtnLabel={
              advancePaymentId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/advance-payment"
          />
        </section>
      </div>
    </form>
  );
}
