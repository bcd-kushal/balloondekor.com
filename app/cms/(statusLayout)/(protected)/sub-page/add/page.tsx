"use client";

import { useSearchParams } from "next/navigation";

import SubPageForm from "@/components/cms/sub-page/SubPageForm";

export default function AddSubPageRoute() {
  const queryParams = useSearchParams();
  const initialCategory =
    queryParams.get("category") || undefined;
  const initialPage =
    queryParams.get("page") || undefined;

  return (
    <SubPageForm
      initialCategory={initialCategory}
      initialPage={initialPage}
    />
  );
}
