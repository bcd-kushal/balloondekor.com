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
  addDeliveryType,
  updateDeliveryType
} from "@/fetchAPIs/cms/deliveryType";

// types
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/delivery-type/deliveryTypeForm.module.css";

// FORM CONTROL CONFIGURATION
export function getDeliveryTypeFormConfig({
  name,
  price,
  timeSlots
}: Partial<DeliveryTypeDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    price: {
      isRequired: true,
      type: "number",
      defaultValue: price ? price : NaN
    },
    timeSlots: {
      isRequired: true,
      type: "timeSlot",
      defaultValue: timeSlots || []
    }
  };
}

export default function DeliveryTypeForm({
  deliveryTypeId
}: {
  deliveryTypeId?: string;
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
    data: Partial<DeliveryTypeDocument>
  ): void => {
    if (deliveryTypeId) {
      updateDeliveryType(deliveryTypeId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/delivery-type");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addDeliveryType(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/delivery-type");
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
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <Input
          title="price"
          name="price"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["price"]}
          errorMessage={"price is required"}
          variant="number"
          defaultValue={
            defaultValue["price"] as number
          }
          resetValue={resetValue["price"]}
          setValue={setValue["price"]}
        />
        <Input
          title="time slots"
          name="timeSlots"
          isRequired={true}
          hasSubmitted={false}
          showError={error["timeSlots"]}
          errorMessage={"Time Slots is required"}
          variant="timeSlot"
          defaultValues={
            defaultValue[
              "timeSlots"
            ] as TimeSlotDocument[]
          }
          setValue={setValue["timeSlots"]}
        />
      </div>
      <div
        className={`translate-y-[40px] ${styles.actionsContainer}`}
      >
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              deliveryTypeId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/delivery-type"
          />
        </section>
      </div>
    </form>
  );
}
