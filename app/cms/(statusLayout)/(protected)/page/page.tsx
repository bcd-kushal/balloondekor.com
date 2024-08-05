"use client";

import { useSearchParams } from "next/navigation";

import PagePage from "@/components/cms/page/PagePage";

export default function PageRoute() {
  const queryParams = useSearchParams();
  const filterCategory: string =
    queryParams.get("category") || "";

  return (
    <PagePage filterCategory={filterCategory} />
  );
}
