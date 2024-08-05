import { AllLeadsDocument } from "@/schemas/cms/allLeads";
import { NextResponse } from "next/server";
import {
  addNewLead,
  deleteThisLead,
  getAllLeads
} from "./controller";

export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    const leadData: AllLeadsDocument =
      await req.json();

    const resStatus = await addNewLead(leadData);

    if (!resStatus) {
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Server error while adding data",
              type: "error"
            }
          ]
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: null,
        status: [
          {
            message: "Data saved successfully",
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
            message:
              "Failed to save data of new lead to db",
            type: "error"
          }
        ]
      },
      { status: 500 }
    );
  }
};

export const GET =
  async (): Promise<NextResponse> => {
    try {
      const resStatus = await getAllLeads();

      if (!resStatus) {
        return NextResponse.json(
          {
            data: null,
            status: [
              {
                message:
                  "Server error while adding data",
                type: "error"
              }
            ]
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          data: resStatus,
          status: [
            {
              message: "Data found",
              type: "success"
            }
          ]
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error(
        `Failed to get Leads: ${err}`
      );
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Failed to get leads to db",
              type: "error"
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
    const leadId: string = json.id;

    const deleteionResponse =
      deleteThisLead(leadId);

    if (!deleteionResponse) {
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Server error while deleting lead",
              type: "error"
            }
          ]
        },
        { status: 400 }
      );
    }

    const updatedLeads = await getAllLeads();

    return NextResponse.json(
      {
        data: updatedLeads,
        status: [
          {
            message: "Lead deleted successfully",
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
            message: "Failed to delete lead",
            type: "error"
          }
        ]
      },
      { status: 500 }
    );
  }
};
