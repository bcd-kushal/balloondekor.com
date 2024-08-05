/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import GeneralTagForm, {
  getGeneralTagFormConfig
} from "./GeneralTagForm";

// fetchAPIs
import { getGeneralTag } from "@/fetchAPIs/cms/generalTag";

// types
import { GeneralTagDocument } from "@/schemas/cms/generalTag";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/general-tag/generalTagEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function GeneralTagEditor({
  generalTagId
}: {
  generalTagId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<GeneralTagDocument>(
      {} as GeneralTagDocument
    );

  // handlers
  const handleFetchGeneralTags = (
    generalTagId: string
  ): void => {
    getGeneralTag(generalTagId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as GeneralTagDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (generalTagId) {
      handleFetchGeneralTags(generalTagId);
    }
  }, []);

  if (generalTagId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="General Tag"
      noAddBtn
    >
      <FormControl
        config={getGeneralTagFormConfig({
          name: defaultValue?.name || ""
        })}
      >
        <GeneralTagForm id={generalTagId} />
      </FormControl>
    </CMSPageLayout>
  );
}
