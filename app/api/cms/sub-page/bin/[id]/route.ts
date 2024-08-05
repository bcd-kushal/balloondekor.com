// libraries
import { NextResponse } from "next/server";

// controllers
import {
  hardDeleteSubPage,
  restoreSubPage
} from "@/app/api/cms/sub-page/controller";

// constants
const ROUTE_SLUG = `/bin/`;

// handle restore sub page
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const subPage = await restoreSubPage(id);

    if (!subPage) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Sub Page Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: subPage,
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
      "Error Restoring Sub Page:",
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
              "Couldn't Restore Sub Page, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete sub page
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const subPage = await hardDeleteSubPage(id);

    if (!subPage) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Sub Page Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: subPage,
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
      "Error Hard Deleting Sub Page:",
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
              "Couldn't Permanently Delete Sub Page, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
