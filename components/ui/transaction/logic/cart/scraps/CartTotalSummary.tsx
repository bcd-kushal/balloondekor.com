import {
  CouponType,
  NavigationType,
  PriceDetailsType
} from "../../../static/types";
import styles from "../../../static/styles/bookNowBtn.module.css";
import { BUY_BTN_LABEL } from "../../../static/constants";
import {
  BinSVG,
  INRSVG,
  NoPersonSVG,
  SmileSVG
} from "@/constants/svgs/svg";
import { useState } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import CouponsList from "@/components/ui/service/info/OffersModal";

export default function CartTotalSummary({
  finalPrice: finalAmountToPay,
  priceDetails,
  platformFee,
  handleNavigation,
  currCoupon,
  couponList,
  emptyCart,
  summaryId,
  setCurrCoupon
}: {
  finalPrice: number;
  priceDetails: PriceDetailsType;
  platformFee: number;
  handleNavigation: NavigationType;
  currCoupon: CouponType | undefined;
  couponList: CouponType[];
  emptyCart: boolean;
  summaryId: string;
  setCurrCoupon: (
    newCoupon: CouponType | undefined
  ) => void;
}) {
  const [showAllCoupons, setShowAllCoupons] =
    useState<boolean>(false);
  return (
    <>
      <section
        className={
          emptyCart
            ? "hidden"
            : " sm:w-[32%] min-[1199px]:w-[400px] sm:sticky sm:top-[20px] bg-white border-[1.5px] border-black/30 rounded-2xl sm:h-fit pt-6 pb-8 px-4 *:px-4 max-[1199px]:mr-[10px] mt-[20px] ml-[10px] mb-[10dvh] sm:mb-0 flex flex-col items-stretch justify-start gap-3"
        }
      >
        <div className="text-[22px] pb-4 font-semibold">
          Summary
        </div>

        {/* BASE PRICES ===================== */}
        {Object.entries(
          priceDetails.basePrices
        ).map(([key, val], index) => (
          <div
            className="flex items-center justify-between w-full"
            key={index}
          >
            <span>{val.label}</span>
            <span>
              ₹{" "}
              {val.amount
                ? val.amount
                : key === "totalAmount"
                  ? priceDetails.basePrices
                      .baseTotal.amount +
                    priceDetails.basePrices
                      .addonTotal.amount
                  : "0"}
            </span>
          </div>
        ))}

        {/* COUPON ===================== */}
        <div
          id={summaryId}
          className="flex flex-col w-full rounded-xl justify-center gap-3 bg-green-100 text-green-800 py-3 px-4"
        >
          <div className="flex items-center justify-between w-full">
            <span>
              {priceDetails.coupon.label}
              {currCoupon?.couponCode
                ? ` (${currCoupon.couponCode})`
                : ""}
            </span>
            <span>
              {currCoupon?.couponCode
                ? `- ₹ ${priceDetails.coupon.amount}`
                : "--"}
            </span>
          </div>
          <div className="flex items-start justify-start gap-1 text-[13px] *:pr-2 *:-mt-2 *:cursor-pointer *:transition-all *:duration-300">
            {currCoupon ? (
              <span
                className="translate-y-1 hover:text-green-900 hover:underline hover:underline-offset-2"
                onClick={() =>
                  setCurrCoupon(undefined)
                }
              >
                <BinSVG
                  dimensions={14}
                  stroke="#aa0000"
                />
              </span>
            ) : (
              <></>
            )}
            <span
              className={`${currCoupon ? "ml-2" : ""} text-indigo-800 font-medium tracking-wider rounded-md hover:underline hover:underline-offset-2`}
              onClick={() =>
                setShowAllCoupons((prev) => true)
              }
            >
              Select{" "}
              {currCoupon ? (
                <span>other</span>
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <span>Platform Charges</span>
          <span>₹ {platformFee}</span>
        </div>

        <span className=" w-[95%] my-4 h-[1.5px] bg-black/30 left-1/2 -translate-x-1/2 relative"></span>

        <div className="flex items-center justify-between w-full font-semibold text-[18px]">
          <span>
            {priceDetails.finalAmount.label}
          </span>
          <span>
            ₹{" "}
            {priceDetails.finalAmount.rawAmount
              ? priceDetails.finalAmount.rawAmount
              : finalAmountToPay}
          </span>
        </div>

        <span className="pt-5 text-[19px] max-sm:hidden">
          <div
            className={styles.buyBtn}
            onClick={() =>
              handleNavigation.goForward()
            }
          >
            {BUY_BTN_LABEL[0]}
          </div>
        </span>

        <span className="w-full p-2 mt-10 sm:mt-4 flex items-center justify-center gap-5 text-[14px] text-center">
          <div className="flex flex-col items-center justify-center gap-2 leading-tight">
            <NoPersonSVG dimensions={22} />
            <span>No hidden charges</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 leading-tight">
            <SmileSVG dimensions={22} />
            <span>5M smiles delivered</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 leading-tight">
            <INRSVG dimensions={22} />
            <span>100% secure payments</span>
          </div>
        </span>
      </section>
      <Dialog
        open={showAllCoupons}
        onOpenChange={() =>
          setShowAllCoupons((prev) => !prev)
        }
      >
        <DialogContent className="min-w-fit p-0 rounded-3xl">
          <CouponsList
            coupons={couponList}
            priceDetails={priceDetails}
            title="All Coupons"
            setCurrCoupon={setCurrCoupon}
            closeDialog={setShowAllCoupons}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
