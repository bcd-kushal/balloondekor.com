/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import DeliveryTypeForm, {
  getDeliveryTypeFormConfig
} from "@/components/cms/delivery-type/DeliveryTypeForm";

// fetchAPIs
import { getDeliveryType } from "@/fetchAPIs/cms/deliveryType";

// types
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/delivery-type/deliveryTypeEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function DeliverySlotEditor({
  deliveryTypeId
}: {
  deliveryTypeId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<DeliveryTypeDocument>(
      {} as DeliveryTypeDocument
    );

  // handlers
  const handleGetDeliveryType = (
    deliveryTypeId: string
  ): void => {
    getDeliveryType(deliveryTypeId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as DeliveryTypeDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (deliveryTypeId) {
      handleGetDeliveryType(deliveryTypeId);
    }
  }, []);

  if (deliveryTypeId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Delivery Type"
      noAddBtn
    >
      <FormControl
        config={getDeliveryTypeFormConfig(
          defaultValue
        )}
      >
        <DeliveryTypeForm
          deliveryTypeId={deliveryTypeId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
