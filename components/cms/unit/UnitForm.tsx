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
  addUnit,
  updateUnit
} from "@/fetchAPIs/cms/unit";

// types
import { UnitDocument } from "@/schemas/cms/unit";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/unit/unitForm.module.css";

// FORM CONTROL CONFIGURATION
export function getUnitFormConfig({
  name,
  abbr
}: Partial<UnitDocument>): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    abbr: {
      isRequired: true,
      type: "text",
      defaultValue: abbr ? abbr : ""
    }
  };
}

export default function UnitForm({
  unitId
}: {
  unitId?: string;
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
    data: Partial<UnitDocument>
  ): void => {
    if (unitId) {
      updateUnit(unitId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/unit");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addUnit(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/unit");
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
          title="abbreviation"
          name="abbr"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["abbr"]}
          errorMessage={
            error["abbr"]
              ? "Abbreviation is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["abbr"] as string
          }
          resetValue={resetValue["abbr"]}
          setValue={setValue["abbr"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              unitId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/unit"
          />
        </section>
      </div>
    </form>
  );
}
