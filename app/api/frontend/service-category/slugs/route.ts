// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceCategorySlugs } from "@/app/api/frontend/service-category/controller";

// handle get Service slugs
export const GET =
  async (): Promise<NextResponse> => {
    try {
      // DB operation
      const slugs =
        await getServiceCategorySlugs();

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
        "Error Getting Service Category Slugs:",
        error
      );

      // server error response
      return NextResponse.json(null, {
        status: 500
      });
    }
  };
