// libraries
import { NextResponse } from "next/server";

// controllers
import { getOrder } from "@/app/api/cms/order/controller";

// constants
const ROUTE_SLUG = `/order/`;

// handle get Order
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const order = await getOrder(id);

    if (!order) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Order Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: order,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Order:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Order, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
