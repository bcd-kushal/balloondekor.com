/* eslint-disable react-hooks/exhaustive-deps */

import {
  SetStateAction,
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
import { OTP } from "@/components/ui/auth/otp/OTP";

import {
  OTP_LENGTH,
  RESEND_OTP_TIME
} from "@/constants/frontend/auth";

import { UpdateIcon } from "@radix-ui/react-icons";
import {
  CrossSVG,
  TickSVG
} from "@/constants/svgs/svg";

export default function VerifyOTP({
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
        otp: { mobileNumber, otpStatus }
      },
      action: {
        whatsapp: {
          resetOTPStatus,
          resendOTP,
          verifyOTP
        }
      }
    }
  } = useCustomerContext();

  const { scrollPrev } = useCarousel();

  const [otp, setOTP] = useState<string>("");
  const [resendTimer, setResendTimer] =
    useState<number>(RESEND_OTP_TIME);

  const [startCountdown, setStartCountdown] =
    useState(false);

  const [isVerifying, setIsVerifying] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] =
    useState<boolean>(false);

  const handleChangeMobileNumber = () => {
    resetOTPStatus();
    scrollPrev();
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    verifyOTP(otp);
  };

  const handleResendOTP = () => {
    if (otp) {
      setOTP("");
    }

    resendOTP();
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

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      handleVerifyOTP();
    }
  }, [otp]);

  useEffect(() => {
    if (otpStatus) {
      if (!startCountdown) {
        setStartCountdown(true);
      }
    } else {
      if (startCountdown) {
        setStartCountdown(false);
      }
      if (resendTimer !== RESEND_OTP_TIME) {
        setResendTimer(RESEND_OTP_TIME);
      }
    }
  }, [otpStatus]);

  useEffect(() => {
    if (startCountdown) {
      if (resendTimer > 0) {
        const intervalId = setInterval(
          () => setResendTimer(resendTimer - 1),
          1000
        );

        return () => clearInterval(intervalId);
      } else {
        setStartCountdown(false);
        setResendTimer(RESEND_OTP_TIME);
      }
    }
  }, [startCountdown, resendTimer]);

  useEffect(() => {
    if (
      isVerifying &&
      isCustomerLoading &&
      !isLoading
    ) {
      setIsLoading(true);
    }
    if (
      isVerifying &&
      !isCustomerLoading &&
      isLoading
    ) {
      setIsLoaded(true);
    }
  }, [isCustomerLoading]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsVerifying(false);
        setIsLoading(false);
        setIsLoaded(false);
      }, 1000);
    }
  }, [isLoaded]);

  return (
    <CarouselItem
      className={`h-full flex flex-col justify-between gap-8 text-[16px] w-full`}
    >
      <CardContent className="p-0 ">
        <div className="pb-3">
          <span className="text-[15px] text-neutral-800 mt-[4px]">
            Mobile No.
          </span>
          <div className="flex items-baseline justify-start gap-[12px] mb-[6px]">
            <span className="text-[18px]">
              {mobileNumber.slice(3, 13)}
            </span>
            <span
              className="text-[18px] text-[#cd378c] capitalize cursor-pointer hover:underline hover:underline-offset-2"
              onClick={handleChangeMobileNumber}
            >
              change
            </span>
          </div>
        </div>
        <div className="text-[15px] text-neutral-800">
          {`Enter ${OTP_LENGTH}-digit OTP`}
        </div>
        <OTP
          otp={otp}
          onChangeOTP={setOTP}
        />
      </CardContent>
      <CardFooter className="flex justify-between p-0 max-sm:max-w-[calc(100dvw_-_44px)]">
        <Button
          className="group flex items-center justify-center gap-[10px] px-0 h-[4rem] bg-transparent text-zinc-600 text-[14.5px] font-normal border-none shadow-none transition-all duration-300 hover:bg-transparent"
          onClick={handleResendOTP}
          disabled={startCountdown}
        >
          {!otp.length && isCustomerLoading ? (
            <UpdateIcon
              width={17}
              height={17}
              className="animate-spin"
            />
          ) : (
            <></>
          )}
          <span className="group-hover:underline group-hover:underline-offset-2">
            Resend OTP
            {startCountdown ? (
              <span> (in {resendTimer}s)</span>
            ) : (
              <></>
            )}
          </span>
        </Button>
        <Button
          className="flex items-center justify-center gap-[10px] h-[40px] px-[20px] text-[15px] bg-[#cd378c] hover:bg-[#8d2b63] transition-all duration-300 rounded-xl"
          onClick={handleVerifyOTP}
          disabled={
            otp.length !== OTP_LENGTH ||
            isCustomerLoading
          }
        >
          {isLoaded ? (
            !otpStatus ? (
              <TickSVG dimensions={17} />
            ) : (
              <CrossSVG dimensions={17} />
            )
          ) : otp.length && isCustomerLoading ? (
            <UpdateIcon
              width={17}
              height={17}
              className="animate-spin"
            />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </CardFooter>
    </CarouselItem>
  );
}
