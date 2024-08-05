// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getBrand,
  updateBrand,
  deleteBrand
} from "@/app/api/cms/brand/controller";

// constants
const ROUTE_SLUG = `/brand/`;

// handle get Brand
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const brand = await getBrand(id);

    if (!brand) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Brand Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: brand,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Brand:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Brand, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Brand
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
    const brand = await updateBrand(
      id,
      updateData
    );

    if (!brand) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Brand Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: brand,
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
    console.error("Error Updating Brand:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Brand, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Brand
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const brand = await deleteBrand(id);

    if (!brand) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Brand Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: brand,
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
    console.error("Error Deleting Brand:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete Brand, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
