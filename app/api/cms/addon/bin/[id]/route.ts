// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeleteAddon,
  restoreAddon
} from "@/app/api/cms/addon/controller";

// constants
const ROUTE_SLUG = `/bin/`;

// handle restore Addon
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addon = await restoreAddon(id);

    if (!addon) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Addon Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: addon,
        status: [
          {
            type: "success",
            message: "Restored"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Restoring Addon:",
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
              "Couldn't Restore Addon, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Addon
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addon = await hardDeleteAddon(id);

    if (!addon) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Addon Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: addon,
        status: [
          {
            type: "success",
            message: "Permanently Deleted"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Hard Deleting Addon:",
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
              "Couldn't Permanently Delete Addon, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
