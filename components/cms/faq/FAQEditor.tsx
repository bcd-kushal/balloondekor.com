/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import FAQForm, {
  getFAQFormConfig
} from "@/components/cms/faq/FAQForm";

// fetchAPIs
import { getFAQ } from "@/fetchAPIs/cms/faq";

// types
import { FAQDocument } from "@/schemas/cms/faq";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/faq/faqEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function FAQSEditor({
  faqId: faqId
}: {
  faqId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<FAQDocument>({} as FAQDocument);

  // handlers
  const handleGetFAQ = (faqId: string): void => {
    getFAQ(faqId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as FAQDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (faqId) {
      handleGetFAQ(faqId);
    }
  }, []);

  if (faqId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="FAQ"
      noAddBtn
    >
      <FormControl
        config={getFAQFormConfig(defaultValue)}
      >
        <FAQForm faqId={faqId} />
      </FormControl>
    </CMSPageLayout>
  );
}
