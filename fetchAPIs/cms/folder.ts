// constants
import {
  DOMAIN,
  FOLDER_API
} from "@/constants/cms/apiRoute";

// types
import { ResponseDataType } from "@/types/cms/api";
import { FolderDocument } from "@/schemas/cms/folder";

export const getFolders =
  (): Promise<ResponseDataType> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${FOLDER_API}`;

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
            "Error Getting Folders",
            error
          );

          reject({
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Get Folders, Try Again"
              }
            ]
          });
        }
      }
    );
  };

export const addFolder = (
  folder: FolderDocument
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${FOLDER_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(folder)
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
      console.error("Error Adding Folder", error);

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Folder, Try Again"
          }
        ]
      });
    }
  });
};

export const updateFolder = (
  folderId: string,
  folder: Partial<FolderDocument>
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${FOLDER_API}/${folderId}`;

      const response: Response = await fetch(
        url,
        {
          method: "PATCH",
          body: JSON.stringify(folder)
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
        "Error Updating Folder",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Folder, Try Again"
          }
        ]
      });
    }
  });
};

export const deleteFolder = (
  folderId: string
): Promise<ResponseDataType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${FOLDER_API}/${folderId}`;

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
        "Error Deleting Folder",
        error
      );

      reject({
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Folder, Try Again"
          }
        ]
      });
    }
  });
};
