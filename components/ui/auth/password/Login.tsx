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

export default function Login({
  onDialogClose,
  nextPage
  // setAuthComplete
}: {
  onDialogClose: () => void;
  nextPage?: () => void;
  // setAuthComplete: React.Dispatch<
  //   SetStateAction<boolean>
  // >;
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
          resetRegistrationStatus,
          login
        }
      }
    }
  } = useCustomerContext();
  const { scrollPrev } = useCarousel();

  const [password, setPassword] =
    useState<string>("");
  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  const handleChangeMobileNumber = () => {
    resetRegistrationStatus();
    scrollPrev();
  };

  const handleLogin = () => {
    login(password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      onDialogClose();
      // setAuthComplete(true);

      if (nextPage) {
        nextPage();
      }
    }
  }, [isLoggedIn]);

  return (
    <CarouselItem
      className={`h-full flex flex-col justify-between gap-8 text-[16px]`}
    >
      <CardContent className="p-0">
        <div className="pb-3">
          <span className="text-[15px]">
            Email
          </span>
          <div className="flex items-baseline justify-start gap-[12px]">
            <span className="text-[12px]">
              {mail}
            </span>
            <span
              className="text-[12px] text-[#cd378c] capitalize cursor-pointer hover:underline hover:underline-offset-2"
              onClick={handleChangeMobileNumber}
            >
              change
            </span>
          </div>
        </div>
        <span
          className={
            registrationStatus !== "registered"
              ? "hidden"
              : ""
          }
        >
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
            className="text-[18px] *:text-[15px] mt-2"
            type="modern"
          />
        </span>
      </CardContent>
      <CardFooter className="flex justify-end p-0">
        <Button
          className="flex items-center justify-center gap-[10px] w-[10rem] h-[4rem] text-[1.5rem] bg-[#cd378c] hover:bg-[#8d2b63] transition-all duration-300 rounded-xl"
          onClick={handleLogin}
          disabled={isCustomerLoading}
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
          <span>Login</span>
        </Button>
      </CardFooter>
    </CarouselItem>
  );
}
