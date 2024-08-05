/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// fetchAPIs
import { validateAuth } from "@/fetchAPIs/cms/auth";

// components
import LoginEditor from "@/components/cms/auth/login/LoginEditor";

// styles
import styles from "@/components/cms/auth/login/login.module.css";
import { LoadingPreviewComponent } from "../../loaders/LoadingSpin";

// export component
export default function Login() {
  // hooks
  const { push } = useRouter();

  // states
  const [user, setUser] =
    useState<string>("loading");

  // handlers
  const handleValidateAuth = (): void => {
    validateAuth()
      .then((responseData) => {
        const { userName } = responseData.data;

        if (userName) {
          setUser(userName);
          push("/cms/dashboard");
        }
      })
      .catch((responseData) => {
        setUser("");
      });
  };

  // lifecycle
  useEffect(() => {
    handleValidateAuth();
  }, []);

  // return
  if (user) {
    return (
      <div className="min-h-[100dvh] min-w-screen flex items-center">
        <LoadingPreviewComponent
          title={"admin panel"}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-screen h-screen grid place-items-center bg-backdrop-primary`}
    >
      <LoginEditor title="login" />
    </div>
  );
}
