// constants
import {
  DOMAIN,
  GENERAL_TAG_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { GeneralTagDocument } from "@/schemas/cms/generalTag";

export const getGeneralTags = ({
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
      const url: string = `${DOMAIN}${GENERAL_TAG_API}${queryParams}`;

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
        "Error Getting General Tags",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get General Tags, Try Again"
          }
        ]
      });
    }
  });
};

export const getGeneralTag = (
  GeneralTagId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERAL_TAG_API}/${GeneralTagId}`;

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
        "Error Getting General Tag",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get General Tag, Try Again"
          }
        ]
      });
    }
  });
};

export const addGeneralTag = (
  addData: Partial<GeneralTagDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERAL_TAG_API}`;

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
        "Error Adding General Tag",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add General Tag, Try Again"
          }
        ]
      });
    }
  });
};

export const updateGeneralTag = (
  GeneralTagId: string,
  updateData: Partial<GeneralTagDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERAL_TAG_API}/${GeneralTagId}`;

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
        "Error Updating General Tag",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update General Tag, Try Again"
          }
        ]
      });
    }
  });
};

export const activateGeneralTag = (
  GeneralTagId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERAL_TAG_API}/${GeneralTagId}`;

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
        `Error ${isActive ? "Deactivating" : "Activating"} General Tag`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} General Tag, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteGeneralTag = (
  GeneralTagId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GENERAL_TAG_API}/${GeneralTagId}`;

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
        "Error Deleting General Tag",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete General Tag, Try Again"
          }
        ]
      });
    }
  });
};
