// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getDynamicPage } from "@/app/api/frontend/dynamic-page/controller";

// constants
const ROUTE_SLUG = `/dynamic-page/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    let slug: string =
      req.url.split(ROUTE_SLUG)[1];

    slug = slug.substring(0, slug.length - 5);

    // DB operation
    const data = await getDynamicPage(slug);

    const res = {
      title: data?.metaTitle,
      description: data?.metaDescription,
      keywords: (data?.metaTags || "")
        .split(",")
        .map((item) => item.trim())
    };

    return NextResponse.json(
      { data: res },
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
      {},
      {
        status: 500
      }
    );
  }
};
