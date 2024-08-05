// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getCities } from "@/app/api/frontend/city/controller";

// handle get cities
export const GET =
  async (): Promise<NextResponse> => {
    try {
      // DB operation
      const cities = await getCities();

      if (!cities.length) {
        // user error response
        return NextResponse.json([], {
          status: 400
        });
      }

      // success response
      return NextResponse.json(cities, {
        status: 200
      });
    } catch (error: any) {
      console.error(
        "Error Getting Cities:",
        error
      );

      // server error response
      return NextResponse.json([], {
        status: 500
      });
    }
  };
