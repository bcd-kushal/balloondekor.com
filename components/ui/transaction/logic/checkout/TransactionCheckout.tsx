import {
  useEffect,
  useId,
  useState
} from "react";
import {
  CheckoutFormDataType,
  FormValidtyType,
  TransactionCheckoutType
} from "../../static/types";
import CheckoutFormField from "./scraps/CheckoutFormField";
import CheckoutSummary from "./scraps/CheckoutSummary";
import { REGEX_TEST } from "../../static/regex";
import CheckoutPaymentOption from "./scraps/checkoutSummary/CheckoutPaymentOption";

/* 
.
defaultValues are commented out
dont delete it 
.
*/

export default function TransactionCheckout({
  contextInitialData,
  handleNavigation,
  cartDetails,
  currentCity,
  platformFee,
  venues,
  occasions,
  overallPriceDetails,
  couponApplicable,
  advancePayPercent,
  paymentPercentage,
  formData,
  customerInfo,
  setFormData,
  setPaymentPercentage,
  setCouponApplicable
}: TransactionCheckoutType) {
  const [payBtnDisabled, setPayBtnDisabled] =
    useState<boolean>(
      formValidation(formData).overallInvalid
    );
  const [showBill, setShowBill] =
    useState<boolean>(false);

  const checkoutBillId = useId();

  useEffect(() => {
    if (showBill) {
      const bill = document.getElementById(
        checkoutBillId
      );
      bill?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });

      setShowBill((prev) => false);
    }
  }, [showBill, checkoutBillId]);

  useEffect(() => {
    setPayBtnDisabled(
      (prev) =>
        formValidation(formData).overallInvalid
    );
  }, [formData]);

  return (
    <>
      <CheckoutFormField
        formData={formData}
        validations={
          formValidation(formData).distinct
        }
        initialContextData={contextInitialData}
        venues={venues}
        occasions={occasions}
        currentCity={currentCity}
        customerInfo={customerInfo}
        setFormData={setFormData}
      />
      <CheckoutSummary
        cartDetails={cartDetails}
        priceDetails={overallPriceDetails}
        isDisabled={payBtnDisabled}
        platformFee={platformFee}
        handleNavigation={handleNavigation}
        couponApplicable={couponApplicable}
        advancePayPercent={advancePayPercent}
        paymentPercentage={paymentPercentage}
        billId={checkoutBillId}
        setCouponApplicable={setCouponApplicable}
        setPaymentPercentage={
          setPaymentPercentage
        }
      />

      {/* ====[ PAYMENT BUTTON FOR MOBILE LAYOUT ]============================================= */}
      <CheckoutPaymentOption
        handleNavigation={handleNavigation}
        priceDetails={overallPriceDetails}
        isDisabled={payBtnDisabled}
        couponApplicable={couponApplicable}
        paymentPercentage={paymentPercentage}
        advancePayPercent={advancePayPercent}
        display="forMobile"
        setCouponApplicable={setCouponApplicable}
        setPaymentPercentage={
          setPaymentPercentage
        }
        showBill={() =>
          setShowBill((prev) => true)
        }
      />
    </>
  );
}

export function formValidation(
  formData: CheckoutFormDataType
): FormValidtyType {
  const validString = (
    str: string | undefined | null
  ): boolean =>
    str === undefined
      ? false
      : str && str.length > 0
        ? true
        : false;

  const validName =
    validString(formData.name) &&
    REGEX_TEST.NAME.test(formData.name);
  const validAddress = validString(
    formData.address
  );
  const validEmail =
    validString(formData.email) &&
    REGEX_TEST.EMAIL.test(formData.email);
  const validPincode =
    validString(formData.pincode) &&
    Number(formData.pincode) > 0 &&
    String(formData.pincode).length === 6;
  const validCity = validString(formData.city);
  const validMobile =
    validString(formData.mobile) &&
    Number(formData.mobile) > 0 &&
    formData.mobile.length === 10;
  const validOccasion =
    validString(formData.occasion._id) &&
    validString(formData.occasion.name);
  const validVenue =
    validString(formData.venue._id) &&
    validString(formData.venue.venue);

  return {
    overallInvalid: !(
      (
        validAddress &&
        validCity &&
        validEmail &&
        validMobile &&
        validName &&
        validPincode
      )
      // validOccasion &&
      // validVenue
    ),
    distinct: {
      validAddress,
      validCity,
      validEmail,
      validMobile,
      validName,
      validOccasion,
      validPincode,
      validVenue
    }
  };
}
