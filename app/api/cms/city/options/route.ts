// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getCityOptions } from "@/app/api/cms/city/controller";

// handle get options
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const cityOptions = await getCityOptions();

    if (!cityOptions) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get City Options, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: cityOptions,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting City Options:",
      error
    );

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get City Options, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
