// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAddon,
  updateAddon,
  softDeleteAddon
} from "@/app/api/cms/addon/controller";

// constants
const ROUTE_SLUG = `/addon/`;

// handle get Addon
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const addon = await getAddon(id);

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
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Addon:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Addon, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Addon
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
    const addon = await updateAddon(
      id,
      updateData
    );

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
            message: "Updated"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Updating Addon:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Addon, Try Again"
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
    const addon = await softDeleteAddon(id);

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
            message: "Deleted"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Deleting Addon:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Addon, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
