// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getNavLink,
  updateNavLink,
  deleteNavLink
} from "@/app/api/cms/nav-link/controller";

// constants
const ROUTE_SLUG = `/nav-link/`;

// handle get Nav Link
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const navLink = await getNavLink(id);

    if (!navLink) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Nav Link Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: navLink,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Nav Link:",
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
              "Couldn't Get Nav Link, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Nav Link
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
    const navLink = await updateNavLink(
      id,
      updateData
    );

    if (!navLink) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Nav Link Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: navLink,
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
      "Error Updating Nav Link:",
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
              "Couldn't Update Nav Link, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Nav Link
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const navLink = await deleteNavLink(id);

    if (!navLink) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Nav Link Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: navLink,
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
      "Error Deleting Nav Link:",
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
              "Couldn't Delete Nav Link, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
