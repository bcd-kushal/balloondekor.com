// libraries
import { NextResponse } from "next/server";

// controllers
import { getPageCategory } from "@/app/api/cms/page/controller";

// constants
const ROUTE_SLUG = `/category/`;

// handle get Page
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const category = await getPageCategory(id);

    if (!category) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Page Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: category,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Page Category:",
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
              "Couldn't Get Page Category, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
