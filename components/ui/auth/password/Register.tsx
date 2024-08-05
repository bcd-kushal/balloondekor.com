/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

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
import Input from "@/components/common/form/Input";
import { UpdateIcon } from "@radix-ui/react-icons";
import MobileNumberInput from "../MobileNumberInput";

export default function Register({
  onDialogClose,
  nextPage
  // setAuthComplete
}: {
  onDialogClose: () => void;
  nextPage?: () => void;
  // setAuthComplete: (
  //   newAuthComplete: boolean
  // ) => void;
}) {
  const {
    status: {
      data: { isLoggedIn, isCustomerLoading }
    },
    auth: {
      data: {
        password: { mail, registrationStatus }
      },
      action: {
        password: {
          resetRegistrationStatus:
            resetMobileNumberStatus,
          register
        }
      }
    }
  } = useCustomerContext();
  const { scrollPrev } = useCarousel();

  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  const [countryCode, setCountryCode] =
    useState<string>("+91");
  const [mobileNo, setMobileNo] =
    useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  // const [isClicked, setIsClicked] =
  //   useState<boolean>(false);

  const handleChangeMobileNumber = () => {
    // setIsClicked((prev) => false);
    resetMobileNumberStatus();
    scrollPrev();
  };

  const handleRegister = () => {
    if (
      Boolean(countryCode) &&
      Boolean(mobileNo) &&
      mobileNo.length === 10 &&
      password.length === 6
    )
      register(
        `${countryCode}${mobileNo}`,
        password
      );
  };

  useEffect(() => {
    if (isLoggedIn) {
      // setIsClicked((prev) => false);
      onDialogClose();
      // setAuthComplete((prev) => true);

      if (nextPage) {
        nextPage();
      }
    }
  }, [isLoggedIn]);

  return (
    <CarouselItem
      className={`h-full flex flex-col justify-between gap-8 text-[16px] -translate-x-[1px]`}
    >
      <CardContent className="p-0 flex flex-col gap-2">
        <div className="gap-2">
          <div className="text-[16px] flex items-baseline justify-start gap-[12px] mt-[10px] mb-[8px]">
            <span className="line-clamp-1">
              {mail}
            </span>
            <span
              className=" text-[#cd378c] cursor-pointer hover:underline capitalize"
              onClick={handleChangeMobileNumber}
            >
              change
            </span>
          </div>
        </div>
        <span
          className={
            registrationStatus !==
            "not-registered"
              ? "hidden"
              : ""
          }
        >
          <MobileNumberInput
            countryCode={countryCode}
            mobileNo={mobileNo}
            onChangeCountryCode={setCountryCode}
            onChangeMobileNo={setMobileNo}
          />
          <Input
            title="password"
            name="password"
            isRequired={false}
            hasSubmitted={false}
            showError={false}
            errorMessage=""
            variant="password"
            defaultValue={""}
            showPassword={showPassword}
            setValue={setPassword}
            toggleShowPassword={() => {
              setShowPassword(!showPassword);
            }}
            className="mt-[14px] text-[16px] *:text-[15px]"
            type="modern"
          />
        </span>
      </CardContent>
      <CardFooter className="flex justify-end p-0">
        <Button
          className="flex items-center justify-center gap-[10px] w-full h-[4rem] max-sm:h-[42px] max-sm:text-[16px] text-[1.5rem] bg-[#cd378c] hover:bg-[#8d2b63] transition-all duration-300 rounded-xl"
          onClick={handleRegister}
          disabled={
            isCustomerLoading ||
            !countryCode ||
            mobileNo.length !== 10 ||
            password.length !== 6
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
          <span>Register</span>
        </Button>
      </CardFooter>
    </CarouselItem>
  );
}
