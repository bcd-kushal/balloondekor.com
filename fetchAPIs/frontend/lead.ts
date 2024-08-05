// constants
import {
  DOMAIN,
  LEAD_API
} from "@/constants/frontend/apiRoute";

// types
import { LeadDocument } from "@/schemas/cms/lead";
import { ResponseDataType } from "@/types/cms/api";

export const addLead = (
  addData: Partial<LeadDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${LEAD_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(addData)
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
      console.error("Error Adding Lead", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Lead, Try Again"
          }
        ]
      });
    }
  });
};
