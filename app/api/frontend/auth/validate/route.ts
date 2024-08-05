// libraries
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";

// handlers
// validate token
export async function GET() {
  try {
    // cookies
    const cookieStore = cookies();

    // current token
    const token = cookieStore.get(
      CUSTOMER_AUTH_COOKIE_NAME
    );

    // no token
    if (!token) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: [
            {
              type: "",
              message: ""
            }
          ]
        },
        { status: 401 }
      );
    }

    // validate token
    const { value } = token;

    const tokenValues = verify(value, jwtSecret);

    // invalid token
    if (!tokenValues) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: [
            {
              type: "",
              message: ""
            }
          ]
        },
        { status: 401 }
      );
    }

    // valid token
    // success response
    return NextResponse.json(
      {
        data: true,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Validate Authentication, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
