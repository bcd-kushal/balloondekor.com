import Coupon from "@/components/ui/service/info/Offer";

import styles from "@/components/ui/service/info/offersModal.module.css";
import {
  CouponType,
  PriceDetailsType
} from "../../transaction/static/types";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";

const sortCoupons = (
  coupons: CouponType[],
  totalAmount: number
): CouponType[] => {
  const applicableCoupons = coupons.filter(
    ({ minReqAmount }) =>
      minReqAmount === 0
        ? true
        : totalAmount >= minReqAmount
  );

  const nonApplicableCoupons = coupons.filter(
    ({ minReqAmount }) =>
      minReqAmount === 0
        ? false
        : totalAmount < minReqAmount
  );

  return [
    ...applicableCoupons,
    ...nonApplicableCoupons
  ];
};

export default function CouponsList({
  title,
  coupons,
  priceDetails,
  setCurrCoupon,
  closeDialog
}: {
  title: string;
  coupons: CouponType[];
  priceDetails: PriceDetailsType;
  setCurrCoupon: (newCoupon: CouponType) => void;
  closeDialog: React.Dispatch<
    SetStateAction<boolean>
  >;
}) {
  const [sortedCoupons, setSortedCoupons] =
    useState<CouponType[]>(
      sortCoupons(
        coupons,
        priceDetails.basePrices.totalAmount.amount
      )
    );

  useEffect(
    () =>
      setSortedCoupons((prev) =>
        sortCoupons(
          coupons,
          priceDetails.basePrices.totalAmount
            .amount
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coupons]
  );

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <div className={styles.heading}>
          {title}
        </div>
      </section>
      <section className={styles.offers}>
        {sortedCoupons.map((coupon, i) => (
          <Coupon
            key={i}
            coupon={coupon}
            priceDetails={priceDetails}
            setCurrCoupon={setCurrCoupon}
            closeDialog={closeDialog}
          />
        ))}
      </section>
    </section>
  );
}
