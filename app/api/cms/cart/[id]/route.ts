// libraries
import { NextResponse } from "next/server";

// controllers
import { getCart } from "@/app/api/cms/cart/controller";

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
