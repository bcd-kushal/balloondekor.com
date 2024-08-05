// libraries
import { NextResponse } from "next/server";

// controllers
import { resend } from "@/app/api/frontend/auth/otp/controller";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { orderId } = await req.json();

    // OTPLESS operation
    const newOrderId = await resend(orderId);

    // invalid credentials *
    if (!newOrderId) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Resend OTP, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: newOrderId,
        status: [
          {
            type: "success",
            message: `OTP Resend On ${orderId}`
          }
        ]
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Resending OTP:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Resend OTP, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
