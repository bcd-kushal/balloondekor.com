/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import DeliveryDetailForm, {
  getDeliveryDetailFormConfig
} from "./DeliveryDetailForm";

// fetchAPIs
import { getDeliveryDetail } from "@/fetchAPIs/cms/deliveryDetail";

// types
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/delivery-detail/deliveryDetailEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function DeliveryDetailEditor({
  deliveryDetailId
}: {
  deliveryDetailId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<DeliveryDetailDocument>(
      {} as DeliveryDetailDocument
    );

  // handlers
  const handleFetchDeliveryDetails = (
    deliveryDetailId: string
  ): void => {
    getDeliveryDetail(deliveryDetailId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as DeliveryDetailDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (deliveryDetailId) {
      handleFetchDeliveryDetails(
        deliveryDetailId
      );
    }
  }, []);

  if (deliveryDetailId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Delivery Detail"
      noAddBtn
    >
      <FormControl
        config={getDeliveryDetailFormConfig({
          label: defaultValue?.label || "",
          content: defaultValue?.content || ""
        })}
      >
        <DeliveryDetailForm
          deliveryDetailId={deliveryDetailId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
