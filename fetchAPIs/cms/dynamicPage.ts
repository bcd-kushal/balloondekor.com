// constants
import {
  DOMAIN,
  DYNAMIC_PAGE_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";

export const getDynamicPages = ({
  populate,
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
      const queryParams: string = `?${populate ? "populate=true&" : ""}${active ? "active=true&" : ""}${deleted ? "deleted=true&" : ""}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&filterBy=${filterBy}&keyword=${keyword}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}${queryParams}`;

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
        "Error Getting Dynamic Pages",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Dynamic Pages, Try Again"
          }
        ]
      });
    }
  });
};

export const getDynamicPage = (
  dynamicPageId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}/${dynamicPageId}`;

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
        "Error Getting Dynamic Page",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Dynamic Page, Try Again"
          }
        ]
      });
    }
  });
};

export const addDynamicPage = (
  addData: Partial<DynamicPageDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}`;

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
        "Error Adding Dynamic Page",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Dynamic Page, Try Again"
          }
        ]
      });
    }
  });
};

export const updateDynamicPage = (
  dynamicPageId: string,
  updateData: Partial<DynamicPageDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}/${dynamicPageId}`;

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
        "Error Updating Dynamic Page",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Dynamic Page, Try Again"
          }
        ]
      });
    }
  });
};

export const activateDynamicPage = (
  dynamicPageId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}/${dynamicPageId}`;

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
        `Error ${isActive ? "Deactivating" : "Activating"} Dynamic Page`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} Dynamic Page, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteDynamicPage = (
  dynamicPageId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${DYNAMIC_PAGE_API}/${dynamicPageId}`;

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
        "Error Deleting Dynamic Page",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Dynamic Page, Try Again"
          }
        ]
      });
    }
  });
};
