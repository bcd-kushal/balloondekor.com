// libraries
import { NextResponse } from "next/server";

// controllers
import { updateCustomerPassword } from "@/app/api/frontend/customer/controller";

// constants
const ROUTE_SLUG = `/password/`;

// handle update Customer
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const customerId: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    const { currentPassword, newPassword } =
      await req.json();

    // DB operation
    const hasChanged =
      await updateCustomerPassword(
        customerId,
        currentPassword,
        newPassword
      );

    if (!hasChanged) {
      // user error response
      return NextResponse.json(
        {
          data: false,
          status: [
            {
              type: "error",
              message: "Incorrect Old Password"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: hasChanged,
        status: [
          {
            type: "success",
            message: "Password Updated"
          }
        ]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error Updating Customer Password:",
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
              "Couldn't Update Password, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
