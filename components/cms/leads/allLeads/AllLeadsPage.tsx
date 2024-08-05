"use client";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";
import { AllLeadsDocument } from "@/schemas/cms/allLeads";
import {
  FilterType,
  SortType
} from "@/types/cms/sidebar";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import { useEffect, useState } from "react";
import {
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/color";
import { DOMAIN } from "@/constants/frontend/apiRoute";
import AllLeadsList from "./logic/AllLeadsList";

export default function AllLeadsPage() {
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  const [sortBy, setSortBy] = useState<string>(
    "submittedAt" || ""
  );
  const [orderBy, setOrderBy] = useState<string>(
    "desc" || ""
  );
  const [filterBy, setFilterBy] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");
  const [fromDate, setFromDate] =
    useState<string>("");
  const [toDate, setToDate] =
    useState<string>("");
  const [allLeads, setAllLeads] = useState<
    AllLeadsDocument[]
  >([]);
  const [statusToggle, setStatusToggle] =
    useState<boolean>(false);

  const sort: SortType = {
    sortBy: {
      default: DEFAULT_SORT_BY || "",
      options: SORT_BY_OPTIONS,
      val: sortBy,
      set: setSortBy
    },
    orderBy: {
      default: "desc" || "",
      options: ORDER_BY_OPTIONS,
      val: orderBy,
      set: setOrderBy
    }
  };

  const filter: FilterType = {
    filterBy: {
      options: FILTER_BY_OPTIONS,
      val: filterBy,
      set: setFilterBy
    },
    keyword: {
      val: keyword,
      set: setKeyword
    },
    fromDate: {
      val: fromDate,
      set: setFromDate
    },
    toDate: {
      val: toDate,
      set: setToDate
    }
  };

  // pagination states
  const [resetPagination, setResetPagination] =
    useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);

  const handleDeleteLead = (
    id: string
  ): void => {};

  const handleGetAllLeads = () => {
    fetch(`${DOMAIN}/api/frontend/all-leads`)
      .then((res) => res.json())
      .then((res): void => {
        const leads =
          res.data as AllLeadsDocument[];
        if (leads.length) {
          const newLeads: AllLeadsDocument[] =
            leads.filter(
              ({ status }) => status === ""
            );
          const oldLeads: AllLeadsDocument[] =
            leads.filter(
              ({ status }) => status !== ""
            );

          const updatedLeads: AllLeadsDocument[] =
            [...newLeads, ...oldLeads];

          setAllLeads(
            updatedLeads as AllLeadsDocument[]
          );
        }
      });
  };

  useEffect(() => {
    handleGetAllLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetAllLeads();
    setResetPagination(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    limit,
    sortBy,
    orderBy,
    filterBy,
    searchKeyword,
    keyword,
    fromDate,
    toDate,
    statusToggle
  ]);

  useEffect(() => {
    handleGetAllLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <PageWithTable
      title="Leads"
      noAddBtn
      tableComponent={
        <AllLeadsList
          offset={offset}
          leads={allLeads}
          setLeads={setAllLeads}
          onToggleOption={setStatusToggle}
          onDelete={handleDeleteLead}
        />
      }
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      sort={sort}
      filter={filter}
    />
  );
}
