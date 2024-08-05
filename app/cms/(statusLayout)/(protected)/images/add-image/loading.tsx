"use server";
import { LoadingPreviewComponent } from "@/components/cms/loaders/LoadingSpin";

export default async function CMSLoadingPage() {
  return (
    <LoadingPreviewComponent title="Image Add Area" />
  );
}
