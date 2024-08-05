// libraries
import { NextResponse } from "next/server";

// controllers
import { getSubPage } from "@/app/api/frontend/sub-page/controller";

// constants
const ROUTE_SLUG = `/sub-page/`;

// handle get cities
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    const [subPageSlug, queryParams] =
      slug.split("?category=");

    const [categorySlug, pageSlug] =
      queryParams.split("&page=");

    // DB operation
    const subPage = await getSubPage(
      categorySlug,
      pageSlug,
      subPageSlug
    );

    if (!subPage) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(subPage, {
      status: 200
    });
  } catch (error: any) {
    console.error(
      "Error Getting Sub Page:",
      error
    );

    // server error response
    return NextResponse.json(null, {
      status: 500
    });
  }
};
