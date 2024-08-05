/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

import { updatePage } from "@/fetchAPIs/cms/page";

import {
  PageDocument,
  FAQDocument,
  SEOSchemaDocument
} from "@/schemas/cms/page";
import { ResponseDataType } from "@/types/cms/api";

import styles from "./seoInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getSEOInfoFormConfig({
  seoSchema,
  faqs,
  metaTitle,
  metaTags,
  metaDescription
}: Partial<PageDocument>): ConfigType {
  return {
    seoSchema: {
      isRequired: true,
      type: "schema",
      defaultValue:
        seoSchema || ({} as SEOSchemaDocument)
    },
    faqs: {
      isRequired: false,
      type: "faq",
      defaultValue: faqs || []
    },
    metaTitle: {
      isRequired: true,
      type: "text",
      defaultValue: metaTitle || ""
    },
    metaTags: {
      isRequired: true,
      type: "text",
      defaultValue: metaTags || ""
    },
    metaDescription: {
      isRequired: true,
      type: "text",
      defaultValue: metaDescription || ""
    }
  };
}

export default function SEOInfoForm({
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
  const { push } = useRouter();

  const { addStatus } = useStatusContext();

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
        setShowForm(5);
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
      <div
        className={`flex flex-col items-stretch justify-start gap-5 mt-4`}
      >
        <div className={styles.section1}>
          <Input
            title="schema"
            name="seoSchema"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={error["seoSchema"]}
            errorMessage={"Schema is required"}
            variant="schema"
            defaultValue={
              defaultValue[
                "seoSchema"
              ] as SEOSchemaDocument
            }
            resetValue={resetValue["seoSchema"]}
            setValue={setValue["seoSchema"]}
            rating
            offers
          />
          <Input
            title=""
            name="faqs"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["faqs"]}
            errorMessage=""
            variant="faq"
            defaultValue={
              defaultValue[
                "faqs"
              ] as FAQDocument[]
            }
            setValue={setValue["faqs"]}
          />
          <div className="w-full grid grid-cols-2 gap-6">
            <Input
              title="meta title"
              name="metaTitle"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["metaTitle"]}
              errorMessage={
                "metaTitle is required"
              }
              variant="text"
              defaultValue={
                defaultValue[
                  "metaTitle"
                ] as string
              }
              resetValue={resetValue["metaTitle"]}
              setValue={setValue["metaTitle"]}
            />
            <Input
              title="meta tags"
              name="metaTags"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["metaTags"]}
              errorMessage={
                "metaTags is required"
              }
              variant="text"
              defaultValue={
                defaultValue["metaTags"] as string
              }
              resetValue={resetValue["metaTags"]}
              setValue={setValue["metaTags"]}
            />
          </div>

          <Input
            title="meta description"
            name="metaDescription"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={error["metaDescription"]}
            errorMessage={
              "metaDescription is required"
            }
            variant="longText"
            defaultValue={
              defaultValue[
                "metaDescription"
              ] as string
            }
            resetValue={
              resetValue["metaDescription"]
            }
            setValue={setValue["metaDescription"]}
          />
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowForm(3);
            }}
          />
        </section>
      </div>
    </form>
  );
}
