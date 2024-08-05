// libraries
import { NextResponse } from "next/server";

// controllers
import {
  eradicateCustomer,
  getCustomer
} from "@/app/api/cms/customer/controller";

// constants
const ROUTE_SLUG = `/customer/`;

// handle get Customer
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const customer = await getCustomer(id);

    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Customer Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customer,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Customer:",
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
              "Couldn't Get Customer, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const id: string = req.url
      .split(ROUTE_SLUG)[1]
      .split("?")[0];

    // DB operation
    const response = await eradicateCustomer(id);

    if (!response)
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Customer Not Found"
            }
          ]
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        data: null,
        status: []
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      "Error Deleting Customer:",
      err
    );

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Customer, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
