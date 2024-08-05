// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getPageOptions } from "@/app/api/cms/page/controller";

// handle pagination, search, sort, filter
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const category =
      urlParams.get("category") === "true" ||
      false;

    // DB operation
    const pageOptions =
      await getPageOptions(category);

    if (!pageOptions) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Page Options, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: pageOptions,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Page Options:",
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
              "Couldn't Get Page Options, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
