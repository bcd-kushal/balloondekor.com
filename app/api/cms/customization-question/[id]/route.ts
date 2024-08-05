// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getCustomizationQuestion,
  updateCustomizationQuestion,
  deleteCustomizationQuestion
} from "@/app/api/cms/customization-question/controller";

// constants
const ROUTE_SLUG = `/customization-question/`;

// handle get Customization Question
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const customizationQuestion =
      await getCustomizationQuestion(id);

    if (!customizationQuestion) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Customization Question Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customizationQuestion,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Customization Question:",
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
              "Couldn't Get Customization Question, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Customization Question
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
    const customizationQuestion =
      await updateCustomizationQuestion(
        id,
        updateData
      );

    if (!customizationQuestion) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Customization Question Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customizationQuestion,
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
      "Error Updating Customization Question:",
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
              "Couldn't Update Customization Question, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete Customization Question
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const customizationQuestion =
      await deleteCustomizationQuestion(id);

    if (!customizationQuestion) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Customization Question Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customizationQuestion,
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
      "Error Deleting Customization Question:",
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
              "Couldn't Delete Customization Question, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
