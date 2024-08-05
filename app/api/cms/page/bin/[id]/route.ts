// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeletePage,
  restorePage
} from "@/app/api/cms/page/controller";

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
    const page = await restorePage(id);

    if (!page) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Page Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: page,
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
    console.error("Error Restoring Page:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Restore Page, Try Again"
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
    const page = await hardDeletePage(id);

    if (!page) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Page Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: page,
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
      "Error Hard Deleting Page:",
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
              "Couldn't Permanently Delete Page, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
