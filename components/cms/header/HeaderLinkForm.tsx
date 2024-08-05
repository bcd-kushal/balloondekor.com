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
  addNavLink,
  updateNavLink
} from "@/fetchAPIs/cms/navLink";

// types
import {
  NavLinkDocument,
  NestedSectionDocument
} from "@/schemas/cms/navLink";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/header/headerLinkForm.module.css";

// FORM CONTROL CONFIGURATION
export function getHeaderNavLinkFormConfig({
  label,
  url,
  nestedSections
}: Partial<NavLinkDocument>): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: label || ""
    },
    url: {
      isRequired: false,
      type: "text",
      defaultValue: url || ""
    },
    nestedSections: {
      isRequired: false,
      type: "navSection",
      defaultValue: nestedSections?.length
        ? nestedSections
        : []
    }
  };
}

export default function HeaderNavLinkForm({
  navLinkId
}: {
  navLinkId?: string;
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
    data: Partial<NavLinkDocument>
  ): void => {
    if (navLinkId) {
      updateNavLink(navLinkId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/header");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addNavLink(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/header");
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
      className={styles.container}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <div className={styles.scrollContainer}>
        <div className={styles.inputs}>
          <Input
            title="label"
            name="label"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={error["label"]}
            errorMessage={
              error["label"]
                ? "Label is required"
                : " "
            }
            variant="text"
            defaultValue={
              defaultValue["label"] as string
            }
            resetValue={resetValue["label"]}
            setValue={setValue["label"]}
          />
          <Input
            title="URL"
            name="url"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["url"]}
            errorMessage={
              error["url"]
                ? "URL is required"
                : " "
            }
            variant="text"
            defaultValue={
              defaultValue["url"] as string
            }
            resetValue={resetValue["url"]}
            setValue={setValue["url"]}
          />
          <Input
            title="sections"
            name="nestedSections"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["nestedSections"]}
            errorMessage={" "}
            variant="navSection"
            defaultValue={
              defaultValue[
                "nestedSections"
              ] as NestedSectionDocument[]
            }
            setValue={setValue["nestedSections"]}
          />
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              navLinkId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/header"
          />
        </section>
      </div>
    </form>
  );
}
