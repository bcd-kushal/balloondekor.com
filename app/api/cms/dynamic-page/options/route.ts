// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getDynamicPageOptions } from "@/app/api/cms/dynamic-page/controller";

// handle get dynamic page options
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const dynamicPageOptions =
      await getDynamicPageOptions();

    if (!dynamicPageOptions) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Dynamic Page Options, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: dynamicPageOptions,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Dynamic Page Options:",
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
              "Couldn't Get Dynamic Page Options, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
