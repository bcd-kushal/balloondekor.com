/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import CustomizationQuestionForm, {
  getCustomizationQuestionFormConfig
} from "@/components/cms/customization-question/CustomizationQuestionForm";

// fetchAPIs
import { getCustomizationQuestion } from "@/fetchAPIs/cms/customizationQuestion";

// types
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/customization-question/customizationQuestionEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function CustomizationQuestionEditor({
  customizationQuestionId
}: {
  customizationQuestionId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<CustomizationQuestionDocument>(
      {} as CustomizationQuestionDocument
    );

  // handlers
  const handleFetchGeneralTags = (
    customizationQuestionId: string
  ): void => {
    getCustomizationQuestion(
      customizationQuestionId
    )
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as CustomizationQuestionDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (customizationQuestionId) {
      handleFetchGeneralTags(
        customizationQuestionId
      );
    }
  }, []);

  if (customizationQuestionId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Customization Question"
      noAddBtn
    >
      <FormControl
        config={getCustomizationQuestionFormConfig(
          defaultValue
        )}
      >
        <CustomizationQuestionForm
          id={customizationQuestionId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
