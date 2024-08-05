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
import { updatePage } from "@/fetchAPIs/cms/page";

// types
import {
  PageDocument,
  LinkImageDocument
} from "@/schemas/cms/page";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "./mediaForm.module.css";
import { BannerDocument } from "@/schemas/cms/banner";

// FORM CONTROL CONFIGURATION
export function getMediaFormConfig({
  banners,
  quickLinks
}: Partial<PageDocument>): ConfigType {
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
    defaultValue: PageDocument
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
    data: Partial<PageDocument>
  ): void => {
    updatePage(id, data)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as PageDocument
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
      className={styles.container}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, (data: any) => {
          onSubmit(data);
        })
      }
    >
      <div className={styles.scrollContainer}>
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
