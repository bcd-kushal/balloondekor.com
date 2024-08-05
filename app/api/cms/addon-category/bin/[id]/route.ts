// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeleteAddonCategory,
  restoreAddonCategory
} from "@/app/api/cms/addon-category/controller";

// constants
const ROUTE_SLUG = `/bin/`;

// handle restore Addon Category
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addonCategory =
      await restoreAddonCategory(id);

    if (!addonCategory) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Addon Category Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: addonCategory,
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
      "Error Restoring Addon Category:",
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
              "Couldn't Restore Addon Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Addon Category
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addonCategory =
      await hardDeleteAddonCategory(id);

    if (!addonCategory) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Addon Category Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: addonCategory,
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
      "Error Hard Deleting Addon Category:",
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
              "Couldn't Permanently Delete Addon Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
