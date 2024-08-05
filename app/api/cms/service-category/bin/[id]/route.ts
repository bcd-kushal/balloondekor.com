// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeleteServiceCategory,
  restoreServiceCategory
} from "@/app/api/cms/service-category/controller";

// constants
const ROUTE_SLUG = `/bin/`;

// handle restore Service Category
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const serviceCategory =
      await restoreServiceCategory(id);

    if (!serviceCategory) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Service Category Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: serviceCategory,
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
      "Error Restoring Service Category:",
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
              "Couldn't Restore Service Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Service Category
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const serviceCategory =
      await hardDeleteServiceCategory(id);

    if (!serviceCategory) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Service Category Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: serviceCategory,
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
      "Error Hard Deleting Service Category:",
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
              "Couldn't Permanently Delete Service Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
