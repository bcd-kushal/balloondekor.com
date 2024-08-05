/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import BrandForm, {
  getBrandFormConfig
} from "@/components/cms/brand/BrandForm";

// fetchAPIs
import { getBrand } from "@/fetchAPIs/cms/brand";

// types
import { BrandDocument } from "@/schemas/cms/brand";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/brand/brandEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function BrandEditor({
  brandId
}: {
  brandId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<BrandDocument>({} as BrandDocument);

  // handlers
  const handleGetBrand = (
    brandId: string
  ): void => {
    getBrand(brandId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as BrandDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (brandId) {
      handleGetBrand(brandId);
    }
  }, []);

  if (brandId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Brand"
      noAddBtn
    >
      <FormControl
        config={getBrandFormConfig(defaultValue)}
      >
        <BrandForm brandId={brandId} />
      </FormControl>
    </CMSPageLayout>
  );
}
