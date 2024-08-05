// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getFAQ,
  updateFAQ,
  deleteFAQ
} from "@/app/api/cms/faq/controller";

// constants
const ROUTE_SLUG = `/faq/`;

// handle get FAQ
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const faq = await getFAQ(id);

    if (!faq) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "FAQ Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: faq,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting FAQ:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Get FAQ, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update FAQ
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
    const faq = await updateFAQ(id, updateData);

    if (!faq) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "FAQ Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: faq,
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
    console.error("Error Updating FAQ:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update FAQ, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete FAQ
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const faq = await deleteFAQ(id);

    if (!faq) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "FAQ Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: faq,
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
    console.error("Error Deleting FAQ:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete FAQ, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
