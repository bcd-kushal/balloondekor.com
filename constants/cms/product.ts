import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "productName";
export const DEFAULT_ORDER_BY = "desc";

export const SORT_BY_OPTIONS: OptionType[] = [
  { label: "productName", value: "productName" },
  {
    label: "active",
    value: "isActive"
  },
  {
    label: "created date",
    value: "createdAt"
  },
  {
    label: "modified date",
    value: "updatedAt"
  }
];

export const FILTER_BY_OPTIONS: OptionType[] = [
  { label: "productName", value: "productName" }
];
