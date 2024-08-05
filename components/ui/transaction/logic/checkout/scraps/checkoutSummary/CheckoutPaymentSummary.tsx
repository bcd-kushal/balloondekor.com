import { COUPON_NOT_APPLICABLE_LABEL } from "@/components/ui/transaction/static/constants";
import {
  PaymentPercentageType,
  PriceDetailsType
} from "@/components/ui/transaction/static/types";

export default function CheckoutPaymentSummary({
  priceDetails,
  platformFee,
  paymentPercentage,
  billId
}: {
  priceDetails: PriceDetailsType | undefined;
  platformFee: number;
  paymentPercentage: PaymentPercentageType;
  billId: string;
}) {
  return (
    <>
      <span className="capitalize text-[22px]  py-2 px-[14px] sm:pl-[20px]">
        Payment Summary
      </span>
      <section
        id={billId}
        className="flex flex-col items-stretch justify-start gap-4 rounded-lg sm:rounded-xl p-[14px] sm:p-[18px] mt-4 max-sm:mx-[12px] sm:ml-[20px] text-[18px]"
        style={{
          boxShadow: "0 0 10px 5px #12121215"
        }}
      >
        <div className="flex items-center justify-between max-sm:text-[17px]">
          <span>Base total</span>
          {priceDetails ? (
            <span>
              ₹{" "}
              {
                priceDetails.basePrices.baseTotal
                  .amount
              }
            </span>
          ) : (
            <span className="text-zinc-700 animate-pulse">
              Loading
            </span>
          )}
        </div>

        <div className="flex items-center justify-between max-sm:text-[17px]">
          <span>Addon total</span>
          {priceDetails ? (
            <span>
              ₹{" "}
              {
                priceDetails.basePrices.addonTotal
                  .amount
              }
            </span>
          ) : (
            <span className="text-zinc-700 animate-pulse">
              Loading
            </span>
          )}
        </div>

        <div
          className={`flex items-center justify-between max-sm:text-[17px] ${paymentPercentage.type === "full" ? "text-green-600" : "text-green-600"}`}
        >
          <span>Coupon discount</span>
          {priceDetails ? (
            <span
              className={
                paymentPercentage.type ===
                "partial"
                  ? "max-sm:text-[13px] text-[14px] py-1 px-3 bg-red-100 rounded-lg text-red-500"
                  : ""
              }
            >
              {paymentPercentage.type === "full"
                ? `- ₹ ${priceDetails.coupon.amount}`
                : COUPON_NOT_APPLICABLE_LABEL}
            </span>
          ) : (
            <span className="text-zinc-700 animate-pulse">
              Loading
            </span>
          )}
        </div>

        <div className="flex items-center justify-between max-sm:text-[17px]">
          <span>Platform fees</span>
          <span>₹ {platformFee}</span>
        </div>

        <span className=" w-full my-3 h-[1px] bg-black/30 left-1/2 -translate-x-1/2 relative"></span>

        {paymentPercentage.type === "partial" ? (
          <div className="flex items-center justify-between max-sm:text-[17px]">
            <span>Total amount</span>
            {priceDetails ? (
              <span>
                ₹{" "}
                {priceDetails.basePrices
                  .totalAmount.amount +
                  platformFee}
              </span>
            ) : (
              <span className="text-zinc-700 animate-pulse">
                Loading
              </span>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="flex items-center justify-between font-semibold max-sm:text-[17px]">
          <span>Amount to pay</span>
          {priceDetails ? (
            <span>
              ₹ {priceDetails.finalAmount.amount}
              {/* {paymentPercentage.type === "full"
                ? priceDetails.finalAmount.amount
                : Math.ceil(
                    priceDetails.finalAmount
                      .amount *
                      paymentPercentage.percentage
                  )} */}
            </span>
          ) : (
            <span className="text-zinc-700 animate-pulse">
              Loading
            </span>
          )}
        </div>

        {paymentPercentage.type === "partial" ? (
          <div className="flex items-center justify-between text-red-500 font-semibold max-sm:text-[17px]">
            <span>Amount due</span>
            {priceDetails ? (
              <span>
                ₹{" "}
                {priceDetails.basePrices.baseTotal
                  .amount -
                  Math.ceil(
                    priceDetails.basePrices
                      .baseTotal.amount *
                      paymentPercentage.percentage
                  )}
                {/* {priceDetails.finalAmount.amount -
                  Math.ceil(
                    priceDetails.finalAmount
                      .amount *
                      paymentPercentage.percentage
                  )} */}
              </span>
            ) : (
              <span className="text-zinc-700 animate-pulse">
                Loading
              </span>
            )}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
