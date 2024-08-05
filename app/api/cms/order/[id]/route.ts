// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getOrder,
  updateOrderStatus
} from "@/app/api/cms/order/controller";
import { LineItemStatusTypes } from "@/components/cms/orders/OrdersPage";

type OrderUpdatePropsType = {
  orderId: string;
  orderDetailId: string;
  lineItemId: string;
  newStatus: LineItemStatusTypes;
  currStatus: LineItemStatusTypes;
};

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

export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const orderId = req.url
      .split(ROUTE_SLUG)[1]
      .split("?")[0];
    const updatedData: OrderUpdatePropsType =
      await req.json();

    const response =
      await updateOrderStatus(updatedData);

    if (!response)
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Couldnt update status of order",
              type: "error"
            }
          ]
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        data: null,
        status: [
          {
            message:
              "Order status changed successfully!",
            type: "success"
          }
        ]
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      `Couldnt update status of order: ${err}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldnt update status of order"
          }
        ]
      },
      { status: 500 }
    );
  }
};
