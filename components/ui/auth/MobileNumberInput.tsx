import { ChangeEvent } from "react";

import COUNTRY_CODE_OPTIONS from "@/constants/static/callingCodes";
import CountryFlag from "@/constants/svgs/countryFlag";

export default function MobileNumberInput({
  countryCode,
  mobileNo,
  authType,
  onChangeCountryCode,
  onChangeMobileNo
}: {
  countryCode: string;
  mobileNo: string;
  authType?: "whatsapp" | "otp" | "email";
  onChangeCountryCode: (
    newCountryCode: string
  ) => void;
  onChangeMobileNo: (
    mobileNumber: string
  ) => void;
}) {
  const handleChangeCountryCode = ({
    target: { value }
  }: ChangeEvent<HTMLSelectElement>) => {
    onChangeCountryCode(value);
  };

  const handleChangeMobileNumber = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    onChangeMobileNo(value.toString());
  };

  return (
    <>
      <label
        htmlFor="mobileNo"
        className="text-[15px] sm:text-[15px] font-base hidden"
      >
        Mobile No.
      </label>
      <div className="tracking-wide flex items-center gap-2 justify-between pb-2 sm:pb-3 sm:pt-1 mt-2 border-black/30 border-b-[1.5px] transition-all duration-300  hover:border-black/70 focus-within:border-[#cd378c] hover:focus-within:border-[#cd378c]">
        <span className="flex gap-[8px] w-fit whitespace-nowrap text-[18px]">
          <CountryFlag
            countryCode={
              COUNTRY_CODE_OPTIONS.find(
                ({ code }) => code === countryCode
              )?.name || ""
            }
            dimensions={24}
          />
          <select
            className="w-[50px] cursor-pointer bg-transparent outline-none focus:outline-none"
            value={countryCode}
            title="countryCode"
            onChange={handleChangeCountryCode}
          >
            {COUNTRY_CODE_OPTIONS.map(
              (option, i) => (
                <option
                  key={i}
                  value={option.code}
                >
                  {option.code === countryCode
                    ? option.code
                    : option.label}
                </option>
              )
            )}
          </select>
        </span>
        <input
          type="number"
          name="mobileNo"
          title="mobileNo"
          className="px-3 outline-none w-full text-[18px] appearance-none tracking-wider"
          value={Number(mobileNo) || ""}
          onChange={handleChangeMobileNumber}
          placeholder={
            authType
              ? authType === "email" ||
                authType === "otp"
                ? "Enter Mobile No."
                : "Enter Whatsapp No."
              : "Enter Mobile No."
          }
        />
      </div>
    </>
  );
}
