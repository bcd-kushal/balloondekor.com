// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// controllers
import { addCustomer } from "@/app/api/frontend/auth/password/controller";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";
import { TOKEN_MAX_AGE_LOGIN } from "@/constants/frontend/auth";

// handlers
// register
export async function POST(req: Request) {
  try {
    // extract data
    const addData = await req.json();

    // DB operation
    const customer = await addCustomer(addData);

    // invalid credentials *
    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Mobile Number Is Already Registered"
            }
          ]
        },
        { status: 401 }
      );
    }

    // valid credentials
    // jwt token
    const token = sign(
      {
        id: customer._id
      },
      jwtSecret,
      {
        expiresIn: TOKEN_MAX_AGE_LOGIN
      }
    );

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
        data: null,
        status: [
          {
            type: "success",
            message: `Registered In As ${customer.name}`
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
    console.error("Error Registering:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Register, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
