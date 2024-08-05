// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getFooterLinkSections,
  addFooterLinkSection,
  reorderFooterLinkSections
} from "@/app/api/cms/footer-link-section/controller";

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
    const footerLinkSections =
      await getFooterLinkSections(queryParams);

    if (!footerLinkSections) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Footer Link Sections, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: footerLinkSections.count,
        data: footerLinkSections.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Footer Link Sections:",
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
              "Couldn't Get Footer Link Sections, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Footer Link Section
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const footerLinkSection =
      await addFooterLinkSection(addData);

    if (!footerLinkSection) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Footer Link Section, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: footerLinkSection,
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
      "Error Adding Footer Link Section:",
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
              "Couldn't Add Footer Link Section, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle reorder Footer Link Sections
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const { id1, id2 } = await req.json();

    // DB operation
    const reorderedFooterLinkSections =
      await reorderFooterLinkSections(id1, id2);

    if (!reorderedFooterLinkSections.length) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Reorder Footer Link Sections, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: reorderedFooterLinkSections,
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
      "Error Reordering Footer Link Sections:",
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
              "Couldn't Reorder Footer Link Sections, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
