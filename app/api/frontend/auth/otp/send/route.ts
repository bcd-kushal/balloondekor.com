// libraries
import { NextResponse } from "next/server";

// controllers
import { send } from "@/app/api/frontend/auth/otp/controller";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { mobileNumber } = await req.json();

    // OTPLESS operation
    const orderId = await send(mobileNumber);

    // invalid credentials *
    if (!orderId) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Send OTP, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: orderId,
        status: [
          {
            type: "success",
            message: `OTP send on ${mobileNumber}`
          }
        ]
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Sending OTP:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Send OTP, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
