// constants
import {
  DOMAIN,
  ORDER_API
} from "@/constants/frontend/apiRoute";

// types
import { ResponseDataType } from "@/types/cms/api";

export const getOrders = (
  orderIds: string[]
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryParams: string = `?${orderIds.map((orderId) => `orderId=${orderId}`).join("&")}`;
      const url: string = `${DOMAIN}${ORDER_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting Order", error);

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Order, Try Again"
          }
        ]
      });
    }
  });
};
