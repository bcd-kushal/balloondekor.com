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
  addDeliveryDetail,
  updateDeliveryDetail
} from "@/fetchAPIs/cms/deliveryDetail";

// types
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/delivery-detail/deliveryDetailForm.module.css";

// FORM CONTROL CONFIGURATION
export function getDeliveryDetailFormConfig({
  label,
  content
}: Partial<DeliveryDetailDocument>): ConfigType {
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

export default function DeliveryDetailForm({
  deliveryDetailId
}: {
  deliveryDetailId?: string;
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
    data: Partial<DeliveryDetailDocument>
  ): void => {
    if (deliveryDetailId) {
      updateDeliveryDetail(deliveryDetailId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/delivery-detail");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addDeliveryDetail(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/delivery-detail");
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
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
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
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              deliveryDetailId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/delivery-detail"
          />
        </section>
      </div>
    </form>
  );
}
