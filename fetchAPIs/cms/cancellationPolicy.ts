// constants
import {
  DOMAIN,
  CANCELLATION_POLICY_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";

export const getCancellationPolicies = ({
  active,
  deleted,
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
      const queryParams: string = `?${active ? "active=true&" : ""}${deleted ? "deleted=true&" : ""}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&filterBy=${filterBy}&keyword=${keyword}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}${queryParams}`;

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
        "Error Getting Cancellation Policies",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cancellation Policies, Try Again"
          }
        ]
      });
    }
  });
};

export const getCancellationPolicy = (
  cancellationPolicyId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}/${cancellationPolicyId}`;

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
        "Error Getting Cancellation Policy",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cancellation Policy, Try Again"
          }
        ]
      });
    }
  });
};

export const addCancellationPolicy = (
  addData: Partial<CancellationPolicyDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}`;

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
      console.error(
        "Error Adding Cancellation Policy",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Cancellation Policy, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCancellationPolicy = (
  cancellationPolicyId: string,
  updateData: Partial<CancellationPolicyDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}/${cancellationPolicyId}`;

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
        "Error Updating Cancellation Policy",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Cancellation Policy, Try Again"
          }
        ]
      });
    }
  });
};

export const activateCancellationPolicy = (
  cancellationPolicyId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}/${cancellationPolicyId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({ isActive })
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
        `Error ${isActive ? "Deactivating" : "Activating"} Cancellation Policy`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} Cancellation Policy, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteCancellationPolicy = (
  cancellationPolicyId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CANCELLATION_POLICY_API}/${cancellationPolicyId}`;

      const response: Response = await fetch(
        url,
        {
          method: "DELETE"
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
        "Error Deleting Cancellation Policy",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Cancellation Policy, Try Again"
          }
        ]
      });
    }
  });
};
