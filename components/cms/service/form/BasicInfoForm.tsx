/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { FormEvent } from "react";
import { Schema } from "mongoose";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormActions from "@/components/common/form/FormActions";
import Input from "@/components/common/form/Input";

// fetchAPIs
import {
  addService,
  updateService
} from "@/fetchAPIs/cms/service";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { OptionType } from "@/types/cms/form";
import { ResponseDataType } from "@/types/cms/api";
import {
  MediaDocument,
  ServiceDocument
} from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/basicInfoForm.module.css";
import InputSection from "@/components/common/form/InputSection";

// form control configuration
export function getBasicInfoFormConfig({
  name,
  category,
  categories,
  media,
  isCorporate,
  isBestSeller
}: ServiceDocument): ConfigType {
  return {
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    category: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (
          category as Schema.Types.ObjectId
        )?.toString() || ""
    },
    categories: {
      isRequired: false,
      type: "checkbox",
      defaultValue:
        (
          categories as Schema.Types.ObjectId[]
        )?.map((categoryId) =>
          categoryId.toString()
        ) || []
    },
    primaryImage: {
      type: "selectImage",
      isRequired: true,
      defaultValue: media?.primary
        ? [media?.primary as ImageDocument]
        : []
    },
    galleryImages: {
      type: "selectImage",
      isRequired: false,
      defaultValue: media?.gallery
        ? (media?.gallery as ImageDocument[])
        : []
    },
    videoUrl: {
      type: "text",
      isRequired: false,
      defaultValue: media?.video || ""
    },
    reviewImages: {
      type: "selectImage",
      isRequired: false,
      defaultValue: media?.review
        ? (media?.review as ImageDocument[])
        : []
    },
    isCorporate: {
      type: "boolean",
      isRequired: false,
      defaultValue:
        (isCorporate as boolean) || false
    },
    isBestSeller: {
      type: "boolean",
      isRequired: false,
      defaultValue:
        (isBestSeller as boolean) || false
    }
  };
}

export default function BasicInfoForm({
  serviceId,
  options,
  setServiceId: setId,
  setDefaultValue,
  setShowFormNo: setShowForm
}: {
  serviceId?: string;
  options: { [key: string]: OptionType[] };
  setServiceId: (serviceId: string) => void;
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
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

  const handleSubmit = (
    data: Partial<ServiceDocument>
  ): void => {
    const transformedData: Partial<ServiceDocument> =
      {} as Partial<ServiceDocument>;

    transformedData.name = data.name;

    transformedData.category = data.category;

    transformedData.categories = data.categories;

    transformedData.media = {
      // @ts-ignore
      primary: data.primaryImage,
      // @ts-ignore
      gallery: data.galleryImages,
      // @ts-ignore
      video: data.videoUrl,
      // @ts-ignore
      review: defaultValue[
        "reviewImages"
      ] as ImageDocument[]
    } as MediaDocument;

    transformedData.isCorporate =
      data.isCorporate;

    transformedData.isBestSeller =
      data.isBestSeller;

    if (serviceId) {
      updateService(serviceId, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setDefaultValue(
              responseData.data as ServiceDocument
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
      addService(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setId(
              (
                responseData.data as ServiceDocument
              )._id
            );
            setDefaultValue(
              responseData.data as ServiceDocument
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

  return (
    <form
      className={`flex flex-col items-stretch justify-start gap-[12px] h-full`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      {/* ACTUAL FORM CONTENT ==================================== */}
      <InputSection
        variant="section"
        sectionType="nested"
      >
        <Input
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage="name is required"
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <Input
          title="primary category"
          name="category"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["category"]}
          errorMessage="primary category is required"
          variant="dropdown"
          defaultValue={
            defaultValue["category"] as string
          }
          options={options.serviceCategory || []}
          setValue={setValue["category"]}
        />
        <Input
          title="related categories"
          name="categories"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["categories"]}
          errorMessage="related Categories is required"
          variant="advance-checkbox"
          defaultValues={
            defaultValue["categories"] as string[]
          }
          options={
            options?.serviceCategory?.filter(
              ({ value: optionValue }) =>
                optionValue !==
                (value["category"] as string)
            ) || []
          }
          disabled={
            !Boolean(value["category"] as string)
          }
          setValues={setValue["categories"]}
        />
        <section className="border-[1.5px] border-black/40 p-[20px] rounded-2xl w-full">
          <InputSection
            variant="section"
            sectionType="root"
            heading="media"
          >
            <section
              className={`w-full gap-[16px] flex flex-col sm:flex-row items-stretch justify-start sm:justify-between`}
            >
              <Input
                title="primary image"
                name="primaryImage"
                isRequired={true}
                hasSubmitted={hasSubmitted}
                showError={error["primaryImage"]}
                errorMessage={
                  "primary image is required"
                }
                variant="selectImage"
                defaultValue={
                  defaultValue[
                    "primaryImage"
                  ] as ImageDocument[]
                }
                resetValue={
                  resetValue["primaryImage"]
                }
                setValue={
                  setValue["primaryImage"]
                }
              />
              <Input
                title="gallery images"
                name="galleryImages"
                isRequired={false}
                hasSubmitted={hasSubmitted}
                showError={error["galleryImages"]}
                errorMessage=""
                variant="selectImage"
                defaultValue={
                  defaultValue[
                    "galleryImages"
                  ] as ImageDocument[]
                }
                multiple
                resetValue={
                  resetValue["galleryImages"]
                }
                setValue={
                  setValue["galleryImages"]
                }
              />
            </section>
            <Input
              title="video url"
              name="videoUrl"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["videoUrl"]}
              errorMessage=""
              variant="text"
              defaultValue={
                defaultValue["videoUrl"] as string
              }
              resetValue={resetValue["videoUrl"]}
              setValue={setValue["videoUrl"]}
            />
          </InputSection>
        </section>
        <Input
          title="is a corporate service"
          name="isCorporate"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["isCorporate"]}
          errorMessage=""
          variant="boolean"
          defaultValue={
            defaultValue["isCorporate"] as boolean
          }
          setValue={setValue["isCorporate"]}
        />
        <Input
          title="is a best seller"
          name="isBestSeller"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["isBestSeller"]}
          errorMessage=""
          variant="boolean"
          defaultValue={
            defaultValue[
              "isBestSeller"
            ] as boolean
          }
          setValue={setValue["isBestSeller"]}
        />
      </InputSection>

      {/* BOTTOM ACTION BUTTONS ================================== */}
      <section className={`mt-[10px]`}>
        <FormActions
          submitBtnLabel="next"
          variant="page"
          closeBtnLink="/cms/service"
        />
      </section>
    </form>
  );
}
