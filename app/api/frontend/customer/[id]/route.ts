// libraries
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// constants
import { CUSTOMER_AUTH_COOKIE_NAME } from "@/constants/cookies/frontend/auth";
import { TOKEN_MAX_AGE_LOGOUT } from "@/constants/frontend/auth";

// env
const jwtSecret =
  process.env.BALLOONDEKOR_JWT_SECRET || "";

// controllers
import {
  getCustomer,
  updateCustomer
} from "@/app/api/frontend/customer/controller";

// constants
const ROUTE_SLUG = `/customer/`;

// handle get Customer
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const customer = await getCustomer(id);

    if (!customer) {
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

      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Customer Not Found"
            }
          ]
        },
        {
          status: 404,
          headers: {
            "Set-Cookie": serialized
          }
        }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customer,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Customer:",
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
              "Couldn't Get Customer, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update Customer
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    // const { customerId, updateData } =
    //   await req.json();
    const updateData = await req.json();

    // DB operation
    const customer = await updateCustomer(
      id,
      updateData
    );

    if (!customer) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Duplicate Field Value"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: customer,
        status: [
          {
            type: "success",
            message: "Updated"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Updating Customer:",
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
              "Couldn't Update Customer, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
