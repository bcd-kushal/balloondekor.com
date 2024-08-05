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
import ServicesEditor from "./form/ServicesEditor";

// fetchAPIs
import { getSubPage } from "@/fetchAPIs/cms/subPage";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";
import { ResponseDataType } from "@/types/cms/api";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function SubPageForm({
  id,
  initialCategory,
  initialPage
}: {
  id?: string;
  initialCategory?: string;
  initialPage?: string;
}) {
  const { addStatus } = useStatusContext();

  const [showForm, setShowForm] =
    useState<number>(0);
  const [subPageId, setSubPageId] =
    useState<string>(id || "");
  const [defaultValue, setDefaultValue] =
    useState<SubPageDocument>(
      {} as SubPageDocument
    );

  const handleUpdateSubPageId = (
    subPageId: string
  ) => {
    setSubPageId(subPageId);
  };

  const handleGetSubPage = (
    subPageId: string
  ) => {
    getSubPage(subPageId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as SubPageDocument
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
    if (!subPageId) {
      setShowForm(1);
    }
  }, []);

  useEffect(() => {
    if (subPageId) {
      handleGetSubPage(subPageId);
    }
  }, [subPageId]);

  const titleList: string[] = [
    "",
    "Start with the basics",
    "Visual Info",
    "Media",
    "SEO Info",
    "Services"
  ];

  return (
    <CMSPageLayout
      title={titleList[showForm]}
      noAddBtn
    >
      {showForm === 0 && <p>Loading...</p>}
      {showForm === 1 && (
        <BasicInfoEditor
          title="Start with the basics"
          id={subPageId}
          initialCategory={initialCategory}
          initialPage={initialPage}
          defaultValue={defaultValue}
          setId={handleUpdateSubPageId}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 2 && (
        <VisualInfoEditor
          title="visual info"
          id={subPageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 3 && (
        <MediaEditor
          title="media"
          id={subPageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 4 && (
        <SEOInfoEditor
          title="SEO info"
          id={subPageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 5 && (
        <ServicesEditor
          title="Services"
          id={subPageId}
          defaultValue={defaultValue}
          setShowForm={setShowForm}
        />
      )}
    </CMSPageLayout>
  );
}
