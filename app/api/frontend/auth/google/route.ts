// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// controllers
import { verify } from "@/app/api/frontend/auth/google/controller";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";
import { TOKEN_MAX_AGE_LOGIN } from "@/constants/frontend/auth";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { code } = await req.json();

    // OTPLESS operation
    const customer = await verify(code);

    // incorrect OTP
    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: [
            {
              type: "error",
              message: "Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // correct OTP
    // jwt token
    const userDetails = {
      id: customer._id,
      mobileNumber: customer.mobileNumber,
      name: customer.name
    };
    const token = sign(userDetails, jwtSecret, {
      expiresIn: TOKEN_MAX_AGE_LOGIN
    });

    // cookie
    const serialized = serialize(
      CUSTOMER_AUTH_COOKIE_NAME,
      token,
      {
        httpOnly: true,
        maxAge: TOKEN_MAX_AGE_LOGIN,
        sameSite: "strict",
        path: "/"
      }
    );

    // success response
    return NextResponse.json(
      {
        data: true,
        status: [
          {
            type: "success",
            message: "Logged In"
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
    console.error(
      "Error Verifying Google:",
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
              "Couldn't Verify Google, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
