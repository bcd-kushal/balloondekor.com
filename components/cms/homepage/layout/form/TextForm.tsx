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
  ContentDocument
} from "@/schemas/cms/homepage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/layout/form/textForm.module.css";

// FORM CONTROL CONFIGURATION
export function getTextFormConfig({
  heading,
  subHeading,
  contents
}: Partial<HomepageLayoutDocument>): ConfigType {
  return {
    heading: {
      isRequired: false,
      type: "text",
      defaultValue: heading || ""
    },
    subHeading: {
      isRequired: false,
      type: "text",
      defaultValue: subHeading || ""
    },
    content: {
      isRequired: true,
      type: "text",
      defaultValue: contents?.length
        ? contents[0].content
        : ""
    }
  };
}

export default function TextForm({
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
    heading,
    subHeading,
    content
  }: {
    heading: string;
    subHeading: string;
    content: string;
  }): void => {
    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "text",
        heading,
        subHeading,
        contents: [
          {
            content
          } as ContentDocument
        ]
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
      className={`pl-[8px] flex flex-col items-stretch justify-start`}
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
          title="heading"
          name="heading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["heading"]}
          errorMessage={"heading is required"}
          variant="text"
          defaultValue={
            defaultValue["heading"] as string
          }
          setValue={setValue["heading"]}
        />
        <Input
          title="subHeading"
          name="subHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["subHeading"]}
          errorMessage={"sub heading is required"}
          variant="text"
          defaultValue={
            defaultValue["subHeading"] as string
          }
          setValue={setValue["subHeading"]}
        />
        <Input
          title="content"
          name="content"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["content"]}
          errorMessage={"images are required"}
          variant="richText"
          defaultValue={
            defaultValue["content"] as string
          }
          setValue={setValue["content"]}
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
