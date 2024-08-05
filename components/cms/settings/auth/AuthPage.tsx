/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import AuthList from "./AuthList";
import PageWithTable from "@/components/common/table/admin/PageWithTable";

// fetchAPIs
import {
  getSettings,
  toggleActivateAuthMethod,
  updateDefaultAuthMethod
} from "@/fetchAPIs/cms/settings";

// types
import { ResponseDataType } from "@/types/cms/api";
import { SettingDocument } from "@/schemas/cms/setting";

// styles

export default function AuthPage() {
  // hooks
  const { addStatus } = useStatusContext();

  // list states
  const [settings, setSettings] =
    useState<SettingDocument | null>(null);

  // handlers
  const handleGetSettings = (): void => {
    getSettings()
      .then((responseData: ResponseDataType) => {
        setSettings(
          responseData.data as SettingDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleToggleActiveAuthMethod = (
    settingsId: string,
    method:
      | "mail"
      | "otp"
      | "whatsapp"
      | "google",
    methodState: boolean
  ): void => {
    toggleActivateAuthMethod(
      settingsId,
      method,
      methodState
    )
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setSettings(
          (prevSettings) =>
            ({
              ...prevSettings,
              auth: {
                ...prevSettings?.auth,
                methods: {
                  ...prevSettings?.auth?.methods,
                  [method]: methodState
                }
              }
            }) as SettingDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleChangeDefaultAuthMethod = (
    settingsId: string,
    method: "mail" | "otp" | "whatsapp"
  ): void => {
    updateDefaultAuthMethod(settingsId, method)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);
        setSettings(
          (prevSettings) =>
            ({
              ...prevSettings,
              auth: {
                ...prevSettings?.auth,
                default: method
              }
            }) as SettingDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    handleGetSettings();
  }, []);

  return settings ? (
    <PageWithTable
      title="Auth Methods"
      tableComponent={
        <AuthList
          authMethods={settings.auth.methods}
          defaultMethod={settings.auth.default}
          onToggleActive={(
            method,
            methodState
          ) => {
            console.log({ method, methodState });

            handleToggleActiveAuthMethod(
              settings?._id,
              method,
              methodState
            );
          }}
          onChangeDefault={(method) => {
            handleChangeDefaultAuthMethod(
              settings?._id,
              method
            );
          }}
        />
      }
      noAddBtn
    />
  ) : (
    <div>Loading</div>
  );
}
