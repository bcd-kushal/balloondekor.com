// constants
import { OrderUpdatePropsType } from "@/components/cms/orders/OrdersPage";
import {
  DOMAIN,
  FAILED_ORDER_API,
  ORDER_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

export const getOrders = ({
  populate,
  offset,
  limit,
  sortBy,
  orderBy,
  filterBy,
  keyword,
  fromDate,
  toDate,
  orderType
}: QueryParamsType & {
  orderType:
    | "new-order"
    | "in-progress"
    | "delivered"
    | "cancelled";
}): Promise<PaginationResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryParams: string = `?${populate ? "populate=true&" : ""}&orderType=${orderType}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&filterBy=${filterBy}&keyword=${keyword}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${ORDER_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: PaginationResponseDataType =
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

export const getOrder = (
  orderId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${ORDER_API}/${orderId}`;

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

export const updateOrderStatus = ({
  currStatus,
  lineItemId,
  newStatus,
  orderDetailId,
  orderId
}: OrderUpdatePropsType): Promise<ResponseDataType> => {
  return new Promise(async (reject, resolve) => {
    try {
      const url = `${DOMAIN}${ORDER_API}/${orderId}`;
      const responseOfUpdation = await fetch(
        url,
        {
          body: JSON.stringify({
            currStatus,
            lineItemId,
            newStatus,
            orderDetailId,
            orderId
          }),
          method: "PATCH"
        }
      );

      const { status, data } =
        await responseOfUpdation.json();

      if (status[0].type === "success")
        resolve({ success: true });

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Order Status, Try Again"
          }
        ]
      });
    } catch (err: any) {
      console.error(
        "Error Updating Order Status:",
        err
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Order Status, Try Again"
          }
        ]
      });
    }
  });
};

export const getFailedOrders = ({
  populate,
  offset,
  limit,
  sortBy,
  orderBy,
  filterBy,
  keyword,
  fromDate,
  toDate
}: QueryParamsType): Promise<PaginationResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryParams: string = `?${populate ? "populate=true&" : ""}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&filterBy=${filterBy}&keyword=${keyword}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${FAILED_ORDER_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: PaginationResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (err: any) {
      console.error("Error Getting Order", err);

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
