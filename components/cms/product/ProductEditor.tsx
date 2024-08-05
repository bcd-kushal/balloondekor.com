/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import ProductForm, {
  getProductFormConfig
} from "@/components/cms/product/ProductForm";

// fetchAPIs
import { getProduct } from "@/fetchAPIs/cms/product";

// types
import { ProductDocument } from "@/schemas/cms/product";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function ProductEditor({
  productId
}: {
  productId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<ProductDocument>(
      {} as ProductDocument
    );

  // handlers
  const handleGetProduct = (
    productId: string
  ): void => {
    getProduct(productId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ProductDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (productId) {
      handleGetProduct(productId);
    }
  }, []);

  if (productId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Product"
      noAddBtn
    >
      <FormControl
        config={getProductFormConfig(
          defaultValue
        )}
      >
        <ProductForm productId={productId} />
      </FormControl>
    </CMSPageLayout>
  );
}
