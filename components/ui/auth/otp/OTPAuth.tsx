/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState } from "react";

import { useCityContext } from "@/hooks/useCityContext";
import { useCustomerContext } from "@/hooks/useCustomerContext";

import AuthUIWrapper from "@/components/ui/auth/AuthUIWrapper";
import SendOTP from "@/components/ui/auth/otp/SendOTP";
import VerifyOTP from "./VerifyOTP";

import { handleLeadData } from "../__leads__/handleLeadData";

import { LineItemDocument } from "@/schemas/cms/lineItem";

export default function OTPAuth({
  // showDialog,
  // cart,
  onDialogClose,
  onChangeAuthMethod,
  nextPage
}: {
  // showDialog: boolean;
  // cart?: Partial<LineItemDocument>[];
  onDialogClose: () => void;
  onChangeAuthMethod: (
    newAuthMethod: "mail" | "otp" | "whatsapp"
  ) => void;
  nextPage?: () => void;
}) {
  // ========[ HOOKS ]=====================================
  const {
    auth: {
      data: {
        otp: { mobileNumber }
      }
    }
    // customer: {
    //   data: { info: customerInfo }
    // }
  } = useCustomerContext();
  // const { currentCity } = useCityContext();

  // ========[ STATES ]=====================================
  const [countryCode, setCountryCode] =
    useState<string>(
      mobileNumber.slice(0, 3) || "+91"
    );
  const [mobileNo, setMobileNo] =
    useState<string>(
      mobileNumber.slice(3, 13) || ""
    );

  // const [
  //   userSubmittedMobile,
  //   setUserSubmittedMobile
  // ] = useState<boolean>(false);

  // const [loginPopupClosed, setLoginPopupClosed] =
  //   useState<boolean>(false);

  // const [authComplete, setAuthComplete] =
  //   useState<boolean>(false);

  // // ========[ WHEN MOBILE IS FEEDED AND DIALOG CLOSED WITHOUT REGISTRATION ]=============
  // useEffect(() => {
  //   if (
  //     loginPopupClosed &&
  //     userSubmittedMobile &&
  //     !authComplete
  //   ) {
  //     handleLeadData({
  //       cart: cart,
  //       mobile: mobileNo,
  //       city: currentCity,
  //       userStatus: "unchecked",
  //       customerInfo
  //     });
  //     setUserSubmittedMobile(() => false);
  //     setLoginPopupClosed(() => false);
  //   }
  // }, [
  //   loginPopupClosed,
  //   userSubmittedMobile,
  //   authComplete
  // ]);

  // // ========[ OTHER CLEANUPS ]=====================================
  // useEffect(() => {
  //   if (authComplete) {
  //     setTimeout(
  //       () => setAuthComplete(() => false),
  //       15 * 1000
  //     );
  //   }
  // }, [authComplete]);

  return (
    <>
      {/* <AuthUIWrapper
      showDialog={showDialog}
      onDialogClose={() => {
        setLoginPopupClosed(() => true);
        onDialogClose();
      }}
      > */}
      <SendOTP
        countryCode={countryCode}
        mobileNo={mobileNo}
        onChangeCountryCode={setCountryCode}
        onChangeMobileNo={setMobileNo}
        // setUserSubmittedMobile={
        //   setUserSubmittedMobile
        // }
        onChangeAuthMethod={onChangeAuthMethod}
      />
      <VerifyOTP
        onDialogClose={onDialogClose}
        nextPage={nextPage}
        // setAuthComplete={setAuthComplete}
      />
      {/* </AuthUIWrapper> */}
    </>
  );
}
