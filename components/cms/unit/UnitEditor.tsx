/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import UnitForm, {
  getUnitFormConfig
} from "@/components/cms/unit/UnitForm";

// fetchAPIs
import { getUnit } from "@/fetchAPIs/cms/unit";

// types
import { UnitDocument } from "@/schemas/cms/unit";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/unit/unitEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function UnitEditor({
  unitId
}: {
  unitId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<UnitDocument>({} as UnitDocument);

  // handlers
  const handleGetUnit = (
    unitId: string
  ): void => {
    getUnit(unitId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as UnitDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (unitId) {
      handleGetUnit(unitId);
    }
  }, []);

  if (unitId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Unit"
      noAddBtn
    >
      <FormControl
        config={getUnitFormConfig({
          name: defaultValue?.name || "",
          abbr: defaultValue?.abbr || ""
        })}
      >
        <UnitForm unitId={unitId} />
      </FormControl>
    </CMSPageLayout>
  );
}
