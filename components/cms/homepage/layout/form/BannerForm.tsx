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
  addHomepageLayout,
  updateHomepageLayout
} from "@/fetchAPIs/cms/homepage";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import {
  HomepageLayoutDocument,
  SectionDocument,
  LinkImageDocument
} from "@/schemas/cms/homepage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/layout/form/bannerForm.module.css";

// FORM CONTROL CONFIGURATION
export function getBannerFormConfig({
  banners
}: Partial<HomepageLayoutDocument>): ConfigType {
  return {
    banners: {
      isRequired: true,
      type: "banners",
      defaultValue: banners?.length ? banners : []
    }
  };
}

export default function BannerForm({
  id
}: {
  id?: string;
}) {
  const { push } = useRouter();

  const { addStatus } = useStatusContext();

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

  const handleSubmit = ({
    banners
  }: {
    banners: BannerDocument[];
  }): void => {
    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "banner",
        banners
      };

    if (id) {
      updateHomepageLayout(id, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/homepage");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addHomepageLayout(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/homepage");
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
      className={``}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <Input
        title=""
        name="banners"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["banners"]}
        errorMessage={"banners are required"}
        variant="banner"
        defaultValue={
          defaultValue[
            "banners"
          ] as BannerDocument[]
        }
        setValue={setValue["banners"]}
      />
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={id ? "update" : "add"}
            closeBtnLabel="close"
            variant="page"
            closeBtnLink="/cms/homepage"
          />
        </section>
      </div>
    </form>
  );
}
