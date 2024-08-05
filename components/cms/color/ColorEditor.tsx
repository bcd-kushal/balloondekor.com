/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import ColorForm, {
  getColorFormConfig
} from "@/components/cms/color/ColorForm";

// fetchAPIs
import { getColor } from "@/fetchAPIs/cms/color";

// types
import { ColorDocument } from "@/schemas/cms/color";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/color/colorEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function ColorEditor({
  colorId
}: {
  colorId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<ColorDocument>({} as ColorDocument);

  // handlers
  const handleGetColor = (
    colorId: string
  ): void => {
    getColor(colorId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ColorDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };
  // lifecycle
  useEffect(() => {
    if (colorId) {
      handleGetColor(colorId);
    }
  }, []);

  if (colorId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Color"
      noAddBtn
    >
      <FormControl
        config={getColorFormConfig({
          name: defaultValue?.name || "",
          code: defaultValue?.code || ""
        })}
      >
        <ColorForm colorId={colorId} />
      </FormControl>
    </CMSPageLayout>
  );
}
