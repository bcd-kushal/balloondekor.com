/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import DynamicPageList from "./DynamicPageList";

// constants
import {
  DEFAULT_SORT_BY,
  DEFAULT_ORDER_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/serviceCategory";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getDynamicPages,
  activateDynamicPage,
  deleteDynamicPage
} from "@/fetchAPIs/cms/dynamicPage";

// types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function DynamicPagePage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [dynamicPages, setDynamicPages] =
    useState<DynamicPageDocument[]>([]);

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
  const handleGetDynamicPages = () => {
    setDynamicPages([]);
    getDynamicPages({
      populate: true,
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
          setDynamicPages(
            responseData.data as DynamicPageDocument[]
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

  const handleToggleDynamicPageActive = (
    pageId: string,
    isActive: boolean
  ): void => {
    activateDynamicPage(pageId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setDynamicPages((prevPages) =>
          prevPages.map((prevPage) => {
            if (prevPage._id === pageId) {
              prevPage.isActive = isActive;
            }

            return prevPage;
          })
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteDynamicPage = (
    pageId: string
  ): void => {
    deleteDynamicPage(pageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetDynamicPages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetDynamicPages();
  }, []);

  useEffect(() => {
    handleGetDynamicPages();
    setResetPagination(true);
  }, [
    limit,
    sortBy,
    orderBy,
    filterBy,
    searchKeyword,
    keyword,
    fromDate,
    toDate
  ]);

  useEffect(() => {
    handleGetDynamicPages();
  }, [offset]);

  return (
    <PageWithTable
      title="Dynamic pages"
      addBtnTitle="Add page"
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      tableComponent={
        <DynamicPageList
          offset={offset}
          dynamicPages={dynamicPages}
          onToggleActive={
            handleToggleDynamicPageActive
          }
          onDelete={handleDeleteDynamicPage}
        />
      }
      entries={{
        limit: limit,
        setLimit: setLimit
      }}
      filter={filter}
      sort={sort}
    />
  );
}
