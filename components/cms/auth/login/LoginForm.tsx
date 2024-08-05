"use client";

// libraries
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// fetchAPIs
import { adminLogin } from "@/fetchAPIs/cms/auth";

// components
import Input from "@/components/common/form/Input";
import Button from "@/components/common/Button";

// types
import { LoginCredentialsType } from "@/types/cms/auth";

// styles
import styles from "@/components/cms/auth/login/loginForm.module.css";

// configuration
export function getConfig({
  userName,
  password,
  answer
}: LoginCredentialsType): ConfigType {
  return {
    userName: {
      isRequired: true,
      type: "text",
      defaultValue: userName || ""
    },
    password: {
      isRequired: true,
      type: "text",
      defaultValue: password || ""
    },
    answer: {
      isRequired: true,
      type: "text",
      defaultValue: answer || ""
    }
  };
}

// form
export default function LoginForm() {
  // hooks
  const { push } = useRouter();

  const {
    defaultValue,
    resetValue,
    setValue,
    hasSubmitted,
    error,
    onSubmit: handleSubmit
  } = useFormContext();

  const { addStatus: addStatus } =
    useStatusContext();

  // states
  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  // handlers
  const handleLogin = (
    credentials: LoginCredentialsType
  ): void => {
    adminLogin(credentials)
      .then((responseData) => {
        addStatus(responseData.status);
        push("/cms/dashboard");
      })
      .catch((responseData) => {
        addStatus(responseData.status);
      });
  };

  const onSubmit = (data: any) => {
    handleLogin(data);
  };

  return (
    <form
      className={` flex flex-col items-start justify-start gap-[10px] pb-[16px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, (data) => {
          data.answer = (
            data.answer as string
          ).toLowerCase();

          onSubmit(data);
        })
      }
    >
      <Input
        title="user name"
        name="userName"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["userName"]}
        errorMessage={
          error["userName"]
            ? "userName is required"
            : " "
        }
        variant="text"
        defaultValue={
          defaultValue["userName"] as string
        }
        resetValue={resetValue["userName"]}
        setValue={setValue["userName"]}
      />
      <Input
        title="password"
        name="password"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["password"]}
        errorMessage={
          error["password"]
            ? "password is required"
            : " "
        }
        variant="password"
        defaultValue={
          defaultValue["password"] as string
        }
        resetValue={resetValue["password"]}
        showPassword={showPassword}
        setValue={setValue["password"]}
        toggleShowPassword={() => {
          setShowPassword(
            (prevShowPassword) =>
              !prevShowPassword
          );
        }}
      />
      <Input
        title="Name of your hometown?"
        name="answer"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["answer"]}
        errorMessage={
          error["answer"]
            ? "answer is required"
            : " "
        }
        variant="text"
        defaultValue={
          defaultValue["answer"] as string
        }
        resetValue={resetValue["answer"]}
        setValue={setValue["answer"]}
      />
      <span className="h-[10px]"></span>
      <Button
        type="primary"
        label="login"
        variant="submit"
      />
    </form>
  );
}
