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
  addServiceTypeOption,
  updateServiceTypeOption
} from "@/fetchAPIs/cms/serviceTypeOption";

// types
import { ServiceTypeOptionDocument } from "@/schemas/cms/serviceTypeOption";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/service-type-option/serviceTypeOptionForm.module.css";

// FORM CONTROL CONFIGURATION
export function getServiceTypeOptionFormConfig({
  name,
  price
}: Partial<ServiceTypeOptionDocument>): ConfigType {
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
    }
  };
}

export default function ServiceTypeOptionForm({
  serviceTypeOptionId
}: {
  serviceTypeOptionId?: string;
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
    data: Partial<ServiceTypeOptionDocument>
  ): void => {
    if (serviceTypeOptionId) {
      updateServiceTypeOption(
        serviceTypeOptionId,
        data
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/service-type-option");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addServiceTypeOption(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/service-type-option");
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
      className={styles.container}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handelSubmit(data);
        })
      }
    >
      <div className={styles.inputs}>
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
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              serviceTypeOptionId
                ? "update"
                : "add"
            }
            variant="page"
            closeBtnLink="/cms/service-type-option"
          />
        </section>
      </div>
    </form>
  );
}
