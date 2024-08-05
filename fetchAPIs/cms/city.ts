// constants
import {
  DOMAIN,
  CITY_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { CityDocument } from "@/schemas/cms/city";

export const getCities = ({
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
      const url: string = `${DOMAIN}${CITY_API}${queryParams}`;

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
        "Error Getting Cities",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cities, Try Again"
          }
        ]
      });
    }
  });
};

export const getCity = (
  cityId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}/${cityId}`;

      const response: Response = await fetch(url);

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Getting City", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get City, Try Again"
          }
        ]
      });
    }
  });
};

export const addCity = (
  addData: Partial<CityDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}`;

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
      console.error("Error Adding City", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add City, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCity = (
  cityId: string,
  updateData: Partial<CityDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}/${cityId}`;

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
      console.error("Error Updating City", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update City, Try Again"
          }
        ]
      });
    }
  });
};

export const activateCity = (
  cityId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}/${cityId}`;

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
        `Error ${isActive ? "Deactivating" : "Activating"} City`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} City, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteCity = (
  cityId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CITY_API}/${cityId}`;

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
      console.error("Error Deleting City", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete City, Try Again"
          }
        ]
      });
    }
  });
};

export const getCityOptions =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${CITY_API}/options`;

          const response: Response =
            await fetch(url);

          const responseData: ResponseDataType =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          console.error(
            "Error Getting City Options",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Get City Options, Try Again"
              }
            ]
          });
        }
      }
    );
  };
