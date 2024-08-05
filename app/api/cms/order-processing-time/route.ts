// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getOrderProcessingTimes,
  addOrderProcessingTime
} from "@/app/api/cms/order-processing-time/controller";

// types
import { QueryParamsType } from "@/types/cms/api";

// handle pagination, search, sort, filter
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting query parameters
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: QueryParamsType = {
      active:
        urlParams.get("active") === "true" ||
        false,
      deleted:
        urlParams.get("deleted") === "true" ||
        false,
      offset:
        Number(urlParams.get("offset")) || 0,
      limit: Number(urlParams.get("limit")) || 0,
      sortBy: urlParams.get("sortBy") || "",
      orderBy: urlParams.get("orderBy") || "asc",
      filterBy: urlParams.get("filterBy") || "",
      keyword: urlParams.get("keyword") || "",
      fromDate: urlParams.get("fromDate") || "",
      toDate: urlParams.get("toDate") || ""
    };

    // DB operation
    const orderProcessingTimes =
      await getOrderProcessingTimes(queryParams);

    if (!orderProcessingTimes) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Order Processing Times, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: orderProcessingTimes.count,
        data: orderProcessingTimes.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Order Processing Times:",
      error
    );

    // server error response
    return NextResponse.json(
      {
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Order Processing Times, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Order Processing Time
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const orderProcessingTime =
      await addOrderProcessingTime(addData);

    if (!orderProcessingTime) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Order Processing Time, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: orderProcessingTime,
        status: [
          {
            type: "success",
            message: "Added"
          }
        ]
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error Adding Order Processing Time:",
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
              "Couldn't Add Order Processing Time, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
