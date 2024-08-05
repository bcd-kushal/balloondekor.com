// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getSettings,
  addSettings
} from "@/app/api/cms/setting/controller";

// handle get settings
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const settings = await getSettings();

    if (!settings) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Settings, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: settings,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Settings:",
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
              "Couldn't Get Settings, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add settings
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const settings = await addSettings(addData);

    if (!settings) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Settings, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: settings,
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
      "Error Adding Settings:",
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
              "Couldn't Add Settings, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
