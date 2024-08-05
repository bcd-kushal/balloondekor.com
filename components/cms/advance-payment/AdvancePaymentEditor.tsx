/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import AdvancePaymentForm, {
  getAdvancePaymentFormConfig
} from "@/components/cms/advance-payment/AdvancePaymentForm";

// fetchAPIs
import { getAdvancePayment } from "@/fetchAPIs/cms/advancePayment";

// types
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/advance-payment/advancePaymentEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function AdvancePaymentEditor({
  advancePaymentId
}: {
  advancePaymentId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<AdvancePaymentDocument>(
      {} as AdvancePaymentDocument
    );

  // handlers
  const handleGetAdvancePayment = (
    advancePaymentId: string
  ): void => {
    getAdvancePayment(advancePaymentId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as AdvancePaymentDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (advancePaymentId) {
      handleGetAdvancePayment(advancePaymentId);
    }
  }, []);

  if (advancePaymentId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Advance Payment"
      noAddBtn
    >
      <FormControl
        config={getAdvancePaymentFormConfig({
          label: defaultValue?.label || "",
          value: defaultValue?.value || NaN
        })}
      >
        <AdvancePaymentForm
          advancePaymentId={advancePaymentId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
