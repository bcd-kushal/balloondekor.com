import { useEffect, useState } from "react";

import { useCustomerContext } from "@/hooks/useCustomerContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Input from "@/components/common/form/Input";

import { REGEX_TEST } from "../accountSettings/utils/regex";
import MobileNumberInput from "@/components/ui/auth/MobileNumberInput";

export default function MissingFields({
  openDialog,
  onChangeOpenDialog,
  onReset
}: {
  openDialog: boolean;
  onChangeOpenDialog: (
    newOpenDialog: boolean
  ) => void;
  onReset: () => void;
}) {
  const {
    customer: {
      data: { info },
      action: { updateInfo }
    }
  } = useCustomerContext();

  const [name, setName] = useState<string>("");
  const [countryCode, setCountryCode] =
    useState<string>("+91");
  const [mobileNo, setMobileNo] =
    useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  const [showPassword, setShowPassword] =
    useState<boolean>(false);
  const [isBtnDisabled, setIsBtnDisabled] =
    useState<boolean>(
      // (!info?.name && !name) ||
      //   (!info?.mobileNumber &&
      //     (!countryCode ||
      //       !mobileNo ||
      //       mobileNo.length !== 10)) ||
      //   (!info?.mail &&
      //     (!mail ||
      //       !REGEX_TEST.EMAIL.test(mail))) ||
      //   (!info?.password &&
      //     (!password || password.length < 6))
      true
    );

  const handleUpdate = () => {
    updateInfo({
      ...(!info?.name ? { name } : {}),
      ...(!info?.mobileNumber
        ? {
            mobileNumber: `${countryCode}${mobileNo}`
          }
        : {}),
      ...(!info?.mail ? { mail } : {}),
      ...(!info?.password ? { password } : {})
    });

    setTimeout(() => {
      onReset();
    }, 1000);
  };

  useEffect(() => {
    setIsBtnDisabled(
      (!info?.name && !name) ||
        (!info?.mobileNumber &&
          (!countryCode ||
            !mobileNo ||
            mobileNo.length !== 10)) ||
        (!info?.mail &&
          (!mail ||
            !REGEX_TEST.EMAIL.test(mail))) ||
        (!info?.password &&
          (!password || password.length < 6))
    );
  }, [
    info,
    name,
    countryCode,
    mobileNo,
    mail,
    password
  ]);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={onChangeOpenDialog}
    >
      <DialogContent className="max-sm:py-[24px] pb-[20px] pt-[26px] px-[18px] sm:px-[20px] min-w-fit max-sm:w-[95dvw] rounded-2xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-[18px] text-left">
            Update Email & Password
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-tight text-left">
            To Enable Email Login
          </DialogDescription>
        </DialogHeader>
        <section className="mt-[7px] flex flex-col justify-start gap-[14px]">
          {info?.name ? (
            <></>
          ) : (
            <Input
              title="name"
              name="name"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="text"
              defaultValue={name}
              setValue={setName}
              className="text-[15px] *:text-[14px]"
            />
          )}
          {info?.mobileNumber ? (
            <></>
          ) : (
            <MobileNumberInput
              countryCode={countryCode}
              mobileNo={mobileNo}
              onChangeCountryCode={setCountryCode}
              onChangeMobileNo={setMobileNo}
            />
          )}
          {info?.mail ? (
            <></>
          ) : (
            <Input
              title="email"
              name="email"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="text"
              defaultValue={mail}
              setValue={setMail}
              className="text-[15px] *:text-[14px]"
            />
          )}
          {info?.password ? (
            <></>
          ) : (
            <Input
              title="password"
              name="password"
              isRequired={true}
              hasSubmitted={false}
              showError={false}
              errorMessage=""
              variant="password"
              showPassword={showPassword}
              defaultValue={password}
              setValue={setPassword}
              className="text-[15px] *:text-[14px]"
              toggleShowPassword={() => {
                setShowPassword(
                  (prevShowPassword) =>
                    !prevShowPassword
                );
              }}
            />
          )}
        </section>
        <DialogFooter className="mt-[10px] max-sm:mt-[14px]">
          <Button
            onClick={handleUpdate}
            disabled={isBtnDisabled}
            className="text-[15px] font-medium px-[15px] py-[6px] h-[38px] sm:h-[36px] rounded-xl bg-pink-500 hover:bg-pink-600"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
