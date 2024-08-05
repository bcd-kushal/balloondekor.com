// constants
import {
  DOMAIN,
  GST_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { GSTDocument } from "@/schemas/cms/gst";

export const getGSTs = ({
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
      const url: string = `${DOMAIN}${GST_API}${queryParams}`;

      const response: Response = await fetch(url);

      const responseData: PaginationResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting GSTs", error);

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get GSTs, Try Again"
          }
        ]
      });
    }
  });
};

export const getGST = (
  gstId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GST_API}/${gstId}`;

      const response: Response = await fetch(url);

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting GST", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Get GST, Try Again"
          }
        ]
      });
    }
  });
};

export const addGST = (
  addData: Partial<GSTDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GST_API}`;

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
      console.error("Error Adding GST", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Add GST, Try Again"
          }
        ]
      });
    }
  });
};

export const updateGST = (
  gstId: string,
  updateData: Partial<GSTDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GST_API}/${gstId}`;

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
      console.error("Error Updating GST", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update GST, Try Again"
          }
        ]
      });
    }
  });
};

export const activateGST = (
  gstId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GST_API}/${gstId}`;

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
        `Error ${isActive ? "Deactivating" : "Activating"} Image`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} GST, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteGST = (
  gstId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GST_API}/${gstId}`;

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
      console.error("Error Deleting GST", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete GST, Try Again"
          }
        ]
      });
    }
  });
};
