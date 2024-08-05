/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// libraries
import { useEffect, useState } from "react";

// components
import FormControl from "@/components/common/form/FormControl";
import StateForm, {
  getStateFormConfig
} from "./StateForm";

// fetchAPIs
import { getState } from "@/fetchAPIs/cms/state";

// types
import { StateDocument } from "@/schemas/cms/state";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/state/stateEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function StateEditor({
  stateId
}: {
  stateId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<StateDocument>({} as StateDocument);

  // handlers
  const handleGetState = (
    stateId: string
  ): void => {
    getState(stateId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as StateDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (stateId) {
      handleGetState(stateId);
    }
  }, []);

  if (stateId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="State"
      noAddBtn
    >
      <FormControl
        config={getStateFormConfig({
          name: defaultValue?.name || ""
        })}
      >
        <StateForm stateId={stateId} />
      </FormControl>
    </CMSPageLayout>
  );
}
