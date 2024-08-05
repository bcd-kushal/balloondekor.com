"use client";

import CMSPageLayout from "@/components/common/layout/admin/PageLayout";
import { getVenue } from "@/fetchAPIs/cms/venue";
import { useStatusContext } from "@/hooks/useStatusContext";
import { VenueDocument } from "@/schemas/services/venue";
import { ResponseDataType } from "@/types/cms/api";
import { useEffect, useState } from "react";
import VenueForm from "./VenueForm";

export default function VenueEditor({
  id
}: {
  id?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  const [defaultValue, setDefaultValue] =
    useState<VenueDocument>({} as VenueDocument);

  // handlers
  const handleGetVenue = (id: string): void => {
    getVenue({ id: id })
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as VenueDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (id) {
      handleGetVenue(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (id && !defaultValue._id) {
    return <p>Loading</p>;
  }

  return (
    <CMSPageLayout
      title="Venue"
      noAddBtn
    >
      <VenueForm
        id={id || ""}
        data={defaultValue}
      />
    </CMSPageLayout>
  );
}
