"use client";

import Image from "next/image";

import styles from "@/components/ui/service/info/offer.module.css";
import {
  CouponType,
  PriceDetailsType
} from "../../transaction/static/types";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";

const COUPON_LABEL = {
  percentage: (percentage: number) =>
    `Get ${percentage * 100}% off `,
  upTo: (maxCap: number) => `up to ₹ ${maxCap} `,
  flat: (flatOut: number) =>
    `Flat ₹ ${flatOut} off `,
  freeDelivery: ({ upto }: { upto: number }) =>
    `No Convenience Charges`
};

const COUPON_DESC = {
  saveThisMuch: (savings: number) =>
    `Save ₹ ${savings} with this code`,
  toUnlock: (remainingAmount: number) =>
    `Add items worth ₹ ${remainingAmount} more to unlock`
};

export default function Coupon({
  coupon,
  priceDetails,
  setCurrCoupon,
  closeDialog
}: {
  coupon: CouponType;
  priceDetails: PriceDetailsType;
  setCurrCoupon: (newCoupon: CouponType) => void;
  closeDialog: React.Dispatch<
    SetStateAction<boolean>
  >;
}) {
  const {
    couponCode,
    couponId,
    discount,
    discountType,
    maxCap,
    minReqAmount,
    description: couponDetails
  } = coupon;

  // const couponDetails = `Lorem ipsum dolor sit amet consectetur adipisicing elit. \nQuam soluta harum laborum unde deleniti? \nDolor culpa eum dolorum. \nAliquam aspernatur delectus dolores iusto similique magni cumque explicabo autem sequi magnam?`;

  const [fullPrice, setFullPrice] =
    useState<number>(
      priceDetails.basePrices.totalAmount.amount
    );
  const [canApplyCoupon, setCanApplyCoupon] =
    useState<boolean>(fullPrice >= minReqAmount);
  const [showDetails, setShowDetails] =
    useState<boolean>(false);

  const totalAmountStillLeftForCoupnToBeAppliable: number =
    canApplyCoupon
      ? 0
      : Math.max(0, minReqAmount - fullPrice);
  const totalDiscount: number = canApplyCoupon
    ? discountType === "flat"
      ? maxCap > 0
        ? Math.min(maxCap, discount)
        : discount
      : discountType === "percentage"
        ? maxCap > 0
          ? Math.min(
              maxCap,
              Math.ceil(discount * fullPrice)
            )
          : Math.ceil(discount * fullPrice)
        : discount
    : 0;

  const finalAmountAfterApplyingCoupon: number =
    canApplyCoupon
      ? Math.max(0, fullPrice - totalDiscount)
      : fullPrice;

  const couponLabel: string =
    discountType === "flat"
      ? COUPON_LABEL.flat(discount) +
        (maxCap > 0 && maxCap !== discount
          ? COUPON_LABEL.upTo(maxCap)
          : "")
      : discountType === "percentage"
        ? COUPON_LABEL.percentage(discount) +
          (maxCap > 0
            ? COUPON_LABEL.upTo(maxCap)
            : "")
        : COUPON_LABEL.freeDelivery({
            upto: maxCap
          });

  const couponDesc: string = canApplyCoupon
    ? COUPON_DESC.saveThisMuch(totalDiscount)
    : COUPON_DESC.toUnlock(
        totalAmountStillLeftForCoupnToBeAppliable
      );

  useEffect(() => {
    setCanApplyCoupon(
      (prev) => fullPrice >= minReqAmount
    );
  }, [minReqAmount, fullPrice]);

  return (
    <article
      className={`group ${styles.container}`}
    >
      <section
        className={`${canApplyCoupon ? "group-hover:bg-[#93ffa91a]" : "group-hover:bg-[#12121215]"} ${styles.offerContainer}`}
      >
        <section
          className={styles.labelContainer}
        >
          <Image
            src={"/images/offer.webp"}
            alt={"Discount Icon"}
            width={25}
            height={25}
            className={
              canApplyCoupon ? "" : "grayscale"
            }
          />
          <span className={styles.label}>
            {couponLabel}
          </span>
        </section>
        <span
          className={`${canApplyCoupon ? "text-[#3ec976]" : "text-red-500"} ${styles.condition}`}
        >
          {couponDesc}
        </span>
        <section className={styles.actions}>
          <span className={styles.code}>
            {couponCode}
          </span>
          <span
            onClick={() =>
              setShowDetails((prev) => !prev)
            }
            className="text-[15px] text-slate-800 cursor-pointer transition-colors duration-300 hover:underline hover:underline-offset-2"
          >
            {showDetails
              ? "Collapse"
              : "See Details"}
          </span>
        </section>
        {showDetails ? (
          <section className="text-[15px] pt-[6px]">
            <span
              dangerouslySetInnerHTML={{
                __html: (couponDetails || "")
                  .split("\n")
                  .map((str) => `• ${str}`)
                  .join("<br/>")
              }}
            />
          </section>
        ) : (
          <></>
        )}
      </section>
      <div
        className={`${canApplyCoupon ? "cursor-pointer bg-[#bfffc06a] text-[#1c9550] group-hover:bg-[#3ec976]" : "cursor-default bg-[#12121215] text-[#12121299] group-hover:bg-[#595959]"} ${styles.applyButton}`}
        onClick={() => {
          if (canApplyCoupon) {
            closeDialog((prev) => false);
            setCurrCoupon(coupon);
          }
        }}
      >
        <span>
          {canApplyCoupon
            ? "click to apply"
            : "not applicable"}
        </span>
      </div>
    </article>
  );
}
