// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getReview,
  updateReview,
  deleteReview
} from "@/app/api/cms/review/controller";

// constants
const ROUTE_SLUG = `/review/`;

// handle get Review
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const review = await getReview(id);

    if (!review) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Review Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: review,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Review:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Review, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Review
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
    const review = await updateReview(
      id,
      updateData
    );

    if (!review) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Review Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: review,
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
      "Error Updating Review:",
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
              "Couldn't Update Review, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Review
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const review = await deleteReview(id);

    if (!review) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Review Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: review,
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
      "Error Deleting Review:",
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
              "Couldn't Delete Review, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
