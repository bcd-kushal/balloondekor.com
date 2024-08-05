/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import CityForm, {
  getCityFormConfig
} from "@/components/cms/city/CityForm";

// fetchAPIs
import { getCity } from "@/fetchAPIs/cms/city";

// types
import { CityDocument } from "@/schemas/cms/city";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/city/cityEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function CityEditor({
  cityId
}: {
  cityId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<CityDocument>({} as CityDocument);

  // handlers
  const handleGetCity = (
    cityId: string
  ): void => {
    getCity(cityId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as CityDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };
  // lifecycle
  useEffect(() => {
    if (cityId) {
      handleGetCity(cityId);
    }
  }, []);

  if (cityId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="City"
      noAddBtn
    >
      <FormControl
        config={getCityFormConfig(defaultValue)}
      >
        <CityForm cityId={cityId} />
      </FormControl>
    </CMSPageLayout>
  );
}
