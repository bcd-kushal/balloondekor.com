// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getPage } from "@/app/api/frontend/page/controller";

// constants
const ROUTE_SLUG = `/page/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    const [pageSlug, categorySlug] = slug.split(
      "/meta?category="
    );

    // DB operation
    const page = await getPage(
      categorySlug,
      pageSlug
    );

    if (!page) {
      return NextResponse.json(
        { data: null },
        {
          status: 404
        }
      );
    }

    const meta = {
      title: page.metaTitle || "",
      description: page.metaDescription || "",
      keywords:
        page.metaTags
          .split(",")
          .map((item) => item.trim()) || []
    };

    return NextResponse.json(
      { data: meta },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Service metadata",
      error
    );

    // server error response
    return NextResponse.json(
      { data: null },
      {
        status: 500
      }
    );
  }
};
