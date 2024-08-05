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
import InputSection from "@/components/common/form/InputSection";

// fetchAPIs
import { updateService } from "@/fetchAPIs/cms/service";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { OptionType } from "@/types/cms/form";
import { ResponseDataType } from "@/types/cms/api";
import {
  DetailsDocument,
  MediaDocument,
  MetaDocument,
  QualityDocument,
  ServiceDocument,
  TagsDocument
} from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/visualInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getVisualInfoFormConfig({
  name,
  media,
  brand,
  colors,
  occasions,
  relations,
  tags,
  details,
  quality,
  meta
}: Partial<ServiceDocument>): ConfigType {
  return {
    primaryImage: {
      type: "selectImage",
      isRequired: false,
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
    brand: {
      type: "dropdown",
      isRequired: false,
      defaultValue:
        (
          brand as Schema.Types.ObjectId
        )?.toString() || ""
    },
    colors: {
      type: "checkbox",
      isRequired: false,
      defaultValue:
        (colors as Schema.Types.ObjectId[])?.map(
          (colorId) => colorId.toString()
        ) || []
    },
    occasions: {
      type: "checkbox",
      isRequired: false,
      defaultValue:
        (
          occasions as Schema.Types.ObjectId[]
        )?.map((occasionId) =>
          occasionId.toString()
        ) || []
    },
    relations: {
      type: "checkbox",
      isRequired: false,
      defaultValue:
        (
          relations as Schema.Types.ObjectId[]
        )?.map((relationId) =>
          relationId.toString()
        ) || []
    },
    searchTags: {
      type: "checkbox",
      isRequired: true,
      defaultValue: tags?.searchTags
        ? (
            tags?.searchTags as Schema.Types.ObjectId[]
          )?.map((searchTagsId) =>
            searchTagsId.toString()
          )
        : []
    },
    promotionTags: {
      type: "checkbox",
      isRequired: false,
      defaultValue: tags?.promotionTags
        ? (
            tags?.promotionTags as Schema.Types.ObjectId[]
          )?.map((promotionTagsId) =>
            promotionTagsId.toString()
          )
        : []
    },
    aiTags: {
      type: "checkbox",
      isRequired: true,
      defaultValue: tags?.aiTags
        ? (
            tags?.aiTags as Schema.Types.ObjectId[]
          )?.map((aiTagsId) =>
            aiTagsId.toString()
          )
        : []
    },
    info: {
      isRequired: false,
      type: "text",
      defaultValue: details?.info || ""
    },
    includes: {
      isRequired: true,
      type: "text",
      defaultValue: details?.includes || ""
    },
    excludes: {
      isRequired: false,
      type: "text",
      defaultValue: details?.excludes || ""
    },
    deliveryDetail: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (
          details?.deliveryDetails as Schema.Types.ObjectId
        )?.toString() || ""
    },
    careInfo: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (
          details?.careInfo as Schema.Types.ObjectId
        )?.toString() || ""
    },
    cancellationPolicy: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (
          details?.cancellationPolicy as Schema.Types.ObjectId
        )?.toString() || ""
    },
    faq: {
      isRequired: false,
      type: "dropdown",
      defaultValue:
        (
          details?.faq as Schema.Types.ObjectId
        )?.toString() || ""
    },
    rating: {
      type: "number",
      isRequired: false,
      defaultValue: quality?.rating || NaN
    },
    totalReviews: {
      type: "number",
      isRequired: false,
      defaultValue: quality?.totalReviews || NaN
    },
    showReviews: {
      type: "number",
      isRequired: false,
      defaultValue: quality?.showReviews || NaN
    },
    reviewCategory: {
      type: "dropdown",
      isRequired: false,
      defaultValue: quality?.review
        ? (
            quality?.review as Schema.Types.ObjectId
          )?.toString()
        : ""
    },
    metaTitle: {
      type: "text",
      isRequired: true,
      defaultValue:
        meta?.title || (name as string)
    },
    metaTags: {
      type: "text",
      isRequired: true,
      defaultValue: meta?.tags || ""
    },
    metaDescription: {
      type: "text",
      isRequired: true,
      defaultValue: meta?.description || ""
    }
  };
}

