/* eslint-disable react-hooks/exhaustive-deps */

"use client";
// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import OccasionForm, {
  getOccasionFormConfig
} from "./OccasionForm";

// fetchAPIs
import { getOccasion } from "@/fetchAPIs/cms/occasion";

// types
import { OccasionDocument } from "@/schemas/cms/occasion";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/occasion/occasionEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function OccasionEditor({
  occasionId
}: {
  occasionId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<OccasionDocument>(
      {} as OccasionDocument
    );

  // handlers
  const handleGetOccasion = (
    occasionId: string
  ): void => {
    getOccasion(occasionId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as OccasionDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (occasionId) {
      handleGetOccasion(occasionId);
    }
  }, []);

  if (occasionId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Occassion"
      noAddBtn
    >
      <FormControl
        config={getOccasionFormConfig({
          name: defaultValue?.name || ""
        })}
      >
        <OccasionForm occasionId={occasionId} />
      </FormControl>
    </CMSPageLayout>
  );
}
