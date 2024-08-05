// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getSubPages,
  addSubPage
} from "@/app/api/cms/sub-page/controller";

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
    const subPages =
      await getSubPages(queryParams);

    if (!subPages) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Sub Pages, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: subPages.count,
        data: subPages.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Sub Pages:",
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
              "Couldn't Get Sub Pages, Try Again"
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
    const subPageData = await addSubPage(addData);

    if (!subPageData.ok) {
      // user error response
      return NextResponse.json(
        {
          data: subPageData.data,
          status: [
            {
              type: "error",
              message: subPageData.message
            }
          ]
        },
        { status: subPageData.statusCode }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: subPageData.data,
        status: [
          {
            type: "success",
            message: "Added"
          }
        ]
      },
      { status: subPageData.statusCode }
    );
  } catch (error: any) {
    console.error(
      "Error Adding Sub Page:",
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
              "Couldn't Add Sub Page, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
