// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getOrders } from "@/app/api/cms/order/controller";

// types
import { QueryParamsType } from "@/types/cms/api";

type OrderType =
  | "new-order"
  | "in-progress"
  | "delivered"
  | "cancelled";

// handle pagination, search, sort, filter
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting query parameters
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: QueryParamsType & {
      orderType: OrderType;
    } = {
      populate:
        urlParams.get("populate") === "true" ||
        true,
      offset:
        Number(urlParams.get("offset")) || 0,
      limit: Number(urlParams.get("limit")) || 0,
      sortBy: urlParams.get("sortBy") || "",
      orderBy: urlParams.get("orderBy") || "asc",
      filterBy: urlParams.get("filterBy") || "",
      keyword: urlParams.get("keyword") || "",
      fromDate: urlParams.get("fromDate") || "",
      toDate: urlParams.get("toDate") || "",
      orderType:
        (urlParams.get(
          "orderType"
        ) as OrderType) || "new-order"
    };

    // DB operation
    const orders = await getOrders(queryParams);

    if (!orders) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Orders, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: orders.count,
        data: orders.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Getting Orders:", error);

    // server error response
    return NextResponse.json(
      {
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Orders, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
