// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getFooterLinkSection,
  updateFooterLinkSection,
  deleteFooterLinkSection
} from "@/app/api/cms/footer-link-section/controller";

// constants
const ROUTE_SLUG = `/footer-link-section/`;

// handle get Footer Link Section
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const footerLinkSection =
      await getFooterLinkSection(id);

    if (!footerLinkSection) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Footer Link Section Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: footerLinkSection,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Footer Link Section:",
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
              "Couldn't Get Footer Link Section, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Footer Link Section
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    const updateData = await req.json();

    // DB operation
    const footerLinkSection =
      await updateFooterLinkSection(
        id,
        updateData
      );

    if (!footerLinkSection) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Footer Link Section Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: footerLinkSection,
        status: [
          {
            type: "success",
            message: "Updated"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Updating Footer Link Section:",
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
              "Couldn't Update Footer Link Section, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Footer Link Section
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const footerLinkSection =
      await deleteFooterLinkSection(id);

    if (!footerLinkSection) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Footer Link Section Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: footerLinkSection,
        status: [
          {
            type: "success",
            message: "Deleted"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Deleting Footer Link Section:",
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
              "Couldn't Delete Footer Link Section, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
