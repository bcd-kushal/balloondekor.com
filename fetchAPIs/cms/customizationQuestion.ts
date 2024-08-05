// constants
import {
  DOMAIN,
  CUSTOMIZATION_QUESTION_API
} from "@/constants/cms/apiRoute";

// types
import {
  QueryParamsType,
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";

export const getCustomizationQuestions = ({
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
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}${queryParams}`;

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
        "Error Getting Customization Questions",
        error
      );

      reject({
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Customization Questions, Try Again"
          }
        ]
      });
    }
  });
};

export const getCustomizationQuestion = (
  customizationQuestionId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}/${customizationQuestionId}`;

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
        "Error Getting Customization Question",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Customization Question, Try Again"
          }
        ]
      });
    }
  });
};

export const addCustomizationQuestion = (
  addData: Partial<CustomizationQuestionDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}`;

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
        "Error Adding Customization Question",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Customization Question, Try Again"
          }
        ]
      });
    }
  });
};

export const updateCustomizationQuestion = (
  customizationQuestionId: string,
  updateData: Partial<CustomizationQuestionDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}/${customizationQuestionId}`;

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
        "Error Updating Customization Question",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Customization Question, Try Again"
          }
        ]
      });
    }
  });
};

export const activateCustomizationQuestion = (
  customizationQuestionId: string,
  isActive: boolean
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}/${customizationQuestionId}`;

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
        `Error ${isActive ? "Deactivating" : "Activating"} Customization Question`,
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't ${isActive ? "Deactivate" : "Activate"} Customization Question, Try Again`
          }
        ]
      });
    }
  });
};

export const deleteCustomizationQuestion = (
  customizationQuestionId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${CUSTOMIZATION_QUESTION_API}/${customizationQuestionId}`;

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
        "Error Deleting Customization Question",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Customization Question, Try Again"
          }
        ]
      });
    }
  });
};
