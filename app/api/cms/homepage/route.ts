// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getHomepageLayouts,
  addHomepageLayout,
  reorderHomepageLayouts
} from "@/app/api/cms/homepage/controller";

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
        Boolean(urlParams.get("populate")) ||
        false,
      active:
        Boolean(urlParams.get("active")) || false,
      deleted:
        Boolean(urlParams.get("deleted")) ||
        false,
      offset:
        Number(urlParams.get("offset")) || 0,
      limit: Number(urlParams.get("limit")) || 0,
      sortBy: urlParams.get("sortBy") || "order",
      orderBy: urlParams.get("orderBy") || "asc",
      filterBy: urlParams.get("filterBy") || "",
      keyword: urlParams.get("keyword") || "",
      fromDate: urlParams.get("fromDate") || "",
      toDate: urlParams.get("toDate") || ""
    };

    // DB operation
    const homepageComponents =
      await getHomepageLayouts(queryParams);

    if (!homepageComponents) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Homepage Components, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: homepageComponents.count,
        data: homepageComponents.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Homepage Components:",
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
              "Couldn't Get Homepage Components, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Homepage Component
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const homepageComponent =
      await addHomepageLayout(addData);

    if (!homepageComponent) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Homepage Component, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: homepageComponent,
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
      "Error Adding Homepage Component:",
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
              "Couldn't Add Homepage Component, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Homepage Component
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const { id1, id2 } = await req.json();

    // DB operation
    const reorderedHomepageLayouts =
      await reorderHomepageLayouts(id1, id2);

    if (!reorderedHomepageLayouts.length) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Reorder Homepage Component, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: reorderedHomepageLayouts,
        status: [
          {
            type: "success",
            message: "Reordered"
          }
        ]
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error Reordering Homepage Component:",
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
              "Couldn't Reorder Homepage Component, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
