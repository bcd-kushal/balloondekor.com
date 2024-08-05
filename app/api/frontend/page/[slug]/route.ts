// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getPage } from "@/app/api/frontend/page/controller";

// constants
const ROUTE_SLUG = `/page/`;

// handle get cities
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    const [pageSlug, categorySlug] =
      slug.split("?category=");

    // DB operation
    const page = await getPage(
      categorySlug,
      pageSlug
    );

    if (!page) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(page, {
      status: 200
    });
  } catch (error: any) {
    console.error("Error Getting page:", error);

    // server error response
    return NextResponse.json(null, {
      status: 500
    });
  }
};
