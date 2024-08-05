// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceFormOptions } from "@/app/api/cms/service/controller";

// handle fetch service form options
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const servicesFormOptions =
      await getServiceFormOptions();

    if (!servicesFormOptions) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Service Form Options, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: servicesFormOptions,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Service Form Options:",
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
              "Couldn't Get Service Form Options, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
