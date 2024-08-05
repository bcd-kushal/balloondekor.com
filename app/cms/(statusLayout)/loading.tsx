"use server";
import { LoadingPreviewComponent } from "@/components/cms/loaders/LoadingSpin";

export default async function CMSLoadingPage() {
  return (
    <div className="min-h-[100dvh] flex items-center min-w-screen">
      <LoadingPreviewComponent title="and verifying admin" />
    </div>
  );
}
