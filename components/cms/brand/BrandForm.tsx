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
  addBrand,
  updateBrand
} from "@/fetchAPIs/cms/brand";

// types
import { BrandDocument } from "@/schemas/cms/brand";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/brand/brandForm.module.css";

// FORM CONTROL CONFIGURATION
export function getBrandFormConfig({
  name,
  email,
  contactNumber,
  address
}: Partial<BrandDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    email: {
      isRequired: true,
      type: "text",
      defaultValue: email || ""
    },
    contactNumber: {
      isRequired: true,
      type: "text",
      defaultValue: contactNumber || ""
    },
    address: {
      isRequired: true,
      type: "text",
      defaultValue: address || ""
    }
  };
}

export default function BrandForm({
  brandId
}: {
  brandId?: string;
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
    data: Partial<BrandDocument>
  ): void => {
    if (brandId) {
      updateBrand(brandId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/brand");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addBrand(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/brand");
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
          title="email"
          name="email"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["email"]}
          errorMessage={
            error["email"]
              ? "email is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["email"] as string
          }
          resetValue={resetValue["email"]}
          setValue={setValue["email"]}
        />
        <Input
          title="contact number"
          name="contactNumber"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["contactNumber"]}
          errorMessage={
            error["contactNumber"]
              ? "contactNumber is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue[
              "contactNumber"
            ] as string
          }
          resetValue={resetValue["contactNumber"]}
          setValue={setValue["contactNumber"]}
        />
        <Input
          title="address"
          name="address"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["address"]}
          errorMessage={
            error["address"]
              ? "address is required"
              : " "
          }
          variant="longText"
          defaultValue={
            defaultValue["address"] as string
          }
          resetValue={resetValue["address"]}
          setValue={setValue["address"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              brandId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/brand"
          />
        </section>
      </div>
    </form>
  );
}
