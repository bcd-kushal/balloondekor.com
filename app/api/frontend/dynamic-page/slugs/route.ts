// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getDynamicPageSlugs } from "@/app/api/frontend/dynamic-page/controller";

// handle get Service slugs
export const GET =
  async (): Promise<NextResponse> => {
    try {
      // DB operation
      const slugs = await getDynamicPageSlugs();

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
        "Error Getting Dynamic Page Slugs:",
        error
      );

      // server error response
      return NextResponse.json(null, {
        status: 500
      });
    }
  };
