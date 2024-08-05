// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getDeliveryDetails,
  addDeliveryDetail
} from "@/app/api/cms/delivery-detail/controller";

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
    const deliveryDetails =
      await getDeliveryDetails(queryParams);

    if (!deliveryDetails) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Delivery Detail, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: deliveryDetails.count,
        data: deliveryDetails.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Delivery Detail:",
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
              "Couldn't Get Delivery Detail, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Delivery Detail
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const deliveryDetail =
      await addDeliveryDetail(addData);

    if (!deliveryDetail) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Delivery Detail, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: deliveryDetail,
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
      "Error Adding Delivery Detail:",
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
              "Couldn't Add Delivery Detail, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
