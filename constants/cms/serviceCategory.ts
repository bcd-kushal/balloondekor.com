import { OptionType } from "@/types/cms/form";

export const DEFAULT_SORT_BY = "createdAt";
export const DEFAULT_ORDER_BY = "desc";

export const SORT_BY_OPTIONS: OptionType[] = [
  { label: "name", value: "name" },
  {
    label: "completed",
    value: "isCompleted"
  },
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
  { label: "name", value: "name" },
  { label: "slug", value: "slug" },
  { label: "h1 heading", value: "heading" },
  {
    label: "meta title",
    value: "metaTitle"
  },
  {
    label: "meta tags",
    value: "metaTags"
  },
  {
    label: "meta description",
    value: "metaDescription"
  }
];
