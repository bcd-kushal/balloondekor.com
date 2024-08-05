/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import AITagForm, {
  getAITagFormConfig
} from "@/components/cms/ai-tag/AITagForm";

// fetchAPIs
import { getAITag } from "@/fetchAPIs/cms/aiTag";

// types
import { AITagDocument } from "@/schemas/cms/aiTag";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/ai-tag/aiTagEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function AITagEditor({
  aiTagId
}: {
  aiTagId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<AITagDocument>({} as AITagDocument);

  // handlers
  const handleGetAITagId = (
    aiTagId: string
  ): void => {
    getAITag(aiTagId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as AITagDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (aiTagId) {
      handleGetAITagId(aiTagId);
    }
  }, []);

  if (aiTagId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="AI Tag"
      noAddBtn
    >
      <FormControl
        config={getAITagFormConfig({
          label: defaultValue?.label || ""
        })}
      >
        <AITagForm aiTagId={aiTagId} />
      </FormControl>
    </CMSPageLayout>
  );
}
