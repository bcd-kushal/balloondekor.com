// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getSubPage } from "@/app/api/frontend/sub-page/controller";

// constants
const ROUTE_SLUG = `/sub-page/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    const [subPageSlug, queryParams] = slug.split(
      "/meta?category="
    );

    const [categorySlug, pageSlug] =
      queryParams.split("&page=");

    // DB operation
    const subPage = await getSubPage(
      categorySlug,
      pageSlug,
      subPageSlug
    );

    if (!subPage) {
      return NextResponse.json(
        { data: null },
        {
          status: 404
        }
      );
    }

    const meta = {
      title: subPage.metaTitle || "",
      description: subPage.metaDescription || "",
      keywords:
        subPage.metaTags
          ?.split(",")
          ?.map((item) => item.trim()) || []
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
