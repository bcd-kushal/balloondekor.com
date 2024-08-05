"use client";
import PageWithTable from "@/components/common/table/admin/PageWithTable";
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  FILTER_BY_OPTIONS,
  SORT_BY_OPTIONS
} from "@/constants/cms/color";
import { ORDER_BY_OPTIONS } from "@/constants/cms/sidebar";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";
import { CouponDocument } from "@/schemas/cms/coupon";
import {
  FilterType,
  SidebarType,
  SortType
} from "@/types/cms/sidebar";
import { use, useEffect, useState } from "react";
import CouponList from "./scraps/CouponList";
import { DOMAIN } from "@/constants/cms/apiRoute";

export default function CouponsPage() {
  const { addStatus } = useStatusContext();
  const { keyword: searchKeyword } =
    useSearchContext();

  const [coupons, setCoupons] = useState<
    CouponDocument[]
  >([]);

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
  const [resetPagination, setResetPagination] =
    useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);

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

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++[ MAJOR PROCESSINGS ]+++++++++++++++++++++++++++++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleGetCoupons = () => {
    fetch(`${DOMAIN}/api/cms/coupon`)
      .then(async (res) => await res.json())
      .then((resData) => {
        if (resData.data) {
          setCoupons(
            (prev) =>
              resData.data as CouponDocument[]
          );
        }
      });
  };

  const activateCoupon = (
    couponId: string,
    newStatus: "active" | "inactive"
  ) => {
    fetch(
      `${DOMAIN}/api/cms/coupon/${couponId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          isActive:
            newStatus === "active" ? true : false
        })
      }
    )
      .then(async (res) => await res.json())
      .then((resData) => {
        if (
          resData.status[0].type !== "success"
        ) {
          addStatus([
            {
              message: resData.status[0].message,
              type: "error"
            }
          ]);
        } else {
          addStatus([
            {
              message: resData.status[0].message,
              type: "success"
            }
          ]);

          handleGetCoupons();
        }
      });
  };

  const deleteCoupon = (couponId: string) => {
    fetch(
      `${DOMAIN}/api/cms/coupon/${couponId}`,
      { method: "DELETE" }
    )
      .then(async (res) => await res.json())
      .then((resData) => {
        if (
          resData.status[0].type !== "success"
        ) {
          addStatus([
            {
              message: resData.status[0].message,
              type: "error"
            }
          ]);
        } else {
          addStatus([
            {
              message: resData.status[0].message,
              type: "success"
            }
          ]);

          handleGetCoupons();
        }
      });
  };

  useEffect(() => {
    handleGetCoupons();
  }, []);

  return (
    <PageWithTable
      title="Coupons"
      addBtnTitle="Add coupon"
      pagination={{
        count: count,
        limit: limit,
        resetPagination: resetPagination,
        setOffset: setOffset,
        setResetPagination: setResetPagination
      }}
      tableComponent={
        <CouponList
          offset={offset}
          coupons={coupons}
          activateCoupon={activateCoupon}
          deleteCoupon={deleteCoupon}
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
