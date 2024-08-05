// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAdvancePayment,
  updateAdvancePayment,
  deleteAdvancePayment
} from "@/app/api/cms/advance-payment/controller";

// constants
const ROUTE_SLUG = `/advance-payment/`;

// handle get Advance Payment
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const advancePayment =
      await getAdvancePayment(id);

    if (!advancePayment) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Advance Payment Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: advancePayment,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Advance Payment:",
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
              "Couldn't Get Advance Payment, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Advance Payment
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
    const advancePayment =
      await updateAdvancePayment(id, updateData);

    if (!advancePayment) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Advance Payment Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: advancePayment,
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
      "Error Updating Advance Payment:",
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
              "Couldn't Update Advance Payment, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Advance Payment
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const advancePayment =
      await deleteAdvancePayment(id);

    if (!advancePayment) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Advance Payment Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: advancePayment,
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
      "Error Deleting Advance Payment:",
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
              "Couldn't Delete Advance Payment, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
