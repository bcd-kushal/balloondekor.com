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
  addFooterLinkSection,
  updateFooterLinkSection
} from "@/fetchAPIs/cms/footerLinkSection";

// types
import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/footer/footerLinkForm.module.css";
import {
  NestedLinkDocument,
  TagDocument
} from "@/schemas/cms/navLink";

// FORM CONTROL CONFIGURATION
export function getFooterLinkSectionFormConfig({
  heading,
  url,
  links
}: Partial<FooterLinkSectionDocument>): ConfigType {
  return {
    heading: {
      isRequired: true,
      type: "text",
      defaultValue: heading || ""
    },
    url: {
      isRequired: false,
      type: "text",
      defaultValue: url || ""
    },
    links: {
      isRequired: false,
      type: "navLink",
      defaultValue: links?.length
        ? (links.map((link) => ({
            ...link,
            tag: {
              label: "",
              color: ""
            } as TagDocument
          })) as NestedLinkDocument[])
        : []
    }
  };
}

export default function FooterLinkSectionForm({
  footerLinkSectionId
}: {
  footerLinkSectionId?: string;
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
    data: Partial<FooterLinkSectionDocument>
  ): void => {
    if (footerLinkSectionId) {
      updateFooterLinkSection(
        footerLinkSectionId,
        data
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/footer");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addFooterLinkSection(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/footer");
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
          title="heading"
          name="heading"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["heading"]}
          errorMessage={
            error["heading"]
              ? "Heading is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["heading"] as string
          }
          resetValue={resetValue["heading"]}
          setValue={setValue["heading"]}
        />
        <Input
          title="URL"
          name="url"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["url"]}
          errorMessage={
            error["url"] ? "URL is required" : " "
          }
          variant="text"
          defaultValue={
            defaultValue["url"] as string
          }
          resetValue={resetValue["url"]}
          setValue={setValue["url"]}
        />
        <Input
          title="links"
          name="links"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["links"]}
          errorMessage={" "}
          variant="navLink"
          defaultValue={
            defaultValue[
              "links"
            ] as NestedLinkDocument[]
          }
          disableTag
          setValue={setValue["links"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              footerLinkSectionId
                ? "update"
                : "add"
            }
            variant="page"
            closeBtnLink="/cms/footer"
          />
        </section>
      </div>
    </form>
  );
}
