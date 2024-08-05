"use client";

import { useSearchParams } from "next/navigation";

import SubPagePage from "@/components/cms/sub-page/SubPagePage";

export default function SubPageRoute() {
  const queryParams = useSearchParams();
  const filterPage: string =
    queryParams.get("page") || "";

  return <SubPagePage filterPage={filterPage} />;
}
