// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAddonCategory,
  updateAddonCategory,
  softDeleteAddonCategory
} from "@/app/api/cms/addon-category/controller";

// constants
const ROUTE_SLUG = `/addon-category/`;

// handle get Addon Category
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addonCategory =
      await getAddonCategory(id);

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
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Addon Category:",
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
              "Couldn't Get Addon Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Addon Category
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    const updateData = await req.json();

    // DB operation
    const addonCategory =
      await updateAddonCategory(id, updateData);

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
            message: "Updated"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Updating Addon Category:",
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
              "Couldn't Update Addon Category, Try Again"
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
      await softDeleteAddonCategory(id);

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
            message: "Deleted"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Deleting Addon Category:",
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
              "Couldn't Delete Addon Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
