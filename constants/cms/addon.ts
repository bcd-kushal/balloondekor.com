import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "createdAt";
export const DEFAULT_ORDER_BY = "desc";

export const SORT_BY_OPTIONS: OptionType[] = [
  { label: "name", value: "name" },
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
  { label: "category", value: "category" },
  { label: "name", value: "name" },
  {
    label: "customizable",
    value: "isCustomizable"
  },
  { label: "active", value: "isActive" }
];
