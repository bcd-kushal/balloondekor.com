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
  addColor,
  updateColor
} from "@/fetchAPIs/cms/color";

// types
import { ColorDocument } from "@/schemas/cms/color";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/color/colorForm.module.css";

// FORM CONTROL CONFIGURATION
export function getColorFormConfig({
  name,
  code
}: Partial<ColorDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    code: {
      isRequired: true,
      type: "text",
      defaultValue: code ? code : ""
    }
  };
}

export default function ColorForm({
  colorId
}: {
  colorId?: string;
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
    data: Partial<ColorDocument>
  ): void => {
    if (colorId) {
      updateColor(colorId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/color");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addColor(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/color");
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
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "Name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Hex Code"
          name="code"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["code"]}
          errorMessage={
            error["code"]
              ? "Color Code is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["code"] as string
          }
          resetValue={resetValue["code"]}
          setValue={setValue["code"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              colorId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/color"
          />
        </section>
      </div>
    </form>
  );
}
