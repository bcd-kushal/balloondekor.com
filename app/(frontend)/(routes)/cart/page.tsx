import { Metadata } from "next";

import Transaction from "@/components/ui/transaction/Transaction";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your cart and checkout in seconds"
};

export default function CartPage() {
  return <Transaction />;
  // return <></>;
}
