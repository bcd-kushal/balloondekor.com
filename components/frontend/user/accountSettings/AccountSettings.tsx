/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { CheckoutFormFieldType } from "@/components/ui/transaction/static/types";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { DEFAULT_ACCOUNT_SETTINGS_DATA } from "./utils/constants";
import { AccountSettingsFormDataType } from "./utils/types";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { REGEX_TEST } from "./utils/regex";
import { useStatusContext } from "@/hooks/useStatusContext";

const isValid = (
  str: string | null | undefined
) =>
  str !== null &&
  str !== undefined &&
  str &&
  str.length > 0
    ? true
    : false;

export default function AccountSettings({
  reset,
  onResetReset
}: {
  reset: boolean;
  onResetReset: () => void;
}) {
  const {
    customer: {
      data: { info: userInfo },
      action: { updateInfo }
    }
  } = useCustomerContext();

  const { addStatus } = useStatusContext();

  const [formData, setFormData] =
    useState<AccountSettingsFormDataType>(
      DEFAULT_ACCOUNT_SETTINGS_DATA
    );
  const [submitted, setSubmitted] =
    useState<boolean>(false);
  const [authenticData, setAuthenticData] =
    useState<
      Record<
        keyof AccountSettingsFormDataType,
        boolean
      >
    >({
      address: false,
      email: false,
      gender: false,
      mobile: false,
      name: false
    });

  const putDefaultUserInfo = (
    type: "initial" | "reset"
  ): void => {
    if (userInfo) {
      setFormData((prev) => ({
        name: isValid(userInfo.name)
          ? userInfo.name &&
            userInfo.name !== "User"
            ? userInfo.name
            : ""
          : type === "initial"
            ? prev.name
            : "",
        email: isValid(userInfo?.mail)
          ? userInfo.mail || ""
          : type === "initial"
            ? prev.email
            : "",
        mobile: isValid(userInfo?.mobileNumber)
          ? userInfo.mobileNumber?.slice(3, 13) ||
            ""
          : prev.mobile,
        gender: isValid(userInfo?.gender)
          ? userInfo.gender === "female"
            ? "F"
            : userInfo.gender === "male"
              ? "M"
              : "O"
          : type === "initial"
            ? prev.gender
            : undefined,
        address: isValid(userInfo?.address)
          ? userInfo.address || ""
          : type === "initial"
            ? prev.address
            : ""
      }));
    }
  };

  useEffect(() => {
    putDefaultUserInfo("initial");
  }, []);

  useEffect(() => {
    if (reset) {
      onResetReset();
      putDefaultUserInfo("reset");
    }
  }, [reset]);

  useEffect(() => {
    if (submitted) {
      if (
        authenticData.address &&
        authenticData.email &&
        authenticData.gender &&
        authenticData.mobile &&
        authenticData.name
      ) {
        // send data here -------------------------------------------------------
        updateInfo({
          mobileNumber: `+91${formData.mobile}`,
          name: formData.name,
          mail: formData.email,
          gender: formData.gender
            ? formData.gender === "M"
              ? "male"
              : formData.gender === "F"
                ? "female"
                : "others"
            : formData.gender,
          address: formData.address
        });

        setSubmitted((prev) => false);
      } else {
        addStatus([
          {
            message:
              "Some form fields are invalid or empty",
            type: "warning"
          }
        ]);

        setSubmitted((prev) => false);
      }
    }
  }, [submitted]);

  useEffect(() => {
    setAuthenticData((prev) => ({
      address: formData.address.length
        ? true
        : false,
      email:
        formData.email.length &&
        REGEX_TEST.EMAIL.test(formData.email)
          ? true
          : false,
      gender:
        formData.gender === "M" ||
        formData.gender === "F" ||
        formData.gender === "O"
          ? true
          : false,
      mobile:
        formData.mobile.length &&
        REGEX_TEST.MOBILE.test(formData.mobile)
          ? true
          : false,
      name:
        formData.name.length &&
        REGEX_TEST.NAME.test(formData.name)
          ? true
          : false
    }));
  }, [formData]);

  const accountSettingsForms: CheckoutFormFieldType[] =
    [
      {
        required: true,
        name: "fullName",
        title: "Full Name",
        variant: "text",
        value: formData.name,
        setValue: (val: string) => {
          setFormData((prev) => ({
            ...prev,
            name: val
          }));
        },
        hasError:
          formData.name.length > 0
            ? !authenticData.name
            : false
      },
      {
        required: true,
        name: "email",
        title: "Email Address",
        variant: "text",
        value: formData.email,
        setValue: (val: string) => {
          setFormData((prev) => ({
            ...prev,
            email: val
          }));
        },
        hasError:
          formData.email.length > 0
            ? !authenticData.email
            : false
      },
      {
        required: true,
        name: "mobile",
        title: "Mobile No.",
        variant: "text",
        value: formData.mobile,
        setValue: (val: string) => {
          setFormData((prev) => ({
            ...prev,
            mobile: val
              .replace(/\D/g, "")
              .substring(0, 10)
          }));
        },
        hasError:
          formData.mobile.length > 0
            ? !authenticData.mobile
            : false
      },
      {
        required: true,
        name: "gender",
        title: "Gender",
        variant: "dropdown",
        value: formData.gender
          ? formData.gender
          : "",
        setValue: (val: string) => {
          if (isValid(val)) {
            setFormData((prev) => ({
              ...prev,
              gender:
                val !== ""
                  ? (val as "M" | "F" | "O")
                  : prev.gender
            }));
          }
        },
        defaultOptionValue: "",
        dropdownOptionPlaceholder:
          "Select gender",
        options: [
          { id: "M", label: "Male", value: "M" },
          {
            id: "F",
            label: "Female",
            value: "F"
          },
          {
            id: "O",
            label: "Rather not disclose",
            value: "O"
          }
        ],
        hasError: !authenticData.gender
      },
      {
        required: true,
        name: "address",
        title: "Address",
        variant: "longText",
        value: formData.address,
        setValue: (val: string) => {
          setFormData((prev) => ({
            ...prev,
            address: val
          }));
        },
        hasError:
          formData.address.length > 0
            ? !authenticData.address
            : false
      }
    ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-10 pt-5">
      {accountSettingsForms.map(
        (field, index) => (
          <div
            key={index}
            className={`flex flex-col justify-start gap-3 ${field.variant === "longText" ? "sm:col-span-2" : ""}`}
          >
            {/* title --------------------------- */}
            <label
              htmlFor={field.title}
              className="text-[15px] text-gray-600 pl-2 sm:pl-0"
            >
              {field.title}
              <span
                className={
                  field.required
                    ? "text-red-500"
                    : "hidden"
                }
              >
                *
              </span>
            </label>

            {/* input ----------------------------- */}
            {field.variant === "longText" ? (
              <textarea
                name={field.name}
                title={field.title}
                required={field.required}
                value={field.value}
                /* defaultValue={
                    field.defaultValue
                  } */
                onChange={(e) => {
                  field.setValue(e.target.value);
                }}
                draggable="false"
                className={` text-slate-800 rounded-[14px] py-5 px-7 min-h-[90px] max-h-[150px] scrollbar-hide overflow-y-scroll transition-all duration-300 border-[1.5px] border-zinc-200 sm:border-transparent hover:border-blue-200 outline-none focus:border-blue-400 focus:outline-none   ${field.className}`}
                style={{
                  boxShadow:
                    "0 0 16px 4px #12121210"
                }}
              ></textarea>
            ) : field.variant === "dropdown" ? (
              <div
                className={`group appearence-none text-slate-800 rounded-[14px] py-5 px-7 relative cursor-pointer border-[1.5px] border-zinc-200 sm:border-transparent transition-all duration-300 hover:border-blue-200 outline-none focus-within:border-blue-400 focus:outline-none   ${field.className}`}
                style={{
                  boxShadow:
                    "0 0 16px 4px #12121210"
                }}
              >
                <select
                  name={field.name}
                  required={field.required}
                  title={field.title}
                  value={field.value}
                  onChange={(e) => {
                    field.setValue(
                      e.target.value
                    );
                  }}
                  className={`group-hover:cursor-pointer appearence-none w-full bg-transparent transition-all duration-300 outline-none ${field.className}`}
                >
                  <option
                    value={
                      field.defaultOptionValue
                    }
                    disabled
                  >
                    {
                      field.dropdownOptionPlaceholder
                    }
                  </option>
                  {field.options.map(
                    (
                      { label, value },
                      index2
                    ) => (
                      <option
                        value={value}
                        key={index2}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : (
              <input
                type={field.variant}
                name={field.name}
                title={field.title}
                required={field.required}
                value={field.value}
                disabled={
                  field.disabled
                    ? field.disabled
                    : false
                }
                onChange={(e) => {
                  field.setValue(e.target.value);
                }}
                className={` text-slate-800 rounded-[14px] py-5 px-7 transition-all duration-300 border-[1.5px] outline-none focus:outline-none   ${field.className} ${field.hasError ? `border-red-300 hover:border-red-400 focus:bg-[#aa000008]` : "border-zinc-200 sm:border-transparent hover:border-blue-200 focus:border-blue-400"}`}
                style={{
                  boxShadow:
                    "0 0 16px 4px #12121210"
                }}
              />
            )}
          </div>
        )
      )}

      <div className="flex items-center justify-start gap-[14px] mt-[10px] sm:mt-[16px] max-sm:text-[15px]">
        <span
          onClick={() =>
            !submitted
              ? setSubmitted((prev) => true)
              : () => {}
          }
          className={`rounded-xl sm:rounded-2xl py-[7px] sm:py-[12px] px-[12.5px] sm:px-[22px] w-[90px] sm:w-[110px] flex items-center gap-[10px] justify-center ${!submitted ? "cursor-pointer bg-pink-500 text-white hover:bg-pink-600" : "bg-pink-500/50 text-white/50"} transition-colors duration-300 `}
        >
          {submitted ? (
            <ReloadIcon
              className="animate-spin"
              width={17}
              height={17}
            />
          ) : (
            <></>
          )}
          Save
        </span>
        <span
          onClick={() =>
            putDefaultUserInfo("reset")
          }
          className={`rounded-2xl py-[12px] px-[22px] flex items-center gap-[10px] justify-center ${!submitted ? "cursor-pointer hover:bg-neutral-200" : "text-black/50"} transition-colors duration-300 `}
        >
          Reset
        </span>
      </div>
    </div>
  );
}
