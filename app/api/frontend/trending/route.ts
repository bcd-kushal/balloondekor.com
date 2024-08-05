// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getTrendings } from "@/app/api/frontend/trending/controller";

// handle get cities
export const GET =
  async (): Promise<NextResponse> => {
    try {
      // DB operation
      const trendings = await getTrendings();

      if (!trendings.length) {
        // user error response
        return NextResponse.json([], {
          status: 400
        });
      }

      // success response
      return NextResponse.json(trendings, {
        status: 200
      });
    } catch (error: any) {
      console.error(
        "Error Getting Trendings:",
        error
      );

      // server error response
      return NextResponse.json([], {
        status: 500
      });
    }
  };
