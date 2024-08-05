/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import GSTForm, {
  getGSTFormConfig
} from "./GSTForm";

// fetchAPIs
import { getGST } from "@/fetchAPIs/cms/gst";

// types
import { GSTDocument } from "@/schemas/cms/gst";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/gst/gstEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function GSTEditor({
  id
}: {
  id?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<GSTDocument>({} as GSTDocument);

  // handlers
  const handleFetchGSTs = (
    gstId: string
  ): void => {
    getGST(gstId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as GSTDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (id) {
      handleFetchGSTs(id);
    }
  }, []);

  if (id) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="GST"
      noAddBtn
    >
      <FormControl
        config={getGSTFormConfig({
          label: defaultValue?.label || "",
          value: defaultValue?.value || NaN
        })}
      >
        <GSTForm id={id} />
      </FormControl>
    </CMSPageLayout>
  );
}
