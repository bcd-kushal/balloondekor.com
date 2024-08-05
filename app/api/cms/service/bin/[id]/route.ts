// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeleteService,
  restoreService
} from "@/app/api/cms/service/controller";

// constants
const ROUTE_SLUG = `/bin/`;

// handle restore page
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const service = await restoreService(id);

    if (!service) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Service Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: service,
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
      "Error Restoring Service:",
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
              "Couldn't Restore Service, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Page
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const service = await hardDeleteService(id);

    if (!service) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Service Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: service,
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
      "Error Hard Deleting Service:",
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
              "Couldn't Permanently Delete Service, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
