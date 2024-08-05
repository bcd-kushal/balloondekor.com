// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// controllers
import { getCustomer } from "../controller";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";
import { TOKEN_MAX_AGE_LOGIN } from "@/constants/frontend/auth";

// handlers
// login
export async function POST(req: Request) {
  try {
    // extract data
    const { mail, password } = await req.json();

    // DB operation
    const customer = await getCustomer(
      mail,
      password
    );

    // invalid credentials *
    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Invalid Credentials"
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
            message: `Logged In As ${customer.name}`
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
    console.error("Error Logging In:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message: "Couldn't Log In, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
