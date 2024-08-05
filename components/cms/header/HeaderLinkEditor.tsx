/* eslint-disable react-hooks/exhaustive-deps */

"use client";
// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import HeaderNavLinkForm, {
  getHeaderNavLinkFormConfig
} from "@/components/cms/header/HeaderLinkForm";

// fetchAPIs
import { getNavLink } from "@/fetchAPIs/cms/navLink";

// types
import { NavLinkDocument } from "@/schemas/cms/navLink";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/header/headerLinkEditor.module.css";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function HeaderNavLinkEditor({
  navLinkId
}: {
  navLinkId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<NavLinkDocument>(
      {} as NavLinkDocument
    );

  // handlers
  const handleGetNavLink = (
    navLinkId: string
  ): void => {
    getNavLink(navLinkId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as NavLinkDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (navLinkId) {
      handleGetNavLink(navLinkId);
    }
  }, []);

  if (navLinkId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title="Header Nav Link"
      noAddBtn
    >
      <FormControl
        config={getHeaderNavLinkFormConfig(
          defaultValue
        )}
      >
        <HeaderNavLinkForm
          navLinkId={navLinkId}
        />
      </FormControl>
    </CMSPageLayout>
  );
}
