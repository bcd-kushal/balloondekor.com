"use client";

import { useSearchParams } from "next/navigation";

import ServicePage from "@/components/cms/service/ServicePage";

export default function ServiceRoute() {
  const queryParams = useSearchParams();
  const filterCategory: string =
    queryParams.get("category") || "";

  return (
    <ServicePage
      filterCategory={filterCategory}
    />
  );
}
