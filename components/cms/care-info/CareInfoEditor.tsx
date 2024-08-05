/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import CareInfoForm, {
  getCareInfoFormConfig
} from "./CareInfoForm";

// fetchAPIs
import { getCareInfo } from "@/fetchAPIs/cms/careInfo";

// types
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/care-info/careInfoEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function CareInfoEditor({
  careInfoId
}: {
  careInfoId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<CareInfoDocument>(
      {} as CareInfoDocument
    );

  // handlers
  const handleGetCareInfo = (
    careInfoId: string
  ): void => {
    getCareInfo(careInfoId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as CareInfoDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };
  // lifecycle
  useEffect(() => {
    if (careInfoId) {
      handleGetCareInfo(careInfoId);
    }
  }, []);

  if (careInfoId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Care Info"
      noAddBtn
    >
      <FormControl
        config={getCareInfoFormConfig({
          label: defaultValue?.label || "",
          content: defaultValue?.content || ""
        })}
      >
        <CareInfoForm careInfoId={careInfoId} />
      </FormControl>
    </CMSPageLayout>
  );
}
