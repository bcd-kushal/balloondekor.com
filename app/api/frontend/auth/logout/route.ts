// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";
import { TOKEN_MAX_AGE_LOGOUT } from "@/constants/frontend/auth";

// handlers
// logout
export async function GET() {
  try {
    // jwt token
    const token = sign({}, jwtSecret, {
      expiresIn: TOKEN_MAX_AGE_LOGOUT
    });

    // cookie
    const serialized = serialize(
      CUSTOMER_AUTH_COOKIE_NAME,
      token,
      {
        httpOnly: true,
        maxAge: TOKEN_MAX_AGE_LOGOUT,
        sameSite: "strict",
        path: "/"
      }
    );

    // success response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "success",
            message: "Logged Out"
          }
        ]
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized
        }
      }
    );
  } catch (error: any) {
    console.error("Error Logging Out:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Log Out, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
