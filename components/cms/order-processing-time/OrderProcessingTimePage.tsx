/* eslint-disable react-hooks/exhaustive-deps */

"use client";
// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

import OrderProcessingTimeList from "@/components/cms/order-processing-time/OrderProcessingTimeList";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/orderProcessingTime";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getOrderProcessingTimes,
  activateOrderProcessingTime,
  deleteOrderProcessingTime
} from "@/fetchAPIs/cms/orderProcessingTime";

// types
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";

// styles
import styles from "@/components/cms/order-processing-time/orderProcessingTimePage.module.css";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function OrderProcessingTimePage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [
    OrderProcessingTimes,
    setOrderProcessingTimes
  ] = useState<OrderProcessingTimeDocument[]>([]);

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
  const handleGetOrderProcessingTimes =
    (): void => {
      setOrderProcessingTimes([]);
      getOrderProcessingTimes({
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
            setOrderProcessingTimes(
              responseData.data as OrderProcessingTimeDocument[]
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

  const handleToggleOrderProcessingTimeActive = (
    orderProcessingTimeId: string,
    isActive: boolean
  ): void => {
    activateOrderProcessingTime(
      orderProcessingTimeId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setOrderProcessingTimes(
          (prevOrderProcessingTimes) =>
            prevOrderProcessingTimes.map(
              (prevOrderProcessingTime) => {
                if (
                  prevOrderProcessingTime._id ===
                  orderProcessingTimeId
                ) {
                  prevOrderProcessingTime.isActive =
                    isActive;
                }

                return prevOrderProcessingTime;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteOrderProcessingTime = (
    orderProcessingTimeId: string
  ): void => {
    deleteOrderProcessingTime(
      orderProcessingTimeId
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetOrderProcessingTimes();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetOrderProcessingTimes();
  }, []);

  useEffect(() => {
    handleGetOrderProcessingTimes();
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
    handleGetOrderProcessingTimes();
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
      title="Order Processing Time"
      tableComponent={
        <OrderProcessingTimeList
          offset={offset}
          OrderProcessingTimes={
            OrderProcessingTimes
          }
          onToggleActive={
            handleToggleOrderProcessingTimeActive
          }
          onDelete={
            handleDeleteOrderProcessingTime
          }
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
