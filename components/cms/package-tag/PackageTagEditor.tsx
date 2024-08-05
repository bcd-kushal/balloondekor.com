/* eslint-disable react-hooks/exhaustive-deps */

"use client";
// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import PackageTagForm, {
  getPackageTagFormConfig
} from "./PackageTagForm";

// fetchAPIs
import { getPackageTag } from "@/fetchAPIs/cms/packageTag";

// types
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function PackageTagEditor({
  packageTagId
}: {
  packageTagId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<PackageTagDocument>(
      {} as PackageTagDocument
    );

  // handlers
  const handleGetPackageTag = (
    packageTagId: string
  ): void => {
    getPackageTag(packageTagId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as PackageTagDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (packageTagId) {
      handleGetPackageTag(packageTagId);
    }
  }, []);

  if (packageTagId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Package Tag"
      noAddBtn
    >
      <FormControl
        config={getPackageTagFormConfig({
          name: defaultValue?.name || "",
          colorCode: defaultValue?.colorCode || ""
        })}
      >
        <PackageTagForm
          packageTagId={packageTagId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
