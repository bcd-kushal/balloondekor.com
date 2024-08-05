"use client";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import { DOMAIN } from "@/constants/cms/apiRoute";
import {
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/city";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";
import { CustomerDocument } from "@/schemas/cms/customer";
import {
  FilterType,
  SortType
} from "@/types/cms/sidebar";
import { useEffect, useState } from "react";
import CustomerList from "./logic/CustomerList";
import { eradicateThisCustomer } from "@/fetchAPIs/cms/customer";
import { descendingList } from "./helpers/descendingList";

export default function AllCustomers() {
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
  const [customers, setCustomers] = useState<
    CustomerDocument[]
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

  const handleDeleteCustomer = (
    id: string
  ): void => {
    eradicateThisCustomer(id)
      .then((res) => {
        addStatus(res.status);
        handleGetAllCustomers();
      })
      .catch((err: any) => {
        console.error(
          `Error in deleting at fetch:`,
          err
        );
        addStatus(err.status);
      });
  };

  const handleGetAllCustomers = () => {
    fetch(`${DOMAIN}/api/cms/customer`)
      .then((res) => res.json())
      .then((res): void => {
        const customers =
          res.data as CustomerDocument[];
        setCustomers((prev) =>
          descendingList(customers)
        );
      });
  };

  useEffect(() => {
    handleGetAllCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetAllCustomers();
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
    handleGetAllCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <PageWithTable
      title="All Customers"
      noAddBtn
      tableComponent={
        <CustomerList
          offset={offset}
          customers={customers}
          setCustomers={setCustomers}
          onToggleOption={setStatusToggle}
          onDelete={handleDeleteCustomer}
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
