// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getOrderProcessingTime,
  updateOrderProcessingTime,
  deleteOrderProcessingTime
} from "@/app/api/cms/order-processing-time/controller";

// constants
const ROUTE_SLUG = `/order-processing-time/`;

// handle get Order Processing Time
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const orderProcessingTime =
      await getOrderProcessingTime(id);

    if (!orderProcessingTime) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Order Processing Time Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: orderProcessingTime,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Order Processing Time:",
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
              "Couldn't Get Order Processing Time, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Order Processing Time
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
    const orderProcessingTime =
      await updateOrderProcessingTime(
        id,
        updateData
      );

    if (!orderProcessingTime) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Order Processing Time Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: orderProcessingTime,
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
      "Error Updating Order Processing Time:",
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
              "Couldn't Update Order Processing Time, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Order Processing Time
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const orderProcessingTime =
      await deleteOrderProcessingTime(id);

    if (!orderProcessingTime) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Order Processing Time Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: orderProcessingTime,
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
      "Error Deleting Order Processing Time:",
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
              "Couldn't Delete Order Processing Time, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
