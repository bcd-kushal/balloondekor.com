"use client";

import { useRouter } from "next/navigation";

export default function SettingsLogoError() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="">There was an error</div>
      <button
        className="p-3 bg-black text-white rounded-lg"
        onClick={() => router.refresh()}
      >
        Refresh
      </button>
    </div>
  );
}
