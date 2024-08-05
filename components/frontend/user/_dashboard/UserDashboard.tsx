/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams
} from "next/navigation";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { Loader2SVG } from "@/constants/svgs/svg";
import LinkList, {
  LinksOnMobile
} from "../LinkList";
import ChangePassword from "../changePassword/ChangePassword";
import AccountSettings from "../accountSettings/AccountSettings";
import UserDashboardOrders from "../orders/UserDashboardOrders";
import { emptyPageTitles } from "./utils/constants";
import MissingFields from "../missingFields/MissingFields";

export default function UserDashboard() {
  const { push } = useRouter();

  const queryParams = useSearchParams();
  const tab = queryParams.get("tab");

  const {
    status: {
      data: {
        isLoggedIn,
        isCustomerReady,
        isCustomerInfoReady
      }
    },
    customer: {
      data: { info }
    }
  } = useCustomerContext();

  const [showDialog, setShowDialog] =
    useState<boolean>(false);

  const [activeIndex, setActiveIndex] =
    useState<number>(
      tab === "orders"
        ? 1
        : tab === "change-password"
          ? 2
          : 0
    );

  const [userLoggedIn, setUserLoggedIn] =
    useState<boolean>(false);
  const [reset, setReset] =
    useState<boolean>(false);

  const redirectOnNotLogin = () => {
    if (isCustomerReady && !isLoggedIn) {
      push("/");
    }
  };

  useEffect(() => {
    redirectOnNotLogin();
  }, []);

  useEffect(() => {
    redirectOnNotLogin();

    if (isLoggedIn && isCustomerReady) {
      setUserLoggedIn((prev) => true);
    } else {
      setUserLoggedIn((prev) => false);
    }
  }, [isCustomerReady, isLoggedIn]);

  useEffect(() => {
    if (isCustomerInfoReady) {
      if (
        info &&
        (!info?.name ||
          !info.mobileNumber ||
          !info?.mail ||
          !info?.password)
      ) {
        setShowDialog(true);
      } else {
        setShowDialog(false);
      }
    }
  }, [info]);

  return !isLoggedIn || !isCustomerInfoReady ? (
    <EmptyScreenLoader />
  ) : (
    <>
      <MissingFields
        openDialog={showDialog}
        onChangeOpenDialog={setShowDialog}
        onReset={() => {
          setReset(true);
        }}
      />
      <main className="relative sm:grid sm:grid-cols-[230px_auto] text-[17px] mt-2 mb-8">
        <LinkList
          index={activeIndex}
          setIndex={setActiveIndex}
        />
        <LinksOnMobile
          index={activeIndex}
          setIndex={setActiveIndex}
        />
        <div className="px-[12px] max-sm:pt-[8px] pt-[3px] max-sm:pb-[32px] sm:pl-[22px] mt-[10px] min-h-screen sm:min-h-[65dvh]">
          <h2 className="text-[20px] sm:text-[24px] font-semibold mb-[12px] bg-green">
            {
              emptyPageTitles.find(
                ({ index }) =>
                  index === activeIndex
              )!.title
            }
          </h2>
          {activeIndex === 0 ? (
            <AccountSettings
              reset={reset}
              onResetReset={() => {
                setReset(false);
              }}
            />
          ) : activeIndex === 1 ? (
            <UserDashboardOrders
              userLoggedIn={userLoggedIn}
            />
          ) : (
            <ChangePassword />
          )}
        </div>
      </main>
    </>
  );
}

function EmptyScreenLoader() {
  return (
    <span className="w-full h-[calc(100dvh_-_175px)] md:h-[486px] flex flex-col col-span-3 items-center justify-center gap-4 animate-pulse">
      <Loader2SVG
        dimensions={32}
        className="animate-spin"
      />
      <span className="max-md:text-[14px]">
        Checking your details
      </span>
    </span>
  );
}
