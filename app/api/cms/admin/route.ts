// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAdmin,
  updateAdmin
} from "@/app/api/cms/admin/controller";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AdminDocument } from "@/schemas/cms/admin";

// handle get admin
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // DB operation
    const admin = await getAdmin();

    if (!admin) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Admin, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: admin,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Getting Admin:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Admin, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle update admin
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const updateData: Partial<AdminDocument> =
      await req.json();

    // DB operation
    const admin = await updateAdmin(
      updateData._id,
      updateData
    );

    if (!admin) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Update Admin, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: admin,
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
    console.error("Error Updating Admin:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Admin, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
