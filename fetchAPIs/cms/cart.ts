// constants
import {
  DOMAIN,
  CART_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

export const getCarts = ({
  offset,
  limit,
  sortBy,
  orderBy,
  fromDate,
  toDate
}: QueryParamsType): Promise<PaginationResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryParams: string = `?offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${CART_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: PaginationResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting Carts", error);

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Carts, Try Again"
          }
        ]
      });
    }
  });
};

export const getCart = (
  cartId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CART_API}/${cartId}`;

      const response: Response = await fetch(url);

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting Cart", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cart, Try Again"
          }
        ]
      });
    }
  });
};
