"use client";
import { CheckoutFormFieldType } from "@/components/ui/transaction/static/types";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { ChangePasswordRecordType } from "./utils/types";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DEFAULT_CHANGE_PASSWORD_RECORD } from "./utils/constants";
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

const MIN_REQUIRED_PASSWORD_CHARS = 6;

export default function ChangePassword() {
  const {
    auth: {
      action: {
        password: { updatePassword }
      }
    },
    customer: {
      data: { info: userInfo }
    }
  } = useCustomerContext();
  const { addStatus } = useStatusContext();

  const [passwordRecords, setPasswordRecords] =
    useState<ChangePasswordRecordType>(
      DEFAULT_CHANGE_PASSWORD_RECORD
    );
  const [submitted, setSubmitted] =
    useState<boolean>(false);
  const [passwordMatches, setPasswordMatches] =
    useState<{
      newPasswords: boolean;
    }>({
      newPasswords: false
    });

  useEffect(() => {
    if (submitted) {
      if (
        passwordMatches.newPasswords &&
        passwordRecords.oldPassword.length > 0
      ) {
        // try {
        // send data here --------------------------------------------------
        updatePassword({
          currentPassword:
            passwordRecords.oldPassword,
          newPassword: passwordRecords.newPassword
        });
        // } finally {
        setSubmitted((prev) => false);
        addStatus([
          {
            message:
              "Password updated successfully!",
            type: "success"
          }
        ]);
        setPasswordRecords(
          () => DEFAULT_CHANGE_PASSWORD_RECORD
        );
        // }
      } else {
        if (
          passwordRecords.newPassword.length ===
            0 ||
          passwordRecords.oldPassword.length ===
            0 ||
          passwordRecords.reEnteredNewPassword
            .length === 0
        )
          addStatus([
            {
              message:
                "All fields need to be filled",
              type: "error"
            }
          ]);
        else if (!passwordMatches.newPasswords)
          addStatus([
            {
              message:
                passwordRecords
                  .reEnteredNewPassword.length >=
                  MIN_REQUIRED_PASSWORD_CHARS &&
                passwordRecords.newPassword
                  .length >=
                  MIN_REQUIRED_PASSWORD_CHARS
                  ? "New password and Conform password don't match"
                  : `Password should be atleast ${MIN_REQUIRED_PASSWORD_CHARS} characters long`,
              type: "error"
            }
          ]);
        setSubmitted((prev) => false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  useEffect(() => {
    setPasswordMatches((prev) => ({
      newPasswords:
        passwordRecords.newPassword ===
          passwordRecords.reEnteredNewPassword &&
        passwordRecords.newPassword.length >=
          MIN_REQUIRED_PASSWORD_CHARS &&
        passwordRecords.reEnteredNewPassword
          .length >= MIN_REQUIRED_PASSWORD_CHARS
    }));
  }, [passwordRecords, userInfo]);

  const accountSettingsForms: CheckoutFormFieldType[] =
    [
      {
        required: true,
        name: "oldPassword",
        title: "Old Password",
        variant: "password",
        value: passwordRecords.oldPassword,
        setValue: (val: string) => {
          setPasswordRecords((prev) => ({
            ...prev,
            oldPassword: val
          }));
        }
      },
      {
        required: true,
        name: "newPassword",
        title: "New Password",
        variant: "password",
        value: passwordRecords.newPassword,
        setValue: (val: string) => {
          setPasswordRecords((prev) => ({
            ...prev,
            newPassword: val
          }));
        },
        hasError: passwordRecords
          .reEnteredNewPassword.length
          ? passwordRecords.newPassword.length
            ? !passwordMatches.newPasswords
            : false
          : false
      },
      {
        required: true,
        name: "reEnterPassword",
        title: "Confirm New Password",
        variant: "password",
        value:
          passwordRecords.reEnteredNewPassword,
        setValue: (val: string) => {
          setPasswordRecords((prev) => ({
            ...prev,
            reEnteredNewPassword: val
          }));
        },
        hasError: passwordRecords
          .reEnteredNewPassword.length
          ? !passwordMatches.newPasswords
          : false
      }
    ];

  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-12 sm:gap-y-10 pt-5 max-w-[500px]">
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
              {field.title}{" "}
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
            {field.variant === "dropdown" ? (
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
                  /* defaultValue={
                      field.defaultValue
                    } */
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
                        selected={
                          value ===
                          field.defaultValue
                        }
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
                /* defaultValue={
                    field.defaultValue
                  } */
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

      <div className="flex items-center justify-start gap-[14px] mt-[10px] sm:mt-[16px] max-sm:text-[15.5px]">
        <span
          onClick={() =>
            !submitted
              ? setSubmitted((prev) => true)
              : () => {}
          }
          className={`rounded-xl sm:rounded-2xl py-[8px] sm:py-[12px] px-[16.5px] sm:px-[22px] sm:w-[210px] flex items-center gap-[10px] justify-center ${!submitted ? "cursor-pointer bg-pink-500 text-white hover:bg-pink-600" : "bg-pink-500/50 text-white/50"} transition-colors duration-300 `}
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
          Update Password
        </span>
        <span
          onClick={() =>
            setPasswordRecords(
              (prev) =>
                DEFAULT_CHANGE_PASSWORD_RECORD
            )
          }
          className={`rounded-2xl py-[12px] px-[22px] flex items-center gap-[10px] justify-center ${!submitted ? "cursor-pointer hover:bg-neutral-200" : "text-black/50"} transition-colors duration-300 `}
        >
          Reset
        </span>
      </div>
    </div>
  );
}
