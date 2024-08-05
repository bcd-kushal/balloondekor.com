// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getCart,
  updateCart
} from "@/app/api/frontend/cart/controller";

// constants
const ROUTE_SLUG = `/cart/`;

// handle get Cart
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const cart = await getCart(id);

    if (!cart) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Cart Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cart,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Cart:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Cart, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Cart
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    const { customerId, updateData } =
      await req.json();

    // DB operation
    const cart = await updateCart(
      id,
      customerId,
      updateData
    );

    if (!cart) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Cart Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cart,
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
    console.error("Error Updating Cart:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Cart, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
