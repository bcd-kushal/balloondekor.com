/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import {
  addServiceCategory,
  updateServiceCategory
} from "@/fetchAPIs/cms/serviceCategory";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "./basicInfoForm.module.css";

// form control configuration
export function getBasicInfoFormConfig({
  name,
  slug
}: ServiceCategoryDocument): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    slug: {
      isRequired: true,
      type: "text",
      defaultValue: slug || ""
    }
  };
}

export default function BasicInfoForm({
  id,
  setId,
  setDefaultValue,
  setShowForm
}: {
  id?: string;
  setId: (id: string) => void;
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

  const [slugPlaceholder, setSlugPlaceholder] =
    useState<string>("");

  const toSlug = (value: string): string =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const onSubmit = (
    data: Partial<ServiceCategoryDocument>
  ): void => {
    if (!data.slug) {
      data.slug = slugPlaceholder;
    }

    if (id) {
      updateServiceCategory(id, data)
        .then(
          (responseData: ResponseDataType) => {
            setDefaultValue(
              responseData.data as ServiceCategoryDocument
            );
            addStatus(responseData.status);
            setShowForm(2);
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addServiceCategory(data)
        .then(
          (responseData: ResponseDataType) => {
            setId(
              (
                responseData.data as ServiceCategoryDocument
              )._id
            );
            setDefaultValue(
              responseData.data as ServiceCategoryDocument
            );
            addStatus(responseData.status);
            setShowForm(2);
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  useEffect(() => {
    const slug = toSlug(value["name"] as string);

    if (
      !value["slug"] ||
      (slug.length >
        (value["slug"] as string).length &&
        slug.startsWith(
          value["slug"] as string
        )) ||
      (slug.length <
        (value["slug"] as string).length &&
        (value["slug"] as string).startsWith(
          slug
        ))
    ) {
      setValue["slug"](slug);
    }
    setSlugPlaceholder(slug);
  }, [value["name"]]);

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
        className={`flex flex-col items-stretch gap-[12px] py-[10px] justify-start`}
      >
        <Input
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "name is required"
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
          title="slug"
          name="slug"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["slug"]}
          errorMessage={"slug is required"}
          variant="text"
          defaultValue={
            defaultValue["slug"] as string
          }
          resetValue={resetValue["slug"]}
          setValue={setValue["slug"]}
          transform={toSlug}
          placeholder={slugPlaceholder}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            variant="page"
            closeBtnLink="/cms/service-category"
          />
        </section>
      </div>
    </form>
  );
}
