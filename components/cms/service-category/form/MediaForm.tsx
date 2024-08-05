/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { FormEvent } from "react";

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
import { updateServiceCategory } from "@/fetchAPIs/cms/serviceCategory";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  ServiceCategoryDocument,
  LinkImageDocument
} from "@/schemas/cms/serviceCategory";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "./mediaForm.module.css";
import { BannerDocument } from "@/schemas/cms/banner";

// FORM CONTROL CONFIGURATION
export function getMediaFormConfig({
  icon,
  banners,
  quickLinks
}: Partial<ServiceCategoryDocument>): ConfigType {
  return {
    icon: {
      isRequired: true,
      type: "selectImage",
      defaultValue: icon
        ? [icon as ImageDocument]
        : []
    },
    banners: {
      isRequired: false,
      type: "banners",
      defaultValue: banners || []
    },
    quickLinks: {
      isRequired: false,
      type: "linkImage",
      defaultValue: quickLinks || []
    }
  };
}

export default function MediaForm({
  id,
  setDefaultValue,
  setShowForm
}: {
  id: string;
  setDefaultValue: (
    defaultValue: ServiceCategoryDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  const { addStatus: addStatus } =
    useStatusContext();

  const {
    defaultValue,
    resetValue,
    onReset: reset,
    value,
    setValue,
    hasSubmitted,
    error,
    onSubmit: handleSubmit
  } = useFormContext();

  const onSubmit = (
    data: Partial<ServiceCategoryDocument>
  ): void => {
    updateServiceCategory(id, data)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceCategoryDocument
        );
        addStatus(responseData.status);
        setShowForm(4);
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, (data: any) => {
          onSubmit(data);
        })
      }
    >
      <section
        className={`flex mb-5 flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="icon"
          name="icon"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["icon"]}
          errorMessage={"icon is required"}
          variant="selectImage"
          defaultValue={
            defaultValue[
              "icon"
            ] as ImageDocument[]
          }
          resetValue={resetValue["icon"]}
          setValue={setValue["icon"]}
        />
      </section>
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="banners"
          name="banners"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["banners"]}
          errorMessage={"banner is required"}
          variant="banner"
          defaultValue={
            defaultValue[
              "banners"
            ] as BannerDocument[]
          }
          setValue={setValue["banners"]}
        />
        <Input
          title="quick links"
          name="quickLinks"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["quickLinks"]}
          errorMessage={"quickLinks is required"}
          variant="linkImage"
          defaultValue={
            defaultValue[
              "quickLinks"
            ] as LinkImageDocument[]
          }
          setValue={setValue["quickLinks"]}
        />
      </section>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowForm(2);
            }}
          />
        </section>
      </div>
    </form>
  );
}
