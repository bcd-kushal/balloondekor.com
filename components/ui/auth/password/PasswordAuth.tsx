"use client";

import React, {
  // useEffect,
  useState
} from "react";

// import { useCityContext } from "@/hooks/useCityContext";
import { useCustomerContext } from "@/hooks/useCustomerContext";

import CheckMail from "@/components/ui/auth/password/CheckMail";
import Login from "@/components/ui/auth/password/Login";
import Register from "@/components/ui/auth/password/Register";

// import { handleLeadData } from "../__leads__/handleLeadData";

// import { LineItemDocument } from "@/schemas/cms/lineItem";

export default function PasswordAuth({
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
        password: { mail, registrationStatus }
      }
    }
    // customer: {
    //   data: { info: customerInfo }
    // }
  } = useCustomerContext();
  // const { currentCity } = useCityContext();

  // ========[ STATES ]=====================================
  const [email, setEmail] =
    useState<string>(mail);

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
  //       userStatus: mobileNumberStatus,
  //       customerInfo
  //     });
  //     setUserSubmittedMobile((prev) => false);
  //     setLoginPopupClosed((prev) => false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   loginPopupClosed,
  //   userSubmittedMobile,
  //   authComplete
  // ]);

  // // ========[ OTHER CLEANUPS ]=====================================
  // useEffect(() => {
  //   if (authComplete) {
  //     setTimeout(
  //       () => setAuthComplete((prev) => false),
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
      <CheckMail
        mail={email}
        setMail={setEmail}
        // setUserSubmittedMobile={
        //   setUserSubmittedMobile
        // }
        onChangeAuthMethod={onChangeAuthMethod}
      />
      {registrationStatus === "registered" ? (
        <Login
          onDialogClose={onDialogClose}
          nextPage={nextPage}
          // setAuthComplete={setAuthComplete}
        />
      ) : (
        <Register
          onDialogClose={onDialogClose}
          nextPage={nextPage}
          // setAuthComplete={setAuthComplete}
        />
      )}
      {/* </AuthUIWrapper> */}
    </>
  );
}
