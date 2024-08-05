import { getOrders } from "@/fetchAPIs/frontend/order";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { OrderDocument } from "@/schemas/cms/order";
import { useEffect, useState } from "react";
import UserOrdersList from "./UserOrdersList";

export default function UserDashboardOrders({
  userLoggedIn
}: {
  userLoggedIn: boolean;
}) {
  const {
    order: {
      data: { orders: customerOrdersFromContext }
    }
  } = useCustomerContext();

  const [customerOrders, setCustomerOrders] =
    useState<OrderDocument[]>([]);

  useEffect(() => {
    if (!userLoggedIn)
      setCustomerOrders((prev) => []);
    else {
      setCustomerOrders(
        (prev) => customerOrdersFromContext
      );
    }
  }, [userLoggedIn, customerOrdersFromContext]);

  if (!customerOrders || !customerOrders.length)
    return (
      <div className="flex flex-col items-center justify-center max-md:h-[240px] h-full text-zinc-500 text-[14px]">
        Orders you make will appear here
      </div>
    );

  return (
    <section className="overflow-x-scroll scrollbar-hide flex justify-start max-sm:w-[calc(100dvw_-_24px)] sm:w-[calc(100dvw_-_264px)] sm:max-w-[936px] pt-[12px]">
      <section className="relative flex flex-col items-stretch justify-start min-w-[650px] w-full">
        <UserOrdersList orders={customerOrders} />
      </section>
    </section>
  );
}
