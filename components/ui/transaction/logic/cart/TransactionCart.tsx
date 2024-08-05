export const fetchCache = "default-cache";

import { BUY_BTN_LABEL } from "../../static/constants";
import {
  CartDetailsType,
  CouponType,
  EditAddonType,
  EditCartServiceDateTimeType,
  HandleDeletionType,
  HandleInstructionManagementType,
  HandleQuantityType,
  NavigationType,
  PriceDetailsType
} from "../../static/types";
import CartServiceList from "./scraps/CartServiceList";
import CartTotalSummary from "./scraps/CartTotalSummary";
import styles from "../../static/styles/bookNowBtn.module.css";
import {
  useEffect,
  useId,
  useState
} from "react";

export default function TransactionCart({
  cartDetails,
  finalPrice,
  priceDetails,
  platformFee,
  currCoupon,
  couponList,
  handleNavigation,
  handleDelete,
  setQuantity,
  editDateTime,
  cartLoading,
  handleSetInstruction,
  editAddons,
  setCurrCoupon
}: {
  cartDetails: CartDetailsType[];
  finalPrice: number;
  priceDetails: PriceDetailsType;
  platformFee: number;
  currCoupon: CouponType | undefined;
  couponList: CouponType[];
  handleNavigation: NavigationType;
  handleDelete: HandleDeletionType;
  setQuantity: HandleQuantityType;
  editDateTime: EditCartServiceDateTimeType;
  cartLoading: boolean;
  handleSetInstruction: HandleInstructionManagementType;
  editAddons: EditAddonType;
  setCurrCoupon: (
    newCoupon: CouponType | undefined
  ) => void;
}) {
  const summaryId = useId();
  const [showSummary, setShowSummary] =
    useState<boolean>(false);

  useEffect(() => {
    if (showSummary) {
      const summary =
        document.getElementById(summaryId);
      console.log({ summary });
      summary?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });

      setShowSummary((prev) => false);
    }
  }, [showSummary, summaryId]);

  return (
    <>
      {/* ==================== LEFT SIDE CART ITEMS ================================================== */}
      <CartServiceList
        cartDetails={cartDetails}
        setQuantity={setQuantity}
        handleDelete={handleDelete}
        editDateTime={editDateTime}
        cartLoading={cartLoading}
        setInstruction={handleSetInstruction}
        editAddons={editAddons}
      />

      {/* ==================== RIGHT SIDE TOTAL SUMMARY ================================================== */}
      <CartTotalSummary
        priceDetails={priceDetails}
        finalPrice={finalPrice}
        platformFee={platformFee}
        handleNavigation={handleNavigation}
        currCoupon={currCoupon}
        couponList={couponList}
        emptyCart={cartDetails.length === 0}
        summaryId={summaryId}
        setCurrCoupon={setCurrCoupon}
      />

      {/* ==================== CHECKOUT BUTTON FOR MOBILE ==================================================== */}
      {cartDetails.length === 0 ? (
        <></>
      ) : (
        <div className="sm:hidden sticky flex flex-col items-stretch justify-end gap-3 bottom-0 px-[12px] pb-[10px] pt-[7px] bg-white border-t-[1.5px] border-zinc-400">
          <div className="flex items-baseline justify-between text-[16.5px] px-1 pt-2 font-semibold">
            <span
              className="text-blue-700 underline text-[13px] cursor-pointer font-normal"
              onClick={() =>
                setShowSummary((prev) => true)
              }
            >
              View Summary*
            </span>
            <span>Amount: ₹ {finalPrice}</span>
          </div>
          <div
            className={styles.buyBtn}
            onClick={() =>
              handleNavigation.goForward()
            }
          >
            {BUY_BTN_LABEL[0]}
          </div>
        </div>
      )}
    </>
  );
}
