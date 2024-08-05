// constants
import {
  DOMAIN,
  RAZORPAY_ORDER_ID_API,
  GENERATE_ORDER_API,
  UPDATE_ORDER_API
} from "@/constants/payment/apiRoute";

// types
import {
  OrderDataType,
  UpdateOrderDataType
} from "@/types/payment/order";

export const getRazorpayOrderId = (
  amount: number
): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${RAZORPAY_ORDER_ID_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            amount
          })
        }
      );

      const responseData: {
        orderId: string | null;
      } = await response.json();

      if (response.ok) {
        resolve(responseData.orderId);
      } else {
        reject(null);
      }
    } catch (error: any) {
      console.error(
        "Error Getting OrderId",
        error
      );

      reject(null);
    }
  });
};

export const generateOrder = (
  orderData: OrderDataType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERATE_ORDER_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(orderData)
        }
      );

      const responseData: boolean =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error(
        "Error Getting OrderId",
        error
      );

      reject(false);
    }
  });
};

export const updateOrder = (
  orderId: string,
  updateOrderData: UpdateOrderDataType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${UPDATE_ORDER_API}/${orderId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify(updateOrderData)
        }
      );

      const responseData: boolean =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error(
        "Error Updating Order",
        error
      );

      reject(false);
    }
  });
};
