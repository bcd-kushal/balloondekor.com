/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Sidebar from "@/components/cms/sidebar/Sidebar";
import PageHeader from "@/components/cms/PageHeader";
import CancellationPolicyList from "@/components/cms/cancellation-policy/CancellationPolicyList";
import Paginate from "@/components/common/Paginate";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/cancellationPolicy";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getCancellationPolicies,
  activateCancellationPolicy,
  deleteCancellationPolicy
} from "@/fetchAPIs/cms/cancellationPolicy";

// types
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
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
import styles from "@/components/cms/cancellation-policy/cancellationPolicyPage.module.css";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function CancellationPolicyPage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [
    cancellationPolicies,
    setCancellationPolicies
  ] = useState<CancellationPolicyDocument[]>([]);

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
  const handleGetCancellationPolicies =
    (): void => {
      setCancellationPolicies([]);
      getCancellationPolicies({
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
            setCancellationPolicies(
              responseData.data as CancellationPolicyDocument[]
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

  const handleToggleCancellationPolicyActive = (
    cancellationPolicyId: string,
    isActive: boolean
  ): void => {
    activateCancellationPolicy(
      cancellationPolicyId,
      isActive
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setCancellationPolicies(
          (prevCancellationPolicies) =>
            prevCancellationPolicies.map(
              (prevCancellationPolicy) => {
                if (
                  prevCancellationPolicy._id ===
                  cancellationPolicyId
                ) {
                  prevCancellationPolicy.isActive =
                    isActive;
                }

                return prevCancellationPolicy;
              }
            )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteCancellationPolicy = (
    cancellationPolicyId: string
  ): void => {
    deleteCancellationPolicy(cancellationPolicyId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetCancellationPolicies();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetCancellationPolicies();
  }, []);

  useEffect(() => {
    handleGetCancellationPolicies();
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
    handleGetCancellationPolicies();
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
      title="Cancellation Policies"
      addBtnTitle="Add cancellation policy"
      tableComponent={
        <CancellationPolicyList
          offset={offset}
          cancellationPolicies={
            cancellationPolicies
          }
          onToggleActive={
            handleToggleCancellationPolicyActive
          }
          onDelete={
            handleDeleteCancellationPolicy
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
