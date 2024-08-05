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
  addDynamicPage,
  updateDynamicPage
} from "@/fetchAPIs/cms/dynamicPage";

// types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/dynamicPage/dynamicPageForm.module.css";

// FORM CONTROL CONFIGURATION
export function getDynamicPageFormConfig({
  name,
  content,
  metaTitle,
  metaTags,
  metaDescription
}: Partial<DynamicPageDocument>): ConfigType {
  return {
    name: {
      type: "text",
      isRequired: true,
      defaultValue: name || ""
    },
    content: {
      type: "text",
      isRequired: true,
      defaultValue: content || ""
    },
    metaTitle: {
      type: "text",
      isRequired: true,
      defaultValue: metaTitle || ""
    },
    metaTags: {
      type: "text",
      isRequired: true,
      defaultValue: metaTags || ""
    },
    metaDescription: {
      type: "text",
      isRequired: true,
      defaultValue: metaDescription || ""
    }
  };
}

export default function DynamicPageForm({
  dynamicPageId
}: {
  dynamicPageId?: string;
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
    data: Partial<DynamicPageDocument>
  ): void => {
    const transformedData: Partial<DynamicPageDocument> =
      {};

    transformedData.name = data.name;
    transformedData.slug = (data.name as string)
      .toLowerCase()
      .split(/\s/)
      .join("-");

    transformedData.content = data.content;

    transformedData.metaTitle = data.metaTitle;
    transformedData.metaTags = data.metaTags;
    transformedData.metaDescription =
      data.metaDescription;

    if (dynamicPageId) {
      updateDynamicPage(
        dynamicPageId,
        transformedData
      )
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/pages/dynamic");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addDynamicPage(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/pages/dynamic");
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
      className={` pb-10`}
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
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "Name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <Input
          title="content"
          name="content"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["content"]}
          errorMessage={"Content is required"}
          variant="richText"
          defaultValue={
            defaultValue["content"] as string
          }
          resetValue={resetValue["content"]}
          setValue={setValue["content"]}
        />
        <div className="grid grid-cols-2 gap-5 ">
          <Input
            title="meta title"
            name="metaTitle"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={error["metaTitle"]}
            errorMessage={"metaTitle is required"}
            variant="text"
            defaultValue={
              defaultValue["metaTitle"] as string
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
            errorMessage={"metaTags is required"}
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

      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              dynamicPageId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/pages/dynamic"
          />
        </section>
      </div>
    </form>
  );
}
