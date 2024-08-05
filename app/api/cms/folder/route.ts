// libraries
import { NextResponse } from "next/server";

// controllers
import {
  addFolder,
  getFolders
} from "./controller";

// handle get folders
export const GET =
  async (): Promise<NextResponse> => {
    try {
      // DB operation
      const folders = await getFolders();

      if (!folders) {
        // user error response
        return NextResponse.json(
          {
            data: null,
            status: [
              {
                type: "error",
                message:
                  "Couldn't Get Folders, Try Again"
              }
            ]
          },
          { status: 400 }
        );
      }

      // success response
      return NextResponse.json(
        { data: folders, status: [] },
        {
          status: 200
        }
      );
    } catch (error: any) {
      console.error(
        "Error Getting Folders:",
        error
      );

      // server error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Folders, Try Again"
            }
          ]
        },
        { status: 500 }
      );
    }
  };

// handle add folder
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const folder = await addFolder(addData);

    if (!folder) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Folder, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: folder,
        status: [
          {
            type: "success",
            message: "Added"
          }
        ]
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Adding Folder:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Folder, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
