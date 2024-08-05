// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getDeliveryDetail,
  updateDeliveryDetail,
  deleteDeliveryDetail
} from "@/app/api/cms/delivery-detail/controller";

// constants
const ROUTE_SLUG = `/delivery-detail/`;

// handle get Delivery Detail
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const deliveryDetail =
      await getDeliveryDetail(id);

    if (!deliveryDetail) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Delivery Detail Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: deliveryDetail,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Delivery Detail:",
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
              "Couldn't Get Delivery Detail, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Delivery Detail
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
    const deliveryDetail =
      await updateDeliveryDetail(id, updateData);

    if (!deliveryDetail) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Delivery Detail Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: deliveryDetail,
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
      "Error Updating Delivery Detail:",
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
              "Couldn't Update Delivery Detail, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Delivery Detail
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const deliveryDetail =
      await deleteDeliveryDetail(id);

    if (!deliveryDetail) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Delivery Detail Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: deliveryDetail,
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
      "Error Deleting Delivery Detail:",
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
              "Couldn't Delete Delivery Detail, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
