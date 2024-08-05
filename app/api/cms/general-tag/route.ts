// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getGeneralTags,
  addGeneralTag
} from "@/app/api/cms/general-tag/controller";

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
    const generalTags =
      await getGeneralTags(queryParams);

    if (!generalTags) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get General Tags, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: generalTags.count,
        data: generalTags.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting General Tags:",
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
              "Couldn't Get General Tags, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add General Tags
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const generalTag =
      await addGeneralTag(addData);

    if (!generalTag) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add General Tag, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: generalTag,
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
      "Error Adding General Tag:",
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
              "Couldn't Add General Tag, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
