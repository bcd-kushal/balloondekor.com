import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import {
  NavigationType,
  PaymentPercentageType,
  PriceDetailsType
} from "@/components/ui/transaction/static/types";
import styles from "../../../../static/styles/bookNowBtn.module.css";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { BUY_BTN_LABEL } from "@/components/ui/transaction/static/constants";
import { useStatusContext } from "@/hooks/useStatusContext";

export default function CheckoutPaymentOption({
  handleNavigation,
  priceDetails,
  isDisabled,
  couponApplicable,
  paymentPercentage,
  advancePayPercent,
  display,
  setCouponApplicable,
  setPaymentPercentage,
  showBill
}: {
  handleNavigation: NavigationType;
  priceDetails: PriceDetailsType | undefined;
  isDisabled: boolean;
  couponApplicable: boolean;
  paymentPercentage: PaymentPercentageType;
  advancePayPercent: number;
  display: "forPC" | "forMobile";
  setCouponApplicable: React.Dispatch<
    SetStateAction<boolean>
  >;
  setPaymentPercentage: React.Dispatch<
    SetStateAction<PaymentPercentageType>
  >;
  showBill?: () => void;
}) {
  const { addStatus } = useStatusContext();

  const [paymentOption, setPaymentOption] =
    useState<"partial" | "full">(
      couponApplicable ? "full" : "partial"
    );
  const partialPaymentPercentage =
    advancePayPercent;
  const partialPaymentPercentageString = `${partialPaymentPercentage}%`;
  const [
    showConfirmDialog,
    setShowConfirmDialog
  ] = useState<boolean>(false);

  useEffect(() => {
    setCouponApplicable((prev) =>
      paymentOption === "full" ? true : false
    );
    setPaymentPercentage((prev) =>
      paymentOption === "full"
        ? { percentage: 1, type: "full" }
        : {
            percentage:
              partialPaymentPercentage / 100,
            type: "partial"
          }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentOption]);

  return (
    <>
      <section
        className={
          display === "forPC"
            ? `w-full flex flex-col items-stretch justify-start gap-0 mt-8 pb-4 sm:pb-6 sm:pl-[20px] sm:pr-0 px-[14px] max-sm:hidden`
            : `w-full flex flex-col items-stretch justify-start gap-0 max-sm:pt-1 pb-4 sm:hidden px-[14px] max-sm:border-t-[1px] max-sm:border-t-[#12121290] max-sm:sticky max-sm:bottom-0 bg-white`
        }
      >
        {partialPaymentPercentage === 100 ? (
          <div
            className={` flex flex-col-reverse sm:flex-row-reverse items-center justify-between relative gap-0 sm:gap-14 `}
          >
            <ProceedButton
              handleNavigation={handleNavigation}
              isDisabled={isDisabled}
              priceDetails={priceDetails}
              paymentPercentage={
                paymentPercentage
              }
              showAmount={false}
            />
            <div className="flex sm:hidden items-center justify-between w-full my-2.5">
              <ScrollToBill
                showBill={showBill}
                textSize="[12px]"
              />
              <span className="font-semibold">
                Amount: ₹{" "}
                {/* {paymentPercentage.type === "full"
                  ? priceDetails?.finalAmount
                      .amount
                  : Math.ceil(
                      paymentPercentage.percentage *
                        priceDetails!.finalAmount
                          .amount
                    )} */}
                {priceDetails?.finalAmount.amount}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={` flex flex-col-reverse sm:flex-row-reverse items-center justify-between relative gap-0 sm:gap-14 `}
          >
            {/* ------------------------[[ SELECT 50/100 PAYMENT OPTION ]]---------------------------- */}
            <ProceedButton
              handleNavigation={handleNavigation}
              isDisabled={isDisabled}
              priceDetails={priceDetails}
              paymentPercentage={
                paymentPercentage
              }
              showAmount
            />
            <div className="flex flex-col-reverse gap-1 justify-center max-sm:pb-4 max-sm:pt-2">
              {/* PARTIAL / FULL SELECTION ---------------------------- */}

              <div className="flex items-center max-sm:justify-between max-sm:w-screen max-sm:pl-[14px] max-sm:pr-[16px]">
                <span className="flex flex-col items-start justify-center sm:hidden text-[16px]">
                  <span>Payment options</span>
                  <ScrollToBill
                    showBill={showBill}
                    textSize="[12px]"
                  />
                </span>
                <div className="flex items-center justify-between sm:justify-end gap-12 sm:gap-8">
                  <span
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                      setShowConfirmDialog(
                        (prev) => true
                      )
                    }
                  >
                    <div
                      className={`rounded-full aspect-square cursor-pointer ml-[2px]  ${paymentOption === "partial" ? "bg-green-400 w-3 h-3 ring-[1.5px] ring-offset-2 ring-green-400" : "bg-zinc-300 w-5 h-5"}`}
                    />
                    <span className="text-[16px] sm:text-[18px]">
                      {
                        partialPaymentPercentageString
                      }
                    </span>
                  </span>
                  <span
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                      setPaymentOption(
                        (prev) => "full"
                      )
                    }
                  >
                    <div
                      className={`rounded-full aspect-square cursor-pointer  ${paymentOption === "full" ? "bg-green-400 w-3 h-3 ring-[1.5px] ring-offset-2 ring-green-400" : "bg-zinc-300 w-5 h-5"}`}
                    />
                    <span className="text-[16px] sm:text-[18px]">
                      100%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Dialog
        open={showConfirmDialog}
        onOpenChange={() =>
          setShowConfirmDialog((prev) => !prev)
        }
      >
        <DialogContent className="min-w-fit p-0 bg-transparent outline-none focus:outline-none border-none">
          <div className="w-[290px] sm:w-[350px] bg-white p-9 pt-10 rounded-2xl flex flex-col items-stretch justify-start gap-3 text-[16px]">
            <span className="text-[24px] font-medium">
              {partialPaymentPercentageString}
            </span>
            <span className="text-zinc-700">
              Coupon not applicable for{" "}
              {partialPaymentPercentageString}{" "}
              payment. Sure to proceed?
            </span>
            <div className="flex items-center justify-between gap-4 *:cursor-pointer *:rounded-lg *:px-[24px] *:py-3 mt-8 mb-2">
              <span
                className="border-[1.5px] border-zinc-700 text-zinc-700 hover:bg-zinc-200 transition-all duration-300"
                onClick={() => {
                  setShowConfirmDialog(
                    (prev) => false
                  );
                }}
              >
                Cancel
              </span>
              <span
                className="border-[1.5px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                onClick={() => {
                  setPaymentOption(
                    (prev) => "partial"
                  );
                  setShowConfirmDialog(
                    (prev) => false
                  );
                }}
              >
                Proceed
              </span>
            </div>
            <span className="px-[14px] py-[4px] text-[15px] mt-[8px] text-center rounded-xl bg-amber-100 text-amber-900">
              <strong>Note:</strong>{" "}
              {partialPaymentPercentageString}{" "}
              advance only applicable on Base
              Amount
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const ProceedButton = ({
  isDisabled,
  handleNavigation,
  paymentPercentage,
  priceDetails,
  showAmount
}: {
  isDisabled: boolean;
  handleNavigation: NavigationType;
  priceDetails: PriceDetailsType | undefined;
  paymentPercentage: PaymentPercentageType;
  showAmount: boolean;
}) => {
  const { addStatus } = useStatusContext();
  return (
    <span className="text-[19px] w-full ">
      {/* BOOK NOW BTN ------------------ */}
      <div
        className={
          !isDisabled
            ? styles.buyBtn
            : styles.disabledBtn
        }
        onClick={() => {
          if (!isDisabled)
            handleNavigation.goForward();
          else
            addStatus([
              {
                message:
                  "All required fields not completed",
                type: "warning"
              }
            ]);
        }}
      >
        {BUY_BTN_LABEL[1]}
        {showAmount ? (
          <span className="tracking-wider">
            {" "}
            ₹
            {/* {paymentPercentage.type === "full"
              ? priceDetails?.finalAmount.amount
              : Math.ceil(
                  paymentPercentage.percentage *
                    priceDetails!.finalAmount
                      .amount
                )} */}
            {priceDetails?.finalAmount.amount ||
              0}
          </span>
        ) : (
          <></>
        )}
      </div>
    </span>
  );
};

const ScrollToBill = ({
  showBill,
  textSize
}: {
  showBill: (() => void) | undefined;
  textSize: string;
}) => {
  return (
    <span
      className={`leading-tight text-blue-700 underline text-${textSize}`}
      onClick={showBill ? showBill : () => {}}
    >
      View Bill*
    </span>
  );
};
