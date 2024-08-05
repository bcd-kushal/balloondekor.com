// constants
import {
  DOMAIN,
  SETTING_API
} from "@/constants/cms/apiRoute";

// types
import { ResponseDataType } from "@/types/cms/api";

export const getSettings =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${SETTING_API}`;

          const response: Response =
            await fetch(url);

          const responseData: ResponseDataType =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          console.error(
            "Error Getting Settings",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Get Settings, Try Again"
              }
            ]
          });
        }
      }
    );
  };

export const toggleActivateAuthMethod = (
  settingsId: string,
  method: "mail" | "otp" | "whatsapp" | "google",
  methodState: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SETTING_API}/${settingsId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            [`auth.methods.${method}`]:
              methodState
          })
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error(
        `Error ${methodState ? "Deactivating" : "Activating"} ${method} Auth`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${methodState ? "Deactivate" : "Activate"} ${method} Auth, Try Again`
          }
        ]
      });
    }
  });
};

export const updateDefaultAuthMethod = (
  settingsId: string,
  defaultMethod: "mail" | "otp" | "whatsapp"
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SETTING_API}/${settingsId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            [`auth.default`]: defaultMethod
          })
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error(
        `Error Updating Default Auth Method`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't Update Default Auth Method, Try Again`
          }
        ]
      });
    }
  });
};

export const toggleCallbackDisplaySetting = (
  id: string,
  newSetting: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SETTING_API}/${id}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            callback: newSetting
          })
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (err: any) {
      console.error(
        `Error Toggling Callback Setting`,
        err
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't Toggle Callback Setting, Try Again`
          }
        ]
      });
    }
  });
};
