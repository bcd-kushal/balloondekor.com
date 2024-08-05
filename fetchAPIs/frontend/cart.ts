// constants
import {
  DOMAIN,
  CART_API
} from "@/constants/frontend/apiRoute";

// types
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { ServiceDocument } from "@/schemas/cms/service";
import { ResponseDataType } from "@/types/cms/api";

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

export const addCart = (
  addData: Partial<OrderDetailDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CART_API}`;

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
      console.error("Error Adding Cart", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Cart, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCart = (
  cartId: string,
  customerId: string,
  updateData: Partial<OrderDetailDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CART_API}/${cartId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            customerId,
            updateData
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
      console.error("Error Updating Cart", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Cart, Try Again"
          }
        ]
      });
    }
  });
};

export const getCartServices = (
  serviceIds: string[]
): Promise<ServiceDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CART_API}/services`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(serviceIds)
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject([]);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Cart Services",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cart Services, Try Again"
          }
        ]
      });
    }
  });
};
