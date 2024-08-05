/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import AddonForm, {
  getAddonFormConfig
} from "@/components/cms/addon/AddonForm";

// fetchAPIs
import { getAddon } from "@/fetchAPIs/cms/addon";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function AddonEditor({
  addonId
}: {
  addonId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<AddonDocument>({} as AddonDocument);

  // handlers
  const handleGetAddon = (
    addonId: string
  ): void => {
    getAddon(addonId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as AddonDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (addonId) {
      handleGetAddon(addonId);
    }
  }, []);

  if (addonId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Addon"
      noAddBtn
    >
      <FormControl
        config={getAddonFormConfig(defaultValue)}
      >
        <AddonForm addonId={addonId} />
      </FormControl>
    </CMSPageLayout>
  );
}
