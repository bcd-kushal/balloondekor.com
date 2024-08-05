// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getState,
  updateState,
  deleteState
} from "@/app/api/cms/state/controller";

// constants
const ROUTE_SLUG = `/state/`;

// handle get State
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const state = await getState(id);

    if (!state) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "State Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: state,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting State:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get State, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update State
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
    const state = await updateState(
      id,
      updateData
    );

    if (!state) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "State Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: state,
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
    console.error("Error Updating State:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update State, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete State
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const state = await deleteState(id);

    if (!state) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "State Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: state,
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
    console.error("Error Deleting State:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Delete State, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
