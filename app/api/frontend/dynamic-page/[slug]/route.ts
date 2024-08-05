// libraries
import { NextResponse } from "next/server";

// controllers
import { getDynamicPage } from "@/app/api/frontend/dynamic-page/controller";

// constants
const ROUTE_SLUG = `/dynamic-page/`;

// handle get dynamic page
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const dynamicPage =
      await getDynamicPage(slug);

    if (!dynamicPage) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(dynamicPage, {
      status: 200
    });
  } catch (error: any) {
    console.error(
      "Error Getting Dynamic Page:",
      error
    );

    // server error response
    return NextResponse.json(null, {
      status: 500
    });
  }
};
