import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "label";
export const DEFAULT_ORDER_BY = "asc";

export const SORT_BY_OPTIONS: OptionType[] = [
  { label: "label", value: "label" },
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
  { label: "label", value: "label" },
  { label: "content", value: "content" },
  { label: "active", value: "isActive" }
];