export default function VisualInfoForm({
  serviceId,
  options,
  setDefaultValue,
  setShowFormNo
}: {
  serviceId: string;
  options: { [key: string]: OptionType[] };
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
  // hooks
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

    // @ts-ignore
    transformedData.media = {
      // @ts-ignore
      primary: (
        (
          defaultValue[
            "primaryImage"
          ] as ImageDocument[]
        )[0]._id as Schema.Types.ObjectId
      ).toString(),
      // @ts-ignore
      gallery: (
        defaultValue[
          "galleryImages"
        ] as ImageDocument[]
      ).map((galleryImage) =>
        galleryImage._id.toString()
      ),
      // @ts-ignore
      video: defaultValue["videoUrl"] as string,
      // @ts-ignore
      review: data.reviewImages
    } as MediaDocument;

    if (data.brand) {
      transformedData.brand = data.brand;
    }

    transformedData.colors = data.colors;

    transformedData.occasions = data.occasions;

    transformedData.relations = data.relations;

    transformedData.tags = {
      // @ts-ignore
      searchTags: data.searchTags,
      // @ts-ignore
      promotionTags: data.promotionTags,
      // @ts-ignore
      aiTags: data.aiTags
    } as TagsDocument;

    transformedData.details = {
      // @ts-ignore
      info: data.info,
      // @ts-ignore
      includes: data.includes,
      // @ts-ignore
      excludes: data.excludes,
      // @ts-ignore
      deliveryDetails: data.deliveryDetail,
      // @ts-ignore
      careInfo: data.careInfo,
      // @ts-ignore
      cancellationPolicy: data.cancellationPolicy,
      // @ts-ignore
      faq: data.faq
    } as DetailsDocument;

    transformedData.quality = {
      // @ts-ignore
      rating: data.rating || undefined,
      totalReviews:
        // @ts-ignore
        data.totalReviews || undefined,
      // @ts-ignore
      showReviews: data.showReviews || undefined,
      // @ts-ignore
      review: data.reviewCategory || undefined
    } as QualityDocument;

    transformedData.meta = {
      // @ts-ignore
      title: data.metaTitle,
      // @ts-ignore
      tags: data.metaTags,
      // @ts-ignore
      description: data.metaDescription
    } as MetaDocument;

    updateService(serviceId, transformedData)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceDocument
        );
        addStatus(responseData.status);
        setShowFormNo(3);
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  return (
    <form
      className={`p-0 mt-[18px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <InputSection
        variant="section"
        sectionType="nested"
      >
        <Input
          title="brand"
          name="brand"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["brand"]}
          errorMessage=""
          variant="dropdown"
          options={options.brand || []}
          defaultValue={
            defaultValue["brand"] as string
          }
          resetValue={resetValue["brand"]}
          setValue={setValue["brand"]}
        />
        <InputSection
          variant="layout"
          layoutColumn="triple"
        >
          <Input
            title="colors"
            name="colors"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["colors"]}
            errorMessage="colors is required"
            variant="advance-checkbox"
            defaultValues={
              defaultValue["colors"] as string[]
            }
            options={options.color || []}
            setValues={setValue["colors"]}
          />
          <Input
            title="occasions"
            name="occasions"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["occasions"]}
            errorMessage="occasions is required"
            variant="advance-checkbox"
            defaultValues={
              defaultValue[
                "occasions"
              ] as string[]
            }
            options={options.occasion || []}
            setValues={setValue["occasions"]}
          />
          <Input
            title="relations"
            name="relations"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["relations"]}
            errorMessage="relations is required"
            variant="advance-checkbox"
            defaultValues={
              defaultValue[
                "relations"
              ] as string[]
            }
            options={options.relation || []}
            setValues={setValue["relations"]}
          />
        </InputSection>
        <InputSection
          variant="section"
          sectionType="root"
          heading="tags"
        >
          <InputSection
            variant="layout"
            layoutColumn="triple"
          >
            <Input
              title="search tags"
              name="searchTags"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["searchTags"]}
              errorMessage={
                "search tags is required"
              }
              variant="advance-checkbox"
              defaultValues={
                defaultValue[
                  "searchTags"
                ] as string[]
              }
              options={options.searchTag || []}
              setValues={setValue["searchTags"]}
            />
            <Input
              title="promotion tags"
              name="promotionTags"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["promotionTags"]}
              errorMessage={
                "Promotion Tags is required"
              }
              variant="advance-checkbox"
              defaultValues={
                defaultValue[
                  "promotionTags"
                ] as string[]
              }
              options={options.promotionTag || []}
              setValues={
                setValue["promotionTags"]
              }
            />
            <Input
              title="AI Tags"
              name="aiTags"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["aiTags"]}
              errorMessage="AI tags is required"
              variant="advance-checkbox"
              defaultValues={
                defaultValue["aiTags"] as string[]
              }
              options={options.aiTag || []}
              setValues={setValue["aiTags"]}
            />
          </InputSection>
        </InputSection>
        <InputSection
          variant="section"
          sectionType="root"
          heading="service details"
        >
          <InputSection
            variant="layout"
            layoutColumn="double"
          >
            {/* <Input
              title="corporate info"
              name="info"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["info"]}
              errorMessage=""
              variant="richText"
              defaultValue={
                defaultValue["info"] as string
              }
              resetValue={resetValue["info"]}
              setValue={setValue["info"]}
            /> */}
            <Input
              title="service includes"
              name="includes"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["includes"]}
              errorMessage="service includes is required"
              variant="longText"
              defaultValue={
                defaultValue["includes"] as string
              }
              resetValue={resetValue["includes"]}
              isList
              setValue={setValue["includes"]}
            />
            <Input
              title="service excludes"
              name="excludes"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["excludes"]}
              errorMessage="service excludes is required"
              variant="longText"
              defaultValue={
                defaultValue["excludes"] as string
              }
              resetValue={resetValue["excludes"]}
              isList
              setValue={setValue["excludes"]}
            />
            <Input
              title="delivery details"
              name="deliveryDetail"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["deliveryDetail"]}
              errorMessage="delivery details is required"
              variant="dropdown"
              options={
                options.deliveryDetail || []
              }
              defaultValue={
                defaultValue[
                  "deliveryDetail"
                ] as string
              }
              resetValue={
                resetValue["deliveryDetail"]
              }
              setValue={
                setValue["deliveryDetail"]
              }
            />
            <Input
              title="care info"
              name="careInfo"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["careInfo"]}
              errorMessage="care info is required"
              variant="dropdown"
              options={options.careInfo || []}
              defaultValue={
                defaultValue["careInfo"] as string
              }
              resetValue={resetValue["careInfo"]}
              setValue={setValue["careInfo"]}
            />
            <Input
              title="cancellation policy"
              name="cancellationPolicy"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={
                error["cancellationPolicy"]
              }
              errorMessage="cancellation policy is required"
              variant="dropdown"
              options={
                options.cancellationPolicy || []
              }
              defaultValue={
                defaultValue[
                  "cancellationPolicy"
                ] as string
              }
              resetValue={
                resetValue["cancellationPolicy"]
              }
              setValue={
                setValue["cancellationPolicy"]
              }
            />
            <Input
              title="FAQ"
              name="faq"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["faq"]}
              errorMessage="FAQ is required"
              variant="dropdown"
              options={options.faq || []}
              defaultValue={
                defaultValue["faq"] as string
              }
              resetValue={resetValue["faq"]}
              setValue={setValue["faq"]}
            />
          </InputSection>
        </InputSection>
        <InputSection
          variant="section"
          sectionType="root"
          heading="service quality"
        >
          <InputSection
            variant="layout"
            layoutColumn="quad"
          >
            <Input
              title="service rating (max 5.0)"
              name="rating"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["rating"]}
              errorMessage="rating is required"
              variant="number"
              defaultValue={
                defaultValue["rating"] as number
              }
              decimal
              setValue={setValue["rating"]}
            />
            <Input
              title="total reviews"
              name="totalReviews"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["totalReviews"]}
              errorMessage="total reviews is required"
              variant="number"
              defaultValue={
                defaultValue[
                  "totalReviews"
                ] as number
              }
              setValue={setValue["totalReviews"]}
            />
            <Input
              title="show reviews"
              name="showReviews"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["showReviews"]}
              errorMessage="show reviews is required"
              variant="number"
              defaultValue={
                defaultValue[
                  "showReviews"
                ] as number
              }
              setValue={setValue["showReviews"]}
            />
            <Input
              title="review category"
              name="reviewCategory"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["reviewCategory"]}
              errorMessage={"Reviews is required"}
              variant="dropdown"
              options={options.review || []}
              defaultValue={
                defaultValue[
                  "reviewCategory"
                ] as string
              }
              resetValue={
                resetValue["reviewCategory"]
              }
              setValue={
                setValue["reviewCategory"]
              }
            />
          </InputSection>
          <Input
            title="review images"
            name="reviewImages"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["reviewImages"]}
            errorMessage=""
            variant="selectImage"
            defaultValue={
              defaultValue[
                "reviewImages"
              ] as ImageDocument[]
            }
            multiple
            resetValue={
              resetValue["reviewImages"]
            }
            setValue={setValue["reviewImages"]}
          />
        </InputSection>
        <section className="w-full grid grid-cols-2 gap-4">
          <Input
            title="meta title"
            name="metaTitle"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={error["metaTitle"]}
            errorMessage="meta title is required"
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
            errorMessage="meta tags is required"
            variant="text"
            defaultValue={
              defaultValue["metaTags"] as string
            }
            resetValue={resetValue["metaTags"]}
            setValue={setValue["metaTags"]}
          />
          <span className="col-span-2">
            <Input
              title="meta description"
              name="metaDescription"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["metaDescription"]}
              errorMessage="meta description is required"
              variant="longText"
              defaultValue={
                defaultValue[
                  "metaDescription"
                ] as string
              }
              resetValue={
                resetValue["metaDescription"]
              }
              setValue={
                setValue["metaDescription"]
              }
            />
          </span>
        </section>
      </InputSection>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowFormNo(1);
            }}
          />
        </section>
      </div>
    </form>
  );
}
