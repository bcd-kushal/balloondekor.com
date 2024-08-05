// libraries
import { NextResponse } from "next/server";

// controllers
import { getCartServices } from "@/app/api/frontend/cart/controller";

// handle add Cart
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const serviceIds: string[] = await req.json();

    // DB operation
    const services =
      await getCartServices(serviceIds);

    if (!services) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Cart Services, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: services,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Cart Services:",
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
              "Couldn't Get Cart Services, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
