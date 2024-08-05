// constants
import {
  DOMAIN,
  CUSTOMER_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

export const getCustomers = ({
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
      const url: string = `${DOMAIN}${CUSTOMER_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: PaginationResponseDataType =
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
        count: NaN,
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

export const eradicateThisCustomer = async (
  id: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMER_API}/${id}`;

      const responseData = await fetch(url, {
        method: "DELETE"
      });

      if (responseData.ok) {
        resolve({
          data: null,
          status: [
            {
              message:
                "Customer deleted successfully",
              type: "success"
            }
          ]
        });
      }

      reject({
        data: null,
        status: [
          {
            message: "Couldnt delete customer",
            type: "error"
          }
        ]
      });
    } catch (err: any) {
      console.error(
        "Error Deleting Customer",
        err
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Customer, Try Again"
          }
        ]
      });
    }
  });
};
