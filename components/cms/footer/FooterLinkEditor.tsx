/* eslint-disable react-hooks/exhaustive-deps */

"use client";
// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import FooterLinkSectionForm, {
  getFooterLinkSectionFormConfig
} from "@/components/cms/footer/FooterLinkForm";

// fetchAPIs
import { getFooterLinkSection } from "@/fetchAPIs/cms/footerLinkSection";

// types
import { FooterLinkSectionDocument } from "@/schemas/cms/footerLinkSection";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function FooterLinkSectionEditor({
  footerLinkSectionId
}: {
  footerLinkSectionId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<FooterLinkSectionDocument>(
      {} as FooterLinkSectionDocument
    );

  // handlers
  const handleGetFooterLinkSection = (
    footerLinkSectionId: string
  ): void => {
    getFooterLinkSection(footerLinkSectionId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as FooterLinkSectionDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (footerLinkSectionId) {
      handleGetFooterLinkSection(
        footerLinkSectionId
      );
    }
  }, []);

  if (footerLinkSectionId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Footer Nav Link"
      noAddBtn
    >
      <FormControl
        config={getFooterLinkSectionFormConfig(
          defaultValue
        )}
      >
        <FooterLinkSectionForm
          footerLinkSectionId={
            footerLinkSectionId
          }
        />
      </FormControl>
    </CMSPageLayout>
  );
}
