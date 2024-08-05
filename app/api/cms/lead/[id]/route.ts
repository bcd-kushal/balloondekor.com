// libraries
import { NextResponse } from "next/server";

// controllers
import { updateLead } from "@/app/api/cms/lead/controller";

// constants
const ROUTE_SLUG = `/lead/`;

// handle update Lead
export const PATCH = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameter
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // extracting data
    const updateData = await req.json();

    // DB operation
    const lead = await updateLead(id, updateData);

    if (!lead) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Lead Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: lead,
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
    console.error("Error Updating Lead:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Update Lead, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
