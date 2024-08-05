// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getNavLinks,
  addNavLink,
  reorderNavLinks
} from "@/app/api/cms/nav-link/controller";

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
    const navLinks =
      await getNavLinks(queryParams);

    if (!navLinks) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Nav Links, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: navLinks.count,
        data: navLinks.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Nav Links:",
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
              "Couldn't Get Nav Links, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Nav Link
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const navLink = await addNavLink(addData);

    if (!navLink) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Nav Link, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: navLink,
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
      "Error Adding Nav Link:",
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
              "Couldn't Add Nav Link, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle reorder Nav Links
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const { id1, id2 } = await req.json();

    // DB operation
    const reorderedNavLinks =
      await reorderNavLinks(id1, id2);

    if (!reorderedNavLinks.length) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Reorder Nav Link, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: reorderedNavLinks,
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
      "Error Reordering Nav Link:",
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
              "Couldn't Reorder Nav Link, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
