// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// controllers
import { getAdmin } from "../controller";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// constants
import { TOKEN_MAX_AGE_LOGIN } from "@/constants/cms/auth";

// handlers
// login
export async function POST(req: Request) {
  try {
    // extract data
    const { userName, password, answer } =
      await req.json();

    // DB operation
    const admin = await getAdmin(
      userName,
      password,
      answer
    );

    // invalid credentials *
    if (!admin) {
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
        userName: admin.userName
        // permissions: admin.permissions
      },
      jwtSecret,
      {
        expiresIn: TOKEN_MAX_AGE_LOGIN
      }
    );

    // cookie
    const serialized = serialize(
      "adminToken",
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
            message: `Logged In As ${admin.userName}`
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
