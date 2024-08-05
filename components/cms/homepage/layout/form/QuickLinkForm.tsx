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
import {
  HomepageLayoutDocument,
  LinkImageDocument,
  SectionDocument
} from "@/schemas/cms/homepage";
import { NestedSectionDocument } from "@/schemas/cms/navLink";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/layout/form/quickLinkForm.module.css";

// FORM CONTROL CONFIGURATION
export function getQuickLinkFormConfig({
  sections
}: Partial<HomepageLayoutDocument>): ConfigType {
  return {
    sections: {
      isRequired: true,
      type: "navSection",
      defaultValue:
        sections?.map(
          ({ _id, heading, linkImages }) =>
            ({
              _id,
              heading,
              nestedLinks: linkImages.map(
                ({ _id, label, url }) => ({
                  _id,
                  label,
                  url,
                  tag: { label: "", color: "" }
                })
              )
            }) as NestedSectionDocument
        ) || []
    }
  };
}

export default function QuickLinkForm({
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
    sections
  }: {
    sections: NestedSectionDocument[];
  }): void => {
    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "quick-link",
        heading: "",
        subHeading: "",
        sections: sections.map(
          ({ heading, nestedLinks }) =>
            ({
              heading,
              linkImages: nestedLinks.map(
                ({ _id, label, url }) =>
                  ({
                    _id,
                    label,
                    url
                  }) as LinkImageDocument
              )
            }) as SectionDocument
        )
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
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <section
        className={`flex flex-col items-stretch justify-start gap-[16px]`}
      >
        <Input
          title="Quick Link Sections"
          name="sections"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["sections"]}
          errorMessage={
            "Quick Link Sections is required"
          }
          variant="navSection"
          defaultValue={
            defaultValue[
              "sections"
            ] as NestedSectionDocument[]
          }
          disableTag
          setValue={setValue["sections"]}
        />
      </section>
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
