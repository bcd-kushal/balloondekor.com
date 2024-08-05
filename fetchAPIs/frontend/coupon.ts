// constants
import {
  DOMAIN,
  COUPON_API
} from "@/constants/frontend/apiRoute";

// types
import { ResponseDataType } from "@/types/cms/api";

export const getCoupon = (
  categoryId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${COUPON_API}?category=${categoryId}`;

      const response: Response = await fetch(url);

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Coupon",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Coupon, Try Again"
          }
        ]
      });
    }
  });
};
