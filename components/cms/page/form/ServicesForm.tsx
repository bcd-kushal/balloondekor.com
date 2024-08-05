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
import { updatePage } from "@/fetchAPIs/cms/page";

// styles
import styles from "./servicesForm.module.css";

// types
import { PageDocument } from "@/schemas/cms/page";
import { ResponseDataType } from "@/types/cms/api";
import { ServiceDocument } from "@/schemas/cms/service";

// FORM CONTROL CONFIGURATION
export function getServicesFormConfig({
  services
}: Partial<PageDocument>): ConfigType {
  return {
    services: {
      isRequired: false,
      type: "services",
      defaultValue:
        (services as ServiceDocument[]) || []
    }
  };
}

export default function ServicesForm({
  id,
  setShowForm
}: {
  id: string;
  setShowForm: (showForm: number) => void;
}) {
  const { push } = useRouter();
  const { addStatus } = useStatusContext();

  const {
    defaultValue,
    resetValue,
    value,
    setValue,
    hasSubmitted,
    error,
    onReset,
    onSubmit
  } = useFormContext();

  const handleSubmit = (
    data: Partial<PageDocument>
  ): void => {
    const transformed: Partial<PageDocument> =
      {} as PageDocument;

    transformed.services = (
      data.services as ServiceDocument[]
    )?.map(({ _id }) => _id);

    updatePage(id, transformed)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        push("/cms/page");
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  return (
    <form
      className={`pl-8px`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title=""
          name="services"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["services"]}
          errorMessage={"services is required"}
          variant="services"
          defaultValue={
            defaultValue[
              "services"
            ] as ServiceDocument[]
          }
          setValue={setValue["services"]}
        />
      </section>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="finish"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowForm(4);
            }}
          />
        </section>
      </div>
    </form>
  );
}
