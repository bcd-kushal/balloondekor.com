// libraries
import { NextResponse } from "next/server";

// controllers
import { updateSettings } from "@/app/api/cms/setting/controller";

// constants
const ROUTE_SLUG = `/setting/`;

// handle update Product
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
    const settings = await updateSettings(
      id,
      updateData
    );

    if (!settings) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Settings Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: settings,
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
      "Error Updating Settings:",
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
              "Couldn't Update Settings, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
