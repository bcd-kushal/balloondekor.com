/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// hooks
// import { useStatusContext } from "./useStatusContext";

// fetch
// import { getSettings } from "@/fetchAPIs/cms/settings";

// types
import {
  AuthSettingDocument,
  SettingDocument
} from "@/schemas/cms/setting";

type SettingsContextValueType = {
  auth: AuthSettingDocument | null;
  setSettings: (
    settings: SettingDocument
  ) => void;
};

// context
const SettingsContext = createContext<
  SettingsContextValueType | undefined
>(undefined);

// context provider
export function SettingsContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // hooks
  // const { addStatus } = useStatusContext();

  // states
  const [settings, setSettings] =
    useState<SettingDocument | null>();

  // // handlers
  // const handleGetSettings = (): void => {
  //   getSettings()
  //     .then((res) => {
  //       setSettings(res.data as SettingDocument);
  //     })
  //     .catch((res) => {
  //       addStatus(res.status);
  //     });
  // };

  // useEffect(() => {
  //   handleGetSettings();
  // }, []);

  return (
    <SettingsContext.Provider
      value={{
        auth: settings?.auth || null,
        setSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// hook
export const useSettingsContext =
  (): SettingsContextValueType => {
    const context = useContext(SettingsContext);

    if (!context) {
      throw new Error(
        "useSettingsContext must be used within a SettingsContextProvider"
      );
    }

    return context;
  };
