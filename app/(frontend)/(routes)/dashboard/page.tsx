import { Metadata } from "next";

import UserDashboard from "@/components/frontend/user/_dashboard/UserDashboard";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your account, orders and more"
};

export default function UserDashboardPage() {
  return (
    <Suspense fallback={null}>
      <UserDashboard />
    </Suspense>
  );
}
