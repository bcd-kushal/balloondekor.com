/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import OrderProcessingTimeForm, {
  getOrderProcessingTimeFormConfig
} from "./OrderProcessingTimeForm";

// fetchAPIs
import { getOrderProcessingTime } from "@/fetchAPIs/cms/orderProcessingTime";

// types
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function OrderProcessingTimeEditor({
  orderProcessingTimeId
}: {
  orderProcessingTimeId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<OrderProcessingTimeDocument>(
      {} as OrderProcessingTimeDocument
    );

  // handlers
  const handleGetOrderProcessingTime = (
    orderProcessingTimeId: string
  ): void => {
    getOrderProcessingTime(orderProcessingTimeId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as OrderProcessingTimeDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };
  // lifecycle
  useEffect(() => {
    if (orderProcessingTimeId) {
      handleGetOrderProcessingTime(
        orderProcessingTimeId
      );
    }
  }, []);

  if (orderProcessingTimeId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Order Processing Time"
      noAddBtn
    >
      <FormControl
        config={getOrderProcessingTimeFormConfig({
          label: defaultValue?.label || "",
          time: defaultValue?.time || NaN
        })}
      >
        <OrderProcessingTimeForm
          orderProcessingTimeId={
            orderProcessingTimeId
          }
        />
      </FormControl>
    </CMSPageLayout>
  );
}
