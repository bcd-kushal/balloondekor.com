"use client";
import {
  NewOrderSVG,
  OrderedListSVG,
  TotalCustomersSVG
} from "@/constants/svgs/svg";
import { getCustomers } from "@/fetchAPIs/cms/customer";
import {
  getOrder,
  getOrders
} from "@/fetchAPIs/cms/order";
import { CustomerDocument } from "@/schemas/cms/customer";
import { OrderDocument } from "@/schemas/cms/order";
import { PaginationResponseDataType } from "@/types/cms/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState<{
    total: OrderDocument[];
    newOrders: OrderDocument[];
  }>({ total: [], newOrders: [] });
  const [customers, setCustomers] = useState<
    CustomerDocument[]
  >([]);

  const handleGetData = () => {
    const getFullCustomers = async () => {
      const resData: PaginationResponseDataType =
        await getCustomers({
          offset: 0,
          limit: 100000,
          sortBy: "",
          filterBy: "",
          fromDate: "",
          keyword: "",
          orderBy: "",
          toDate: "",
          active: true,
          deleted: false
        });

      return resData.data;
    };

    const getFullOrders = async (): Promise<{
      newOrders: OrderDocument[];
      total: OrderDocument[];
    }> => {
      const newOrders: PaginationResponseDataType =
        await getOrders({
          offset: 0,
          limit: 100000,
          sortBy: "",
          filterBy: "",
          fromDate: "",
          keyword: "",
          orderBy: "",
          toDate: "",
          orderType: "new-order",
          active: true,
          deleted: false
        });

      const cancelled: PaginationResponseDataType =
        await getOrders({
          offset: 0,
          limit: 100000,
          sortBy: "",
          filterBy: "",
          fromDate: "",
          keyword: "",
          orderBy: "",
          toDate: "",
          orderType: "cancelled",
          active: true,
          deleted: false
        });

      const delivered: PaginationResponseDataType =
        await getOrders({
          offset: 0,
          limit: 100000,
          sortBy: "",
          filterBy: "",
          fromDate: "",
          keyword: "",
          orderBy: "",
          toDate: "",
          orderType: "delivered",
          active: true,
          deleted: false
        });

      const inProgress: PaginationResponseDataType =
        await getOrders({
          offset: 0,
          limit: 100000,
          sortBy: "",
          filterBy: "",
          fromDate: "",
          keyword: "",
          orderBy: "",
          toDate: "",
          orderType: "in-progress",
          active: true,
          deleted: false
        });

      return {
        newOrders: newOrders.data,
        total: [
          ...newOrders.data,
          ...cancelled.data,
          ...delivered.data,
          ...inProgress.data
        ]
      };
    };

    Promise.all([
      getFullCustomers(),
      getFullOrders()
    ])
      .then(([customerData, orderData]) => {
        setCustomers((prev) => customerData);
        setOrders((prev) => ({
          newOrders: orderData.newOrders,
          total: orderData.total
        }));
      })
      .catch((err: any) => console.error(err));
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <section className="flex flex-col items-stretch justify-start gap-[12px] p-14 text-[20px]">
      <div className=" grid place-items-center grid-rows-2 py-16">
        <span className="text-[32px] leading-tight">
          Dashboard
        </span>
        <span>Hi, superAdmin</span>
      </div>

      <div className="grid grid-rows-3 sm:grid-cols-3 gap-14 *:aspect-video *:p-10 *:rounded-[20px]">
        <div className="grid grid-cols-[auto_1fr] gap-8 bg-indigo-200/55">
          <div className="flex items-start justify-center">
            <NewOrderSVG dimensions={27} />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="leading-tight">
              New Orders
            </span>
            <span className="font-medium text-[34px]">
              {orders.newOrders.length}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-8 bg-zinc-200/65">
          <div className="flex items-start justify-center">
            <TotalCustomersSVG dimensions={27} />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="leading-tight">
              Total Customers
            </span>
            <span className="font-medium text-[34px]">
              {customers.length}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-8 bg-zinc-200/65">
          <div className="flex items-start justify-center">
            <OrderedListSVG dimensions={27} />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="leading-tight">
              All Orders
            </span>
            <span className="font-medium text-[34px]">
              {orders.total.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
