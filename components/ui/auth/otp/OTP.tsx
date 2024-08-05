import { OTP_LENGTH } from "@/constants/frontend/auth";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

export function OTP({
  otp,
  onChangeOTP
}: {
  otp: string;
  onChangeOTP: (otp: string) => void;
}) {
  return (
    <div className="px-[1px] my-[4px] w-full flex items-center justify-center max-w-[calc(100dvw_-_44px)]">
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={onChangeOTP}
        className="translate-x-[2px]"
      >
        <InputOTPGroup className="text-[18.5px]">
          {Array.from({ length: OTP_LENGTH }).map(
            (_, index) => (
              <InputOTPSlot
                index={index}
                key={index}
                className="text-[18.5px]"
              />
            )
          )}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
