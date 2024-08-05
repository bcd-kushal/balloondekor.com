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
import { getPage } from "@/fetchAPIs/cms/page";

// types
import { PageDocument } from "@/schemas/cms/page";
import { ResponseDataType } from "@/types/cms/api";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function PageForm({
  id
}: {
  id?: string;
}) {
  const { addStatus } = useStatusContext();

  const [showForm, setShowForm] =
    useState<number>(0);
  const [pageId, setPageId] = useState<string>(
    id || ""
  );
  const [defaultValue, setDefaultValue] =
    useState<PageDocument>({} as PageDocument);

  const handleUpdatePageId = (pageId: string) => {
    setPageId(pageId);
  };

  const handleGetPage = (pageId: string) => {
    getPage(pageId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as PageDocument
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
    if (!pageId) {
      setShowForm(1);
    }
  }, []);

  useEffect(() => {
    if (pageId) {
      handleGetPage(pageId);
    }
  }, [pageId]);

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
          id={pageId}
          defaultValue={defaultValue}
          setId={handleUpdatePageId}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 2 && (
        <VisualInfoEditor
          title="visual info"
          id={pageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 3 && (
        <MediaEditor
          title="media"
          id={pageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 4 && (
        <SEOInfoEditor
          title="SEO info"
          id={pageId}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowForm={setShowForm}
        />
      )}
      {showForm === 5 && (
        <ServicesEditor
          title="Services"
          id={pageId}
          defaultValue={defaultValue}
          setShowForm={setShowForm}
        />
      )}
    </CMSPageLayout>
  );
}
