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
  addOrderProcessingTime,
  updateOrderProcessingTime
} from "@/fetchAPIs/cms/orderProcessingTime";

// types
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/order-processing-time/orderProcessingTimeForm.module.css";

// FORM CONTROL CONFIGURATION
export function getOrderProcessingTimeFormConfig({
  label,
  time
}: Partial<OrderProcessingTimeDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    },
    time: {
      isRequired: true,
      type: "number",
      defaultValue: time ? time : NaN
    }
  };
}

export default function OrderProcessingTimeForm({
  orderProcessingTimeId
}: {
  orderProcessingTimeId?: string;
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
    data: Partial<OrderProcessingTimeDocument>
  ): void => {
    if (orderProcessingTimeId) {
      updateOrderProcessingTime(
        orderProcessingTimeId,
        data
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/order-processing-time");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addOrderProcessingTime(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/order-processing-time");
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
          title="time"
          name="time"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["time"]}
          errorMessage={"time is required"}
          variant="number"
          defaultValue={
            defaultValue["time"] as number
          }
          resetValue={resetValue["time"]}
          setValue={setValue["time"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              orderProcessingTimeId
                ? "update"
                : "add"
            }
            variant="page"
            closeBtnLink="/cms/order-processing-time"
          />
        </section>
      </div>
    </form>
  );
}
