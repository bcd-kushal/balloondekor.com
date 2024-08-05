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
import DeliveryTypeList from "@/components/cms/delivery-type/DeliveryTypeList";
import Paginate from "@/components/common/Paginate";

// constants
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/deliveryType";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";

// fetchAPIs
import {
  getDeliveryTypes,
  activateDeliveryType,
  deleteDeliveryType
} from "@/fetchAPIs/cms/deliveryType";

// types
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
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
import styles from "@/components/cms/delivery-type/deliveryTypePage.module.css";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

export default function DeliveryTypePage() {
  // hooks
  const { addStatus } = useStatusContext();

  const { keyword: searchKeyword } =
    useSearchContext();

  // list states
  const [deliveryTypes, setDeliveryTypes] =
    useState<DeliveryTypeDocument[]>([]);

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
  const handleGetDeliveryTypes = (): void => {
    setDeliveryTypes([]);
    getDeliveryTypes({
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
          setDeliveryTypes(
            responseData.data as DeliveryTypeDocument[]
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

  const handleToggleDeliveryTypeActive = (
    deliveryTypeId: string,
    isActive: boolean
  ): void => {
    activateDeliveryType(deliveryTypeId, isActive)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setDeliveryTypes((prevDeliveryTypes) =>
          prevDeliveryTypes.map(
            (prevDeliveryType) => {
              if (
                prevDeliveryType._id ===
                deliveryTypeId
              ) {
                prevDeliveryType.isActive =
                  isActive;
              }

              return prevDeliveryType;
            }
          )
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteDeliveryType = (
    deliveryTypeId: string
  ): void => {
    deleteDeliveryType(deliveryTypeId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        handleGetDeliveryTypes();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetDeliveryTypes();
  }, []);

  useEffect(() => {
    handleGetDeliveryTypes();
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
    handleGetDeliveryTypes();
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
      title="Delivery Type"
      addBtnTitle="Add delivery type"
      tableComponent={
        <DeliveryTypeList
          offset={offset}
          timeTypes={deliveryTypes}
          onToggleActive={
            handleToggleDeliveryTypeActive
          }
          onDelete={handleDeleteDeliveryType}
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
