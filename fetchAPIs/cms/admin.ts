// constants
import {
  DOMAIN,
  ADMIN_API
} from "@/constants/cms/apiRoute";

// types
import { AdminDocument } from "@/schemas/cms/admin";
import { ResponseDataType } from "@/types/cms/api";

export const getAdmin =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${ADMIN_API}`;

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
            "Error Getting Admin",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Get Admin, Try Again"
              }
            ]
          });
        }
      }
    );
  };

export const updateAdmin = (
  updateData: Partial<AdminDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${ADMIN_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify(updateData)
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
        "Error Updating Admin",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Admin, Try Again"
          }
        ]
      });
    }
  });
};
