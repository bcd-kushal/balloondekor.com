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
import { updateSubPage } from "@/fetchAPIs/cms/subPage";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import {
  SubPageDocument,
  LinkImageDocument
} from "@/schemas/cms/subPage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "./mediaForm.module.css";

// FORM CONTROL CONFIGURATION
export function getMediaFormConfig({
  banners,
  quickLinks
}: Partial<SubPageDocument>): ConfigType {
  return {
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
    defaultValue: SubPageDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
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
    data: Partial<SubPageDocument>
  ): void => {
    updateSubPage(id, data)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as SubPageDocument
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
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <section className={styles.section2}>
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
            errorMessage={
              "quickLinks is required"
            }
            variant="linkImage"
            defaultValue={
              defaultValue[
                "quickLinks"
              ] as LinkImageDocument[]
            }
            setValue={setValue["quickLinks"]}
          />
        </section>
      </div>
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
