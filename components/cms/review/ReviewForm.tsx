/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";
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
  addReview,
  updateReview
} from "@/fetchAPIs/cms/review";
import { getServiceCategories } from "@/fetchAPIs/cms/serviceCategory";

import { OptionType } from "@/types/cms/form";
// types
import { ReviewDocument } from "@/schemas/cms/review";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import {
  ResponseDataType,
  PaginationResponseDataType
} from "@/types/cms/api";

// styles
import styles from "@/components/cms/review/reviewForm.module.css";

// FORM CONTROL CONFIGURATION
export function getReviewFormConfig({
  serviceCategory,
  reviewCategory,
  reviews
}: Partial<ReviewDocument>): ConfigType {
  return {
    serviceCategory: {
      type: "dropdown",
      isRequired: true,
      defaultValue:
        (
          serviceCategory as ServiceCategoryDocument
        )?._id || ""
    },
    reviewCategory: {
      isRequired: true,
      type: "text",
      defaultValue: reviewCategory || ""
    },
    reviews: {
      isRequired: true,
      type: "textList",
      defaultValue: reviews?.length ? reviews : []
    }
  };
}

export default function ReviewForm({
  reviewId: reviewId
}: {
  reviewId?: string;
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
  const [
    serviceCategoriesOptions,
    setServiceCategoriesOptions
  ] = useState<OptionType[]>([]);
  // handlers
  const handelSubmit = (
    data: Partial<ReviewDocument>
  ): void => {
    console.log(data);

    if (reviewId) {
      updateReview(reviewId, data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/review");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addReview(data)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/review");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  const handleGetServiceCategoriesOptions =
    () => {
      getServiceCategories({
        active: true,
        deleted: false,
        offset: 0,
        limit: 0,
        sortBy: "name",
        orderBy: "",
        filterBy: "",
        keyword: "",
        fromDate: "",
        toDate: ""
      })
        .then(
          (
            responseData: PaginationResponseDataType
          ) => {
            setServiceCategoriesOptions(
              (
                responseData.data as ServiceCategoryDocument[]
              ).map(({ _id, name }) => ({
                label: name,
                value: _id
              }))
            );
          }
        )
        .catch(
          (
            responseData: PaginationResponseDataType
          ) => {
            addStatus(responseData.status);
          }
        );
    };

  useEffect(() => {
    handleGetServiceCategoriesOptions();
  }, []);

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handelSubmit(data);
        })
      }
    >
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="service category"
          name="serviceCategory"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["serviceCategory"]}
          errorMessage={
            "service category is required"
          }
          variant="dropdown"
          options={serviceCategoriesOptions}
          defaultValue={
            defaultValue[
              "serviceCategory"
            ] as string
          }
          resetValue={
            resetValue["serviceCategory"]
          }
          setValue={setValue["serviceCategory"]}
        />
        <Input
          title="review category"
          name="reviewCategory"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["reviewCategory"]}
          errorMessage={
            error["reviewCategory"]
              ? "review category is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue[
              "reviewCategory"
            ] as string
          }
          resetValue={
            resetValue["reviewCategory"]
          }
          setValue={setValue["reviewCategory"]}
        />
        <Input
          title="reviews"
          name="reviews"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["reviews"]}
          errorMessage={
            error["reviews"]
              ? "reviews is required"
              : " "
          }
          variant="textList"
          defaultValues={
            defaultValue["reviews"] as string[]
          }
          srLabel="Review"
          inputType="longText"
          setValue={setValue["reviews"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              reviewId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/review"
          />
        </section>
      </div>
    </form>
  );
}
