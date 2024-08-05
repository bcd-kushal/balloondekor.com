import { NextResponse } from "next/server";
import {
  deleteVenue,
  getVenue,
  getVenues,
  updateVenue
} from "../controller";

const ROUTE_SLUG = `/presets/venue/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const venue = await getVenue(id);

    if (!venue) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: "Venue Not Found"
            }
          ]
        },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: venue,
        status: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Getting Venue:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Venue, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

export async function PATCH(
  req: Request
): Promise<NextResponse> {
  try {
    const id: string =
      req.url.split(ROUTE_SLUG)[1];
    const changedData = await req.json();

    const response = await updateVenue({
      id: id,
      newData: changedData
    });

    if (!response)
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't update venue, try again"
            }
          ]
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        status: [
          {
            type: "success",
            message: "Updated"
          }
        ],
        data: response
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[ERR] in venue types:: ${error}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't update venue, try again"
          }
        ]
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request
): Promise<NextResponse> {
  try {
    const id: string =
      req.url.split(ROUTE_SLUG)[1];

    const deletionResponse =
      await deleteVenue(id);

    if (!deletionResponse)
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't delete venue, try again"
            }
          ]
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        status: [
          {
            type: "success",
            message: "Deleted"
          }
        ],
        data: deletionResponse
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[ERR] in venue types:: ${error}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't delete venue, try again"
          }
        ]
      },
      { status: 500 }
    );
  }
}
