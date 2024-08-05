/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import CancellationPolicyForm, {
  getCancellationPolicyFormConfig
} from "@/components/cms/cancellation-policy/CancellationPolicyForm";

// fetchAPIs
import { getCancellationPolicy } from "@/fetchAPIs/cms/cancellationPolicy";

// types
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/cancellation-policy/cancellationPolicyEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function CancellationPolicyEditor({
  cancellationPolicyId
}: {
  cancellationPolicyId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<CancellationPolicyDocument>(
      {} as CancellationPolicyDocument
    );

  // handlers
  const handleGetCancellationPolicy = (
    cancellationPolicyId: string
  ): void => {
    getCancellationPolicy(cancellationPolicyId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as CancellationPolicyDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (cancellationPolicyId) {
      handleGetCancellationPolicy(
        cancellationPolicyId
      );
    }
  }, []);

  if (cancellationPolicyId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Cancellation Policy"
      noAddBtn
    >
      <FormControl
        config={getCancellationPolicyFormConfig(
          defaultValue
        )}
      >
        <CancellationPolicyForm
          cancellationPolicyId={
            cancellationPolicyId
          }
        />
      </FormControl>
    </CMSPageLayout>
  );
}
