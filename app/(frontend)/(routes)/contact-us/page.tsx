import { Metadata } from "next";

import ContactUs from "@/components/ui/contactUs/ContactUs";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your account, orders and more"
};

export default function ContactUsRoute() {
  return <ContactUs />;
}
