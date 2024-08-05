// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceCategory } from "@/app/api/frontend/service-category/controller";

// constants
const ROUTE_SLUG = `/service-category/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    let slug: string =
      req.url.split(ROUTE_SLUG)[1];
    slug = slug.substring(0, slug.length - 5);

    // DB operation
    const { category } =
      await getServiceCategory(slug);

    const res = {
      title: category?.metaTitle,
      description: category?.metaDescription,
      keywords: category?.metaTags
        ?.split(",")
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
      "Error Getting Categories metadata",
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
