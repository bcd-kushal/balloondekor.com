// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getPages,
  addPage
} from "@/app/api/cms/page/controller";

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
      populate:
        urlParams.get("populate") === "true" ||
        false,
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
      orderBy: urlParams.get("orderBy") || "desc",
      filterBy: urlParams.get("filterBy") || "",
      keyword: urlParams.get("keyword") || "",
      fromDate: urlParams.get("fromDate") || "",
      toDate: urlParams.get("toDate") || ""
    };

    // DB operation
    const pages = await getPages(queryParams);

    if (!pages) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Pages, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: pages.count,
        data: pages.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Getting Pages:", error);

    // server error response
    return NextResponse.json(
      {
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Pages, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Page
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const pageData = await addPage(addData);

    if (!pageData.ok) {
      // user error response
      return NextResponse.json(
        {
          data: pageData.data,
          status: [
            {
              type: "error",
              message: pageData.message
            }
          ]
        },
        { status: pageData.statusCode }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: pageData.data,
        status: [
          {
            type: "success",
            message: "Added"
          }
        ]
      },
      { status: pageData.statusCode }
    );
  } catch (error: any) {
    console.error("Error Adding Page:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Page, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
