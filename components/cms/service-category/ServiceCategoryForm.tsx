/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import BasicInfoEditor from "./form/BasicInfoEditor";
import VisualInfoEditor from "./form/VisualInfoEditor";
import MediaEditor from "./form/MediaEditor";
import SEOInfoEditor from "./form/SEOInfoEditor";

// fetchAPIs
import { getServiceCategory } from "@/fetchAPIs/cms/serviceCategory";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/service-category/serviceCategoryForm.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function ServiceCategoryForm({
  id
}: {
  id?: string;
}) {
  const { addStatus: addStatus } =
    useStatusContext();

  const [showForm, setShowForm] =
    useState<number>(0);
  const [
    serviceCategoryId,
    setServiceCategoryId
  ] = useState<string>(id || "");
  const [defaultValue, setDefaultValue] =
    useState<ServiceCategoryDocument>(
      {} as ServiceCategoryDocument
    );

  const handleUpdateServiceCategoryId = (
    serviceCategoryId: string
  ) => {
    setServiceCategoryId(serviceCategoryId);
  };

  const handleGetServiceCategory = (
    serviceCategoryId: string
  ) => {
    getServiceCategory(serviceCategoryId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceCategoryDocument
        );
        if (showForm === 0) {
          setShowForm(1);
        }
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    if (!serviceCategoryId) {
      setShowForm(1);
    }
  }, []);

  useEffect(() => {
    if (serviceCategoryId) {
      handleGetServiceCategory(serviceCategoryId);
    }
  }, [serviceCategoryId]);

  const TitleList: string[] = [
    "",
    "Start with the basics",
    "Visual Info",
    "Media",
    "SEO Info"
  ];

  return (
    <CMSPageLayout
      title={TitleList[showForm]}
      noAddBtn
    >
      {showForm === 0 && <p>Loading...</p>}
      {showForm === 1 && (
        <BasicInfoEditor
          title="Start with the basics"
          id={serviceCategoryId}
          defaultValue={defaultValue}
          setId={handleUpdateServiceCategoryId}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 2 && (
        <VisualInfoEditor
          title="visual info"
          id={serviceCategoryId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 3 && (
        <MediaEditor
          title="media"
          id={serviceCategoryId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 4 && (
        <SEOInfoEditor
          title="SEO info"
          id={serviceCategoryId}
          defaultValue={defaultValue}
          setShowForm={setShowForm}
        />
      )}
    </CMSPageLayout>
  );
}
