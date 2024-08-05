// libraries
import { NextResponse } from "next/server";

// controllers
import { checkCustomerRegistration } from "@/app/api/frontend/auth/password/controller";

// handlers
// login
export async function POST(req: Request) {
  try {
    // extract data
    const { mail } = await req.json();

    // DB operation
    const customer =
      await checkCustomerRegistration(mail);

    // invalid credentials *
    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: []
        },
        { status: 200 }
      );
    }

    // valid credentials
    // success response
    return NextResponse.json(
      {
        data: true,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Checking Registration Status:",
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
              "Couldn't Check Customer Registration Status, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
