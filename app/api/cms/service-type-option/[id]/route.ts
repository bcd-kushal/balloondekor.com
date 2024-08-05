// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getServiceTypeOption,
  updateServiceTypeOption,
  deleteServiceTypeOption
} from "@/app/api/cms/service-type-option/controller";

// constants
const ROUTE_SLUG = `/service-type-option/`;

// handle get Service Type Option
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const serviceTypeOption =
      await getServiceTypeOption(id);

    if (!serviceTypeOption) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Service Type Option Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: serviceTypeOption,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Service Type Option:",
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
              "Couldn't Get Service Type Option, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Service Type Option
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
    const serviceTypeOption =
      await updateServiceTypeOption(
        id,
        updateData
      );

    if (!serviceTypeOption) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Service Type Option Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: serviceTypeOption,
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
      "Error Updating Service Type Option:",
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
              "Couldn't Update Service Type Option, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Service Type Option
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const serviceTypeOption =
      await deleteServiceTypeOption(id);

    if (!serviceTypeOption) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Service Type Option Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: serviceTypeOption,
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
      "Error Deleting Service Type Option:",
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
              "Couldn't Delete Service Type Option, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
