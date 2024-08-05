/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";
import FormControl from "@/components/common/form/FormControl";
import TrendingForm, {
  getTrendingFormConfig
} from "./TrendingForm";

// fetchAPIs
import { getTrending } from "@/fetchAPIs/cms/trending";

// types
import { TrendingDocument } from "@/schemas/cms/trending";
import { ResponseDataType } from "@/types/cms/api";

export default function TrendingEditor({
  trendingId
}: {
  trendingId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<TrendingDocument>(
      {} as TrendingDocument
    );

  // handlers
  const handleFetchTrending = (
    gstId: string
  ): void => {
    getTrending(gstId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as TrendingDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (trendingId) {
      handleFetchTrending(trendingId);
    }
  }, []);

  if (trendingId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="New Trending"
      noAddBtn
    >
      <FormControl
        config={getTrendingFormConfig(
          defaultValue
        )}
      >
        <TrendingForm id={trendingId} />
      </FormControl>
    </CMSPageLayout>
  );
}
