import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "venue";
export const DEFAULT_ORDER_BY = "asc";

export const SORT_BY_OPTIONS: OptionType[] = [
  { label: "name", value: "name" },
  { label: "abbreviation", value: "abbr" },
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
  { label: "name", value: "name" },
  { label: "abbreviation", value: "abbr" },
  { label: "active", value: "isActive" }
];
