/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";

import PaymentUI from "@/payment/PaymentUI";

import {
  NavigationType,
  PriceDetailsType
} from "../../static/types";
import { CustomerDocument } from "@/schemas/cms/customer";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { useStatusContext } from "@/hooks/useStatusContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import Link from "next/link";

export default function TransactionPayment({
  handleNavigation,
  priceDetails
}: {
  handleNavigation: NavigationType;
  priceDetails: PriceDetailsType | undefined;
}) {
  const { addStatus } = useStatusContext();
  const router = useRouter();

  const {
    customer: {
      data: { id: customerId }
    },
    cart: {
      data: {
        id: cartId,
        checkoutInfo,
        payableAmount,
        paymentPercentage
      },
      action: {
        updateCartItems,
        updateAppliedCoupon
      }
    },
    order: {
      action: { onGenerateOrder }
    }
  } = useCustomerContext();

  const [status, setStatus] = useState<
    | "initial"
    | "cancelled"
    | "failure"
    | "success"
  >("initial");

  const [successTimer, setSuccessTimer] =
    useState<number>(4);
  const [failureTimer, setFailureTimer] =
    useState<number>(9);

  const handleUpdateStatus = (
    newStatus: "cancelled" | "failure" | "success"
  ): void => {
    if (newStatus === "cancelled") {
      setStatus((prevStatus) =>
        prevStatus === "initial"
          ? newStatus
          : prevStatus
      );
    } else {
      setStatus(newStatus);
      // if (
      //   newStatus === "failure" ||
      //   newStatus === "success"
      // ) {
      //   handleUpdateCartOnOrder();
      // }
    }
  };

  // const handleUpdateCartOnOrder = () => {
  //   updateCartItems([]);
  //   updateAppliedCoupon(null);
  // };

  useEffect(() => {
    if (status === "cancelled") {
      handleNavigation.goBack();
      addStatus([
        {
          message: "Payment Not Completed",
          type: "error"
        }
      ]);
    }
    if (status === "success") {
      const interval = setInterval(
        () =>
          setSuccessTimer((prev) =>
            prev > 0 ? prev - 1 : 0
          ),
        1000
      );

      return () => clearInterval(interval);
    }
    if (status === "failure") {
      const interval = setInterval(
        () =>
          setFailureTimer((prev) =>
            prev > 0 ? prev - 1 : 0
          ),
        1000
      );

      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (successTimer === 0)
      router.push("/dashboard?tab=orders");
  }, [successTimer]);

  useEffect(() => {
    if (failureTimer === 0)
      router.push("/dashboard?tab=orders");
  }, [failureTimer]);

  return (
    <>
      {priceDetails ? (
        status === "initial" ? (
          <div className=" flex flex-col items-center justify-center gap-1 w-full mt-[25dvh] animate-pulse">
            <span className="text-[28px] font-semibold">
              Payment processing
            </span>
            <span className="text-[26px] tracking-wide font-medium text-green-600">
              ₹{" "}
              {priceDetails?.finalAmount.amount ||
                0}
              {/* {Math.ceil(
                priceDetails.finalAmount.amount *
                  (paymentPercentage / 100)
              )} */}
            </span>
            <span className="mt-10 text-[20px] text-zinc-400">
              Do not close or refresh your browser
            </span>
          </div>
        ) : status === "failure" ? (
          <div className="flex flex-col items-center justify-center w-full h-[550px]">
            <span className="text-[28px] font-medium text-red-500">
              Failed
            </span>
            <span className="text-zinc-500">
              Redirecting to ... in {failureTimer}{" "}
              seconds
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[550px]">
            <span className="text-[28px] font-medium text-green-500">
              Success!
            </span>
            <span className="text-zinc-500">
              Redirecting you to{" "}
              <Link
                href={"/dashboard?tab=orders"}
                prefetch
                className="transition-colors duration-300 underline underline-offset-2 text-green-600 hover:text-green-950"
              >
                Order Dashboard
              </Link>{" "}
              in {successTimer} seconds
            </span>
          </div>
        )
      ) : (
        <></>
      )}
      <PaymentUI
        amount={payableAmount}
        percentage={paymentPercentage}
        customer={{
          id: customerId || "",
          name: checkoutInfo?.name || "",
          mail: checkoutInfo?.mail || "",
          mobileNumber:
            checkoutInfo?.mobileNumber || "",
          cartId: cartId || ""
        }}
        onGenerateOrder={onGenerateOrder}
        updateStatus={handleUpdateStatus}
      />
    </>
  );
}
