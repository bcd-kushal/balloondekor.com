// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAITag,
  updateAITag,
  deleteAITag
} from "@/app/api/cms/ai-tag/controller";

// constants
const ROUTE_SLUG = `/ai-tag/`;

// handle get AI Tag
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const aiTag = await getAITag(id);

    if (!aiTag) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "AI Tag Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: aiTag,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting AI Tag:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get AI Tag, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update AI Tag
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
    const aiTag = await updateAITag(
      id,
      updateData
    );

    if (!aiTag) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "AI Tag Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: aiTag,
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
      "Error Updating AI Tag:",
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
              "Couldn't Update AI Tag, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle delete AI Tag
export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id = req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const aiTag = await deleteAITag(id);

    if (!aiTag) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "AI Tag Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: aiTag,
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
      "Error Deleting AI Tag:",
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
              "Couldn't Delete AI Tag, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
