// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getCancellationPolicy,
  updateCancellationPolicy,
  deleteCancellationPolicy
} from "@/app/api/cms/cancellation-policy/controller";

// constants
const ROUTE_SLUG = `/cancellation-policy/`;

// handle get Cancellation Policy
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const cancellationPolicy =
      await getCancellationPolicy(id);

    if (!cancellationPolicy) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Cancellation Policy Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cancellationPolicy,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Cancellation Policy:",
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
              "Couldn't Get Cancellation Policy, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Cancellation Policy
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
    const cancellationPolicy =
      await updateCancellationPolicy(
        id,
        updateData
      );

    if (!cancellationPolicy) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Cancellation Policy Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cancellationPolicy,
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
      "Error Updating Cancellation Policy:",
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
              "Couldn't Update Cancellation Policy, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Cancellation Policy
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const cancellationPolicy =
      await deleteCancellationPolicy(id);

    if (!cancellationPolicy) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Cancellation Policy Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cancellationPolicy,
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
      "Error Deleting Cancellation Policy:",
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
              "Couldn't Delete Cancellation Policy, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
