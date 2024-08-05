// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// controllers
import { verify } from "@/app/api/frontend/auth/whatsapp/controller";

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
    const { mobileNumber, orderId, otp } =
      await req.json();

    // OTPLESS operation
    const customer = await verify(
      mobileNumber,
      orderId,
      otp
    );

    // incorrect OTP
    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: [
            {
              type: "error",
              message: "Incorrect OTP, Try Again"
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
            message: "Mobile Number Verified"
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
    console.error("Error Verifying OTP:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Verify OTP, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
