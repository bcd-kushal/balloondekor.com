/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { useSettingsContext } from "@/hooks/useSettingsContext";

import AuthUIWrapper from "@/components/ui/auth/AuthUIWrapper";
import OTPAuth from "@/components/ui/auth/otp/OTPAuth";
import PasswordAuth from "@/components/ui/auth/password/PasswordAuth";
import WhatsappAuth from "./whatsapp/WhatsappAuth";
import { handleLeadData } from "./__leads__/handleLeadData";
import { CustomerDocument } from "@/schemas/cms/customer";
import { useCityContext } from "@/hooks/useCityContext";
import { LineItemDocument } from "@/schemas/cms/lineItem";

export default function Auth({
  showDialog,
  cart,
  isDialogClosed,
  onDialogClose,
  nextPage
}: {
  showDialog: boolean;
  cart?: Partial<LineItemDocument>[] | undefined;
  isDialogClosed: boolean;
  onDialogClose: () => void;
  nextPage?: () => void;
}) {
  const { auth } = useSettingsContext();
  const { currentCity } = useCityContext();

  const {
    status: {
      data: { isLoggedIn }
    },
    auth: {
      data: {
        otp: { mobileNumber },
        password: { mail }
      }
    }
  } = useCustomerContext();

  const [authMethod, setAuthMethod] = useState<
    "mail" | "otp" | "whatsapp"
  >("mail");

  // LEADS SPACE =====================================================================
  const [authComplete, setAuthComplete] =
    useState<boolean>(false);

  const [
    numberOrEmailEntered,
    setNumberOrEmailEntered
  ] = useState<{
    otp: boolean;
    mail: boolean;
    whatsapp: boolean;
  }>({
    otp: false,
    mail: false,
    whatsapp: false
  });

  const [leadData, setLeadData] =
    useState<string>("");

  useEffect(() => {
    if (mobileNumber) {
      setNumberOrEmailEntered({
        otp: authMethod === "otp",
        mail: false,
        whatsapp: authMethod === "whatsapp"
      });
      setLeadData(mobileNumber);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (mail) {
      setNumberOrEmailEntered({
        otp: false,
        mail: true,
        whatsapp: false
      });
      setLeadData(mail);
    }
  }, [mail]);

  useEffect(() => {
    if (
      !authComplete &&
      isDialogClosed &&
      (numberOrEmailEntered.mail ||
        numberOrEmailEntered.whatsapp ||
        numberOrEmailEntered.otp)
    ) {
      handleLeadData({
        cart: cart || undefined,
        mobile: leadData,
        city: currentCity || undefined,
        customerInfo: null,
        userStatus: "not-registered"
      });
      setNumberOrEmailEntered((prev) => ({
        mail: false,
        otp: false,
        whatsapp: false
      }));
      setAuthComplete((prev) => true);
    }
  }, [
    isDialogClosed
    // leadData,
    // numberOrEmailEntered,
    // authComplete
  ]);

  useEffect(() => {
    if (authComplete) {
      // remove this after 15s -------------
      setTimeout(
        () => setAuthComplete((prev) => false),
        15 * 1000
      );
    }
  }, [authComplete]);

  // =================================================================================

  useEffect(() => {
    if (auth) {
      setAuthMethod(auth.default);
    }
  }, [auth]);

  useEffect(() => {
    if (isLoggedIn) {
      onDialogClose();
    }
  }, [isLoggedIn]);

  return (
    <AuthUIWrapper
      showDialog={showDialog}
      onDialogClose={onDialogClose}
    >
      {authMethod === "mail" ? (
        <PasswordAuth
          onDialogClose={onDialogClose}
          onChangeAuthMethod={setAuthMethod}
          nextPage={nextPage}
        />
      ) : authMethod === "otp" ? (
        <OTPAuth
          onDialogClose={onDialogClose}
          onChangeAuthMethod={setAuthMethod}
          nextPage={nextPage}
        />
      ) : (
        <WhatsappAuth
          onDialogClose={onDialogClose}
          onChangeAuthMethod={setAuthMethod}
          nextPage={nextPage}
        />
      )}
    </AuthUIWrapper>
  );
}
