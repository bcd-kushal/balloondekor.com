import { SetStateAction } from "react";
import {
  CartDetailsType,
  NavigationType,
  PaymentPercentageType,
  PriceDetailsType
} from "../../../static/types";
import CheckoutOrderDetails from "./checkoutSummary/CheckoutOrderDetails";
import CheckoutPaymentSummary from "./checkoutSummary/CheckoutPaymentSummary";
import CheckoutPaymentOption from "./checkoutSummary/CheckoutPaymentOption";

export default function CheckoutSummary({
  cartDetails,
  priceDetails,
  isDisabled,
  billId,
  platformFee,
  handleNavigation,
  couponApplicable,
  paymentPercentage,
  advancePayPercent,
  setCouponApplicable,
  setPaymentPercentage
}: {
  cartDetails: CartDetailsType[];
  priceDetails: PriceDetailsType | undefined;
  isDisabled: boolean;
  billId: string;
  platformFee: number;
  handleNavigation: NavigationType;
  couponApplicable: boolean;
  paymentPercentage: PaymentPercentageType;
  advancePayPercent: number;
  setCouponApplicable: React.Dispatch<
    SetStateAction<boolean>
  >;
  setPaymentPercentage: React.Dispatch<
    SetStateAction<PaymentPercentageType>
  >;
}) {
  return (
    <div className="sm:w-[40%] min-[1199px]:w-[480px] flex flex-col items-stretch justify-start pt-8 sm:pl-0 max-sm:pr-0 max-[1199px]:pr-[10px]">
      <CheckoutPaymentSummary
        priceDetails={priceDetails}
        platformFee={platformFee}
        paymentPercentage={paymentPercentage}
        billId={billId}
      />
      <CheckoutPaymentOption
        handleNavigation={handleNavigation}
        priceDetails={priceDetails}
        isDisabled={isDisabled}
        couponApplicable={couponApplicable}
        paymentPercentage={paymentPercentage}
        advancePayPercent={advancePayPercent}
        display="forPC"
        setCouponApplicable={setCouponApplicable}
        setPaymentPercentage={
          setPaymentPercentage
        }
      />
      <CheckoutOrderDetails
        cartDetails={cartDetails}
      />
    </div>
  );
}

const Seperator = () => {
  return <div className="h-8 w-full"></div>;
};
