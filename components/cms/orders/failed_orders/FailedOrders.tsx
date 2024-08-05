"use client";
import {
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/color";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import { useSearchContext } from "@/hooks/useSearchContext";
import { OrderDocument } from "@/schemas/cms/order";
import {
  FilterType,
  SortType
} from "@/types/cms/sidebar";
import { useEffect, useState } from "react";
import {
  LineItemStatusTypes,
  OrderUpdatePropsType
} from "../OrdersPage";
import {
  getFailedOrders,
  updateOrderStatus
} from "@/fetchAPIs/cms/order";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import OrdersList from "../logic/OrdersList";

export default function FailedOrders() {
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
  const [orders, setOrders] = useState<
    OrderDocument[]
  >([]);

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
  const [limit, setLimit] =
    useState<number>(1000);

  const handleGetOrders = () => {
    getFailedOrders({
      populate: true,
      offset,
      limit,
      sortBy: "",
      orderBy,
      filterBy,
      keyword: searchKeyword || keyword,
      fromDate,
      toDate
    }).then((res): void => {
      const orders = res.data as OrderDocument[];
      setOrders((prev) => orders);
    });
  };

  const handleChangeOrderStatus = ({
    orderId,
    orderDetailId,
    lineItemId,
    currStatus,
    newStatus
  }: {
    orderId: string;
    orderDetailId: string;
    lineItemId: string;
    currStatus: LineItemStatusTypes;
    newStatus: LineItemStatusTypes;
  }) => {
    if (newStatus === currStatus) return;

    const reqData: OrderUpdatePropsType = {
      orderId,
      orderDetailId,
      lineItemId,
      currStatus,
      newStatus
    };

    updateOrderStatus(reqData)
      .then((res) => {
        handleGetOrders();
      })
      .catch((err) =>
        console.error(
          `Couldnt update or get updated orders`,
          err
        )
      );
  };

  useEffect(() => {
    handleGetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetOrders();
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
    toDate
  ]);

  useEffect(() => {
    handleGetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <PageWithTable
      title={"Failed Orders"}
      noAddBtn
      tableComponent={
        <OrdersList
          offset={offset}
          orders={orders}
          setOrders={setOrders}
          handleChangeOrderStatus={
            handleChangeOrderStatus
          }
          showStatus={false}
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
