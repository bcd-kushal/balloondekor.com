"use client";

import * as React from "react";
import { DashIcon } from "@radix-ui/react-icons";
import {
  OTPInput,
  OTPInputContext
} from "input-otp";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(
  (
    { className, containerClassName, ...props },
    ref
  ) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50 justify-stretch w-full",
        containerClassName
      )}
      className={cn(
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-[5px] w-full",
      className
    )}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    index: number;
  }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(
    OTPInputContext
  );
  const { char, hasFakeCaret, isActive } =
    inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex aspect-square p-[10px] py-[7px] min-w-[45px] items-center justify-center border-l-0 border-r-0 border-b-[2.5px] border-b-neutral-300 text-[14px] shadow-sm transition-all",
        isActive && "z-10 border-b-pink-500",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    {...props}
  >
    <DashIcon />
  </div>
));
InputOTPSeparator.displayName =
  "InputOTPSeparator";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
};
