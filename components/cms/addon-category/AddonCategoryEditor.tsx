/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import AddonCategoryForm, {
  getAddonCategoryFormConfig
} from "@/components/cms/addon-category/AddonCategoryForm";

// fetchAPIs
import { getAddonCategory } from "@/fetchAPIs/cms/addonCategory";

// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/addon-category/addonCategoryEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function AddonCategoryEditor({
  addonCategoryId
}: {
  addonCategoryId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<AddonCategoryDocument>(
      {} as AddonCategoryDocument
    );

  // handlers
  const handleGetAddonCategory = (
    addonCategoryId: string
  ): void => {
    getAddonCategory(addonCategoryId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as AddonCategoryDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (addonCategoryId) {
      handleGetAddonCategory(addonCategoryId);
    }
  }, []);

  if (addonCategoryId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Addon Category"
      noAddBtn
    >
      <FormControl
        config={getAddonCategoryFormConfig(
          defaultValue
        )}
      >
        <AddonCategoryForm
          addonCategoryId={addonCategoryId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
