"use client";
import { useSearchContext } from "@/hooks/useSearchContext";
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
import { OrderDocument } from "@/schemas/cms/order";
import {
  getOrders,
  updateOrderStatus
} from "@/fetchAPIs/cms/order";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import OrdersList from "./logic/OrdersList";

type OrderType =
  | "new-order"
  | "in-progress"
  | "delivered"
  | "cancelled";

export type LineItemStatusTypes =
  | "ordered"
  | "preparing"
  | "on-the-way"
  | "completed"
  | "cancelled";

type OrdersHeadingType =
  | "New Orders"
  | "In-progress Orders"
  | "Cancelled Orders"
  | "Delivered Orders";

type QueryOrderType = Record<
  OrderType,
  Array<LineItemStatusTypes>
>;

type OrderTableHeadingType = Record<
  OrderType,
  OrdersHeadingType
>;

const queryOrderMap: QueryOrderType = {
  "in-progress": ["on-the-way", "preparing"],
  "new-order": ["ordered"],
  cancelled: ["cancelled"],
  delivered: ["completed"]
};

const orderHeadingMap: OrderTableHeadingType = {
  "in-progress": "In-progress Orders",
  "new-order": "New Orders",
  cancelled: "Cancelled Orders",
  delivered: "Delivered Orders"
};

export type OrderUpdatePropsType = {
  orderId: string;
  orderDetailId: string;
  lineItemId: string;
  newStatus: LineItemStatusTypes;
  currStatus: LineItemStatusTypes;
};

export const filteredOrders = ({
  orders,
  orderType
}: {
  orders: OrderDocument[];
  orderType: OrderType;
}): OrderDocument[] => {
  return orders
    .filter(
      ({ detail }) =>
        (
          detail as OrderDetailDocument
        ).lineItems.filter((lineItem) =>
          queryOrderMap[orderType].includes(
            (lineItem as LineItemDocument).status
          )
        ).length
    )
    .filter(
      ({ payment: { status } }) =>
        status !== "pending"
    );
};

export default function OrdersPage({
  orderType
}: {
  orderType:
    | "new-order"
    | "in-progress"
    | "delivered"
    | "cancelled";
}) {
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
    getOrders({
      populate: true,
      offset,
      limit,
      sortBy: "",
      orderBy,
      filterBy,
      keyword: searchKeyword || keyword,
      fromDate,
      toDate,
      orderType
    }).then((res): void => {
      const orders = res.data as OrderDocument[];
      const filtered = filteredOrders({
        orders,
        orderType
      });
      setOrders((prev) => filtered);
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
      title={orderHeadingMap[orderType]}
      noAddBtn
      tableComponent={
        <OrdersList
          offset={offset}
          orders={orders}
          showStatus
          setOrders={setOrders}
          handleChangeOrderStatus={
            handleChangeOrderStatus
          }
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
