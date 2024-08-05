import { DOMAIN } from "@/constants/frontend/apiRoute";
import { VENUE_API } from "@/constants/cms/apiRoute";

import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

// ===============[ GET ]===========================================
export default function getVenues({
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
}: QueryParamsType): Promise<PaginationResponseDataType> {
  return new Promise(async (resolve, reject) => {
    try {
      const queryParams: string = `?${active ? "active=true&" : ""}${deleted ? "deleted=true&" : ""}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&filterBy=${filterBy}&keyword=${keyword}&fromDate=${fromDate}&toDate=${toDate}`;
      const url: string = `${DOMAIN}${VENUE_API}${queryParams}`;

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
        "Error Getting Venues",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Venues, Try Again"
          }
        ]
      });
    }
  });
}

export function getVenue({
  id
}: {
  id: string;
}): Promise<PaginationResponseDataType> {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VENUE_API}/${id}`;

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
        "Error Getting Venues",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Venues, Try Again"
          }
        ]
      });
    }
  });
}

// ===============[ POST ]===========================================
export const addVenue = (
  venueName: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VENUE_API}`;

      const response: Response = await fetch(
        url,
        {
          body: JSON.stringify({
            venue: venueName
          }),
          method: "POST"
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
      console.error("Error add venue", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Venue, Try Again"
          }
        ]
      });
    }
  });
};

// ===============[ PATCH ]===========================================
export const updateVenue = (
  id: string,
  newName: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VENUE_API}/${id}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({ venue: newName })
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
        "Error updating venue",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Venue, Try Again"
          }
        ]
      });
    }
  });
};

export const activateVenue = (
  id: string,
  newStatus: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VENUE_API}/${id}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify({
            isActive: newStatus
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
        `Error ${newStatus ? "Deactivating" : "Activating"} Venue`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${newStatus ? "Deactivate" : "Activate"} Venue, Try Again`
          }
        ]
      });
    }
  });
};

// ===============[ DELETE ]===========================================
export const deleteVenue = (
  id: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VENUE_API}/${id}`;

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
        "Error Deleting Venue",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Venue, Try Again"
          }
        ]
      });
    }
  });
};
