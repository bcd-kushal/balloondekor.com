// constants
import { DOMAIN } from "@/constants/cms/apiRoute";
import {
  LOGIN_API,
  LOGOUT_API,
  VALIDATION_API
} from "@/constants/cms/auth";

// types
import { LoginCredentialsType } from "@/types/cms/auth";
import { ResponseDataType } from "@/types/cms/api";

export const adminLogin = (
  credentials: LoginCredentialsType
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${LOGIN_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(credentials)
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
      console.error("Error Logging In", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Log In, Try Again"
          }
        ]
      });
    }
  });
};

export const adminLogout =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${LOGOUT_API}`;

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
            "Error Logging Out",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Log Out, Try Again"
              }
            ]
          });
        }
      }
    );
  };

export const validateAuth =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${VALIDATION_API}`;

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
            "Error Validating Authentication",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Validate Authentication, Try Again"
              }
            ]
          });
        }
      }
    );
  };
