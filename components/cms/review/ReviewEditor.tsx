/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import ReviewsForm, {
  getReviewFormConfig
} from "@/components/cms/review/ReviewForm";

// fetchAPIs
import { getReview } from "@/fetchAPIs/cms/review";

// types
import { ReviewDocument } from "@/schemas/cms/review";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function ReviewEditor({
  reviewId
}: {
  reviewId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<ReviewDocument>(
      {} as ReviewDocument
    );

  // handlers
  const handleGetReview = (
    reviewsId: string
  ): void => {
    getReview(reviewsId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ReviewDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (reviewId) {
      handleGetReview(reviewId);
    }
  }, []);

  if (reviewId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Review"
      noAddBtn
    >
      <FormControl
        config={getReviewFormConfig(defaultValue)}
      >
        <ReviewsForm reviewId={reviewId} />
      </FormControl>
    </CMSPageLayout>
  );
}
