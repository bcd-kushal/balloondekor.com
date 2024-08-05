/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import GoogleSVG from "@/public/icons/google.svg";
import OTPSVG from "@/public/icons/otp.svg";

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

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

import { REGEX_TEST } from "@/components/ui/transaction/static/regex";

import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { WhatsappSVG } from "@/constants/svgs/svg";

export default function CheckMail({
  mail,
  setMail,
  // setUserSubmittedMobile,
  onChangeAuthMethod
}: {
  mail: string;
  setMail: (newMail: string) => void;
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
        password: { registrationStatus }
      },
      action: {
        password: { checkRegistrationStatus },
        google: { login }
      }
    }
  } = useCustomerContext();

  const { scrollNext } = useCarousel();

  const [isBtnDisabled, setIsBtnDisabled] =
    useState<boolean>(true);

  const [showOTP, setShowOTP] =
    useState<boolean>(true);
  const [showWhatsapp, setShowWhatsapp] =
    useState<boolean>(true);
  const [showGoogle, setShowGoogle] =
    useState<boolean>(true);
  const [totalActiveExtra, setTotalActiveExtra] =
    useState<number>(3);

  const handleCheckRegistration = () => {
    if (mail && REGEX_TEST.EMAIL.test(mail)) {
      checkRegistrationStatus(mail);
    }
  };

  const handleChangeMail = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setMail(value.toString());
  };

  useEffect(() => {
    if (auth) {
      setShowOTP(auth.methods.otp);
      setShowWhatsapp(auth.methods.whatsapp);
      setShowGoogle(auth.methods.google);
    }
  }, [auth]);

  useEffect(() => {
    setIsBtnDisabled(
      !mail || !REGEX_TEST.EMAIL.test(mail)
    );
  }, [mail]);

  useEffect(() => {
    const b = (state: boolean): 1 | 0 =>
      state ? 1 : 0;
    setTotalActiveExtra(
      (prev) =>
        b(showGoogle) +
        b(showOTP) +
        b(showWhatsapp)
    );
  }, [showGoogle, showOTP, showWhatsapp]);

  useEffect(() => {
    if (registrationStatus !== "unchecked") {
      setTimeout(() => {
        scrollNext();
        // setUserSubmittedMobile(true);
      }, 1);
    }
  }, [registrationStatus]);

  return (
    <CarouselItem className="h-full flex flex-col justify-between gap-12 sm:gap-8">
      <CardContent className="p-0 px-1 text-[16px] flex flex-col items-stretch justify-start">
        <label
          htmlFor="mobileNo"
          className="text-[15px] sm:text-[15px] font-base hidden"
        >
          Email
        </label>
        <div className="tracking-wide flex items-center gap-2 justify-between pb-2 sm:pb-3 sm:pt-1 border-black/30 border-b-[1.5px] transition-all duration-300  hover:border-black/70 focus-within:border-[#cd378c] hover:focus-within:border-[#cd378c] max-sm:mt-[7px]">
          {/* <span className="w-fit whitespace-nowrap text-[18px]">
            + 91 &nbsp; -
          </span> */}
          <input
            type="email"
            name="mail"
            title="mail"
            className="mt-[15px] outline-none w-full text-[18px] appearance-none tracking-wider"
            value={mail || ""}
            onChange={handleChangeMail}
            placeholder="Enter Email"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-[10px] p-0 max-sm:max-w-[calc(100dvw_-_44px)]">
        <Button
          className="flex items-center justify-center gap-[10px] w-full h-[45px] sm:h-[4rem] text-[1.8rem] sm:text-[1.5rem] tracking-wider bg-[#cd378c] hover:bg-[#8d2b63] transition-all duration-300 rounded-xl"
          onClick={handleCheckRegistration}
          disabled={
            isBtnDisabled || isCustomerLoading
          }
        >
          {isCustomerLoading ? (
            <UpdateIcon
              width={17}
              height={17}
              className="animate-spin"
            />
          ) : (
            <></>
          )}
          <span>Proceed</span>
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
              {showOTP ? (
                <div
                  className="cursor-pointer  flex items-center justify-center gap-[8px] border-[1.5px] border-slate-100 sm:border-zinc-200/95 px-[14px] py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15"
                  onClick={() => {
                    onChangeAuthMethod("otp");
                  }}
                  style={{
                    boxShadow:
                      "0 0 10px 5px #12121210"
                  }}
                >
                  <span>OTP</span>
                </div>
              ) : (
                <></>
              )}
              {showGoogle ? (
                <div
                  className={`cursor-pointer flex items-center justify-center gap-[8px] border-[1.5px] border-zinc-100 sm:border-zinc-200/95 px-[14px] py-[10px] sm:py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15`}
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
              {showWhatsapp ? (
                <div
                  className={`cursor-pointer ${totalActiveExtra === 3 ? "col-span-2" : ""}  flex items-center justify-center gap-[5px] border-[1.5px] border-zinc-100 sm:border-zinc-200/95 px-[14px] py-[10px] sm:py-[7px] rounded-xl text-center transition-colors duration-300 hover:border-black/15`}
                  onClick={() => {
                    onChangeAuthMethod(
                      "whatsapp"
                    );
                  }}
                  style={{
                    boxShadow:
                      "0 0 10px .7px #12121210"
                  }}
                >
                  <WhatsappSVG
                    dimensions={23}
                    stroke="#25D366"
                  />
                  <span>WhatsApp</span>
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
