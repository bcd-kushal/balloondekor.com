// libraries
import { NextResponse } from "next/server";

// controllers
import {
  addLead,
  deleteLead
} from "@/app/api/frontend/lead/controller";

// handle add Lead
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const lead = await addLead(addData);

    if (!lead) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Add Lead, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: lead,
        status: [
          {
            type: "success",
            message: "Added"
          }
        ]
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Adding Lead:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Lead, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const json = await req.json();
    const id: string = json.id;

    const deleteionResponse = deleteLead(id);

    if (!deleteionResponse) {
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Server error while deleting callback",
              type: "error"
            }
          ]
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: "success",
        status: [
          {
            message:
              "Callback deleted successfully",
            type: "success"
          }
        ]
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(`Failed to save Lead: ${err}`);
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            message: "Failed to delete callback",
            type: "error"
          }
        ]
      },
      { status: 500 }
    );
  }
};
