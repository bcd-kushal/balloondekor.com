import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "reviewCategory";
export const DEFAULT_ORDER_BY = "asc";

export const SORT_BY_OPTIONS: OptionType[] = [
  {
    label: "review category",
    value: "reviewCategory"
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
  {
    label: "service category",
    value: "serviceCategory"
  },
  {
    label: "review category",
    value: "reviewCategory"
  },
  {
    label: "active",
    value: "isActive"
  }
];
