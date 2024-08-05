/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import RelationForm, {
  getRelationFormConfig
} from "./RelationForm";

// fetchAPIs
import { getRelation } from "@/fetchAPIs/cms/relation";

// types
import { RelationDocument } from "@/schemas/cms/relation";
import { ResponseDataType } from "@/types/cms/api";

// styles
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function RelationEditor({
  relationId
}: {
  relationId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<RelationDocument>(
      {} as RelationDocument
    );

  // handlers
  const handleGetRelations = (
    relationId: string
  ): void => {
    getRelation(relationId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as RelationDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (relationId) {
      handleGetRelations(relationId);
    }
  }, []);

  if (relationId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Relation"
      noAddBtn
    >
      <FormControl
        config={getRelationFormConfig({
          name: defaultValue?.name || ""
        })}
      >
        <RelationForm relationId={relationId} />
      </FormControl>
    </CMSPageLayout>
  );
}
