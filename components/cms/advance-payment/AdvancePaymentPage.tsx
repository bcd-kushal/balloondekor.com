/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import AdvancePaymentList from "@/components/cms/advance-payment/AdvancePaymentList";

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
  getAdvancePayments,
  activateAdvancePayment,
  deleteAdvancePayment
} from "@/fetchAPIs/cms/advancePayment";

// types
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
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
import { usePathname } from "next/navigation";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function AdvancePaymentPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [advancePayments, setAdvancePayments] =
    useState<AdvancePaymentDocument[]>([]);

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
  const handleGetAdvancePayments = (): void => {
    setAdvancePayments([]);
    getAdvancePayments({
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
          setAdvancePayments(
            responseData.data as AdvancePaymentDocument[]
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

  const handleToggleAdvancePaymentActive = (
    advancePaymentId: string,
    isActive: boolean
  ): void => {
    activateAdvancePayment(
      advancePaymentId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setAdvancePayments(
          (prevAdvancePayments) =>
            prevAdvancePayments.map(
              (prevAdvancePayment) => {
                if (
                  prevAdvancePayment._id ===
                  advancePaymentId
                ) {
                  prevAdvancePayment.isActive =
                    isActive;
                }

                return prevAdvancePayment;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteAdvancePayment = (
    advancePaymentId: string
  ): void => {
    deleteAdvancePayment(advancePaymentId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetAdvancePayments();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetAdvancePayments();
  }, []);

  useEffect(() => {
    handleGetAdvancePayments();
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
    handleGetAdvancePayments();
  }, [offset]);

  const currPath = usePathname();

  return (
    <PageWithTable
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      title="Advance Payments"
      tableComponent={
        <AdvancePaymentList
          offset={offset}
          advancePayments={advancePayments}
          onToggleActive={
            handleToggleAdvancePaymentActive
          }
          onDelete={handleDeleteAdvancePayment}
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
