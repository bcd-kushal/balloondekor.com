import { StatusType } from "@/types/cms/common";

export interface QueryParamsType {
  populate?: boolean;
  active?: boolean;
  deleted?: boolean;
  offset: number;
  limit: number;
  sortBy: string;
  orderBy: string;
  filterBy: string;
  keyword: string;
  fromDate: string;
  toDate: string;
}

export interface ResponseDataType {
  data: any;
  status: StatusType[];
}

export interface PaginationResponseDataType
  extends ResponseDataType {
  count: number;
}
