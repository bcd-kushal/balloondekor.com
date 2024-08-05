"use client";
import { deleteLocalStorage } from "@/lib/localStorage";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { LS_PAGE_INDEX_KEY } from "../Transaction";

export default function CartIndexingEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/cart"))
      deleteLocalStorage(LS_PAGE_INDEX_KEY);
  }, [pathname]);

  return null;
}
