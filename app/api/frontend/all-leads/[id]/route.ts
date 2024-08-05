import { NextResponse } from "next/server";
import {
  getAllLeads,
  updateLeadStatus
} from "../controller";

const ROUTE_SLUG = "/api/frontend/all-leads/";

export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const leadId: string = req.url
      .split(ROUTE_SLUG)[1]
      .split("?")[0];

    const json = await req.json();
    const newStatus = json.selectedStatus;

    const response = await updateLeadStatus({
      id: leadId,
      newStatus: newStatus
    });

    if (!response) {
      return NextResponse.json(
        {
          data: null,
          status: {
            message:
              "Couldn't update status of lead",
            type: "error"
          }
        },
        { status: 400 }
      );
    }

    const updatedLeads = await getAllLeads();

    return NextResponse.json(
      {
        data: updatedLeads,
        status: {
          message:
            "Lead status updated successfully",
          type: "success"
        }
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      `Failed to update allLeads status: ${err}`
    );
    return NextResponse.json(
      {
        type: "error",
        message:
          "Failed to update allLeads status"
      },
      { status: 500 }
    );
  }
};
