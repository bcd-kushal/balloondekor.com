// constants
import {
  DOMAIN,
  CUSTOMER_API,
  CUSTOMER_PASSWORD_API,
  CUSTOMER_MOBILE_API,
  CUSTOMER_MAIL_API
} from "@/constants/frontend/apiRoute";
import { CustomerDocument } from "@/schemas/cms/customer";

// types
import { ResponseDataType } from "@/types/cms/api";

export const getCustomer = (
  customerId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_API}/${customerId}`;

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
        "Error Getting Customer",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Customer, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCustomer = (
  customerId: string,
  updateData: Partial<CustomerDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_API}/${customerId}`;

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
        "Error Updating Customer",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Customer, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCustomerPassword = (
  customerId: string,
  currentPassword: string,
  newPassword: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_PASSWORD_API}/${customerId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            currentPassword,
            newPassword
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
        "Error Updating Customer Password",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Password, Try Again"
          }
        ]
      });
    }
  });
};

export const getCustomerByMobileNumber = (
  mobileNumber: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_MOBILE_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            mobileNumber
          })
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject(responseData.data);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Customer By Mobile",
        error
      );

      reject(null);
    }
  });
};

export const getCustomerByMail = (
  mail: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_MAIL_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            mail
          })
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject(responseData.data);
      }
    } catch (error: any) {
      console.error(
        "Error Getting Customer By Mail",
        error
      );

      reject(null);
    }
  });
};
