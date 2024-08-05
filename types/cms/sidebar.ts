import { OptionType } from "@/types/cms/form";

export type SidebarType = {
  isShown: boolean;
  onHide: () => void;
};

export type SortType = {
  sortBy: {
    default: string;
    options: OptionType[];
    val: string;
    set: (sortBy: string) => void;
  };
  orderBy: {
    default: string;
    options: OptionType[];
    val: string;
    set: (orderBy: string) => void;
  };
};

export type FilterType = {
  filterBy: {
    options: OptionType[];
    val: string;
    set: (filterBy: string) => void;
  };
  keyword: {
    val: string;
    set: (keyword: string) => void;
  };
  fromDate: {
    val: string;
    set: (fromDate: string) => void;
  };
  toDate: {
    val: string;
    set: (toDate: string) => void;
  };
};
