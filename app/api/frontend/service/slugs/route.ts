// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceSlugs } from "@/app/api/frontend/service/controller";

// handle get Service slugs
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const slugs = await getServiceSlugs();

    if (!slugs) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(slugs, {
      status: 200
    });
  } catch (error: any) {
    console.error(
      "Error Getting Service Slugs:",
      error
    );

    // server error response
    return NextResponse.json(null, {
      status: 500
    });
  }
};
