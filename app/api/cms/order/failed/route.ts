import { QueryParamsType } from "@/types/cms/api";
import { NextResponse } from "next/server";
import { getFailedOrders } from "../controller";

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting query parameters
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: QueryParamsType = {
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
      toDate: urlParams.get("toDate") || ""
    };

    // DB operation
    const failedOrders =
      await getFailedOrders(queryParams);

    if (!failedOrders) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't GET Failed Orders, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: failedOrders.count,
        data: failedOrders.data,
        status: [
          {
            type: "success",
            message:
              "Failed Orders fetched successfully"
          }
        ]
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
              "Couldn't GET Failed Orders, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
