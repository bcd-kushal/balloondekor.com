/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import DynamicForm, {
  getDynamicPageFormConfig
} from "@/components/cms/dynamicPage/DynamicPageForm";

// fetchAPIs
import { getDynamicPage } from "@/fetchAPIs/cms/dynamicPage";

// types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/dynamicPage/dynamicPageEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function DynamicPageEditor({
  dynamicPageId
}: {
  dynamicPageId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<DynamicPageDocument>(
      {} as DynamicPageDocument
    );

  // handlers
  const handleGetDynamicPage = (
    dynamicPageId: string
  ): void => {
    getDynamicPage(dynamicPageId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as DynamicPageDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (dynamicPageId) {
      handleGetDynamicPage(dynamicPageId);
    }
  }, []);

  if (dynamicPageId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Dynamic Page"
      noAddBtn
    >
      <FormControl
        config={getDynamicPageFormConfig(
          defaultValue
        )}
      >
        <DynamicForm
          dynamicPageId={dynamicPageId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
