/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Sidebar from "../sidebar/Sidebar";
import PageHeader from "@/components/cms/PageHeader";
import TrendingList from "@/components/cms/trending/TrendingList";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import Paginate from "@/components/common/Paginate";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/advancePayment";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getTrendings,
  activateTrending,
  deleteTrending
} from "@/fetchAPIs/cms/trending";

// types
import { TrendingDocument } from "@/schemas/cms/trending";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";

export default function TrendingPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [trendings, setTrendings] = useState<
    TrendingDocument[]
  >([]);

  // sidebar states
  const [showSidebar, setShowSidebar] =
    useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(
    DEFAULT_SORT_BY || ""
  );
  const [orderBy, setOrderBy] = useState<string>(
    DEFAULT_ORDER_BY || ""
  );
  const [filterBy, setFilterBy] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");
  const [fromDate, setFromDate] =
    useState<string>("");
  const [toDate, setToDate] =
    useState<string>("");

  const sidebar: SidebarType = {
    isShown: showSidebar,
    onHide: () => {
      setShowSidebar(false);
    }
  };

  const sort: SortType = {
    sortBy: {
      default: DEFAULT_SORT_BY || "",
      options: SORT_BY_OPTIONS,
      val: sortBy,
      set: setSortBy
    },
    orderBy: {
      default: DEFAULT_ORDER_BY || "",
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

  // handlers
  const handleGetGSTs = (): void => {
    setTrendings([]);
    getTrendings({
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword: searchKeyword || keyword,
      fromDate,
      toDate
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setCount(responseData.count);
          setTrendings(
            responseData.data as TrendingDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleToggleGSTActive = (
    gstId: string,
    isActive: boolean
  ): void => {
    activateTrending(gstId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setTrendings((prevGSTs) =>
          prevGSTs.map((gst) => {
            if (gst._id === gstId) {
              gst.isActive = isActive;
            }

            return gst;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteGST = (
    gstId: string
  ): void => {
    deleteTrending(gstId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetGSTs();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetGSTs();
  }, []);

  useEffect(() => {
    handleGetGSTs();
    setResetPagination(true);
  }, [
    limit,
    sortBy,
    orderBy,
    filterBy,
    keyword,
    searchKeyword,
    fromDate,
    toDate
  ]);

  useEffect(() => {
    handleGetGSTs();
  }, [offset]);

  return (
    <PageWithTable
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      title="Trendings"
      addBtnTitle="Add Trending"
      tableComponent={
        <TrendingList
          offset={offset}
          trendings={trendings}
          onToggleActive={handleToggleGSTActive}
          onDelete={handleDeleteGST}
        />
      }
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      sort={sort}
      filter={filter}
    />
  );
}
