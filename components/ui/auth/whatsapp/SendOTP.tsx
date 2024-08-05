/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import GoogleSVG from "@/public/icons/google.svg";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCustomerContext } from "@/hooks/useCustomerContext";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  CarouselItem,
  useCarousel
} from "@/components/ui/carousel";
import MobileNumberInput from "@/components/ui/auth/MobileNumberInput";

import { UpdateIcon } from "@radix-ui/react-icons";
import {
  CrossSVG,
  TickSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import { useSettingsContext } from "@/hooks/useSettingsContext";

export default function SendOTP({
  countryCode,
  mobileNo,
  onChangeCountryCode,
  onChangeMobileNo,
  // setUserSubmittedMobile,
  onChangeAuthMethod
}: {
  countryCode: string;
  mobileNo: string;
  onChangeCountryCode: (
    newCountryCode: string
  ) => void;
  onChangeMobileNo: (newMobileNo: string) => void;
  // setUserSubmittedMobile: (
  //   userSubmittedMobile: boolean
  // ) => void;
  onChangeAuthMethod: (
    newAuthMethod: "mail" | "otp" | "whatsapp"
  ) => void;
}) {
  const { auth } = useSettingsContext();

  const {
    status: {
      data: { isCustomerLoading }
    },
    auth: {
      data: {
        otp: { otpStatus }
      },
      action: {
        whatsapp: { sendOTP },
        google: { login }
      }
    }
  } = useCustomerContext();

  const { scrollNext } = useCarousel();

  const [isBtnDisabled, setIsBtnDisabled] =
    useState<boolean>(true);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] =
    useState<boolean>(false);

  const [showMail, setShowMail] =
    useState<boolean>(true);
  const [showOTP, setShowOTP] =
    useState<boolean>(true);
  const [showGoogle, setShowGoogle] =
    useState<boolean>(true);
  const [totalActiveExtra, setTotalActiveExtra] =
    useState<number>(3);

  const handleSendOTP = () => {
    if (
      countryCode &&
      mobileNo &&
      mobileNo.length === 10
    ) {
      sendOTP(`${countryCode}${mobileNo}`);
    }
  };

  useEffect(() => {
    if (auth) {
      setShowMail(auth.methods.mail);
      setShowOTP(auth.methods.otp);
      setShowGoogle(auth.methods.google);
    }
  }, [auth]);

  useEffect(() => {
    setIsBtnDisabled(
      Boolean(countryCode) &&
        mobileNo.length !== 10
    );
  }, [countryCode, mobileNo]);

  useEffect(() => {
    if (otpStatus) {
      setTimeout(() => {
        scrollNext();
        // setUserSubmittedMobile(true);
      }, 1);
    }
  }, [otpStatus]);

  useEffect(() => {
    const b = (state: boolean): 0 | 1 =>
      state ? 1 : 0;
    setTotalActiveExtra(
      (prev) =>
        b(showGoogle) + b(showMail) + b(showOTP)
    );
  }, [showGoogle, showMail, showOTP]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsLoading(false);
        setIsLoaded(false);
      }, 1000);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isCustomerLoading && !isLoading) {
      setIsLoading(true);
    }
    if (!isCustomerLoading && isLoading) {
      setIsLoaded(true);
    }
  }, [isCustomerLoading]);

  return (
    <CarouselItem className="h-full flex flex-col justify-between gap-12 sm:gap-8">
      <CardContent className="p-0 px-1 text-[16px] flex flex-col items-stretch justify-start pt-[17px]">
        <MobileNumberInput
          countryCode={countryCode}
          mobileNo={mobileNo}
          onChangeCountryCode={
            onChangeCountryCode
          }
          onChangeMobileNo={onChangeMobileNo}
          authType="whatsapp"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-[10px] p-0 max-sm:max-w-[calc(100dvw_-_44px)]">
        <Button
          // className="flex items-center justify-center gap-[10px] w-full h-[45px] sm:h-[4rem] text-[1.8rem] sm:text-[1.5rem] tracking-wider bg-[#cd378c] hover:bg-[#8d2b63] transition-all duration-300 rounded-xl"
          className="flex items-center justify-center gap-[10px] w-full h-[45px] sm:h-[4rem] text-[1.8rem] sm:text-[1.5rem] tracking-wider bg-[#25D366] hover:bg-[#2fa85b] transition-all duration-300 rounded-xl"
          onClick={handleSendOTP}
          disabled={
            isBtnDisabled || isCustomerLoading
          }
        >
          {isLoaded ? (
            otpStatus ? (
              <TickSVG dimensions={17} />
            ) : (
              <CrossSVG dimensions={17} />
            )
          ) : isCustomerLoading ? (
            <UpdateIcon
              width={17}
              height={17}
              className="animate-spin"
            />
          ) : (
            <span className="flex items-center justify-center gap-[6px]">
              <WhatsappSVG
                dimensions={23}
                stroke="#fff"
              />
              <span>Send OTP</span>
            </span>
          )}
        </Button>
        {totalActiveExtra > 0 ? (
          <>
            <section className="w-full flex items-center justify-stretch gap-[20px] text-[14px] mt-[12px] mb-[8px] text-black/40">
              <div className="grid grid-rows-2 w-full">
                <span></span>
                <span className="border-t-[1px] border-black/40"></span>
              </div>
              <div className="w-fit whitespace-nowrap">
                or login via
              </div>
              <div className="grid grid-rows-2 w-full">
                <span></span>
                <span className="border-t-[1px] border-black/40"></span>
              </div>
            </section>

            <section
              className={`${totalActiveExtra === 2 ? "grid grid-cols-2 gap-[15px]" : totalActiveExtra === 3 ? "grid grid-cols-2 grid-rows-2 gap-[8px] sm:gap-[10px]" : "grid grid-cols-1"} w-full text-[15px] px-[6px] pb-[15px]`}
            >
              {showMail ? (
                <div
                  className="cursor-pointer  flex items-center justify-center gap-[8px] border-[1.5px] border-zinc-100 sm:border-zinc-200/95 px-[14px] py-[10px] sm:py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15"
                  onClick={() => {
                    onChangeAuthMethod("mail");
                  }}
                  style={{
                    boxShadow:
                      "0 0 10px .7px #12121210"
                  }}
                >
                  <span>Email</span>
                </div>
              ) : (
                <></>
              )}
              {showOTP ? (
                <div
                  className="cursor-pointer  flex items-center justify-center gap-[8px] border-[1.5px] border-zinc-100 sm:border-zinc-200/95 px-[14px] py-[10px] sm:py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15"
                  onClick={() => {
                    onChangeAuthMethod("otp");
                  }}
                  style={{
                    boxShadow:
                      "0 0 10px .7px #12121210"
                  }}
                >
                  <span>OTP</span>
                </div>
              ) : (
                <></>
              )}
              {showGoogle ? (
                <div
                  className={`cursor-pointer ${totalActiveExtra === 3 ? "col-span-2" : ""} flex items-center justify-center gap-[8px] border-[1.5px] border-zinc-100 sm:border-zinc-200/95 px-[14px] py-[10px] sm:py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15`}
                  onClick={login}
                  style={{
                    boxShadow:
                      "0 0 10px .7px #12121210"
                  }}
                >
                  <Image
                    src={GoogleSVG}
                    width={15}
                    height={15}
                    unoptimized
                    priority
                    alt="Google"
                  />
                  <span>Google</span>
                </div>
              ) : (
                <></>
              )}
            </section>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </CarouselItem>
  );
}
