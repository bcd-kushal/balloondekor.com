import { NextResponse } from "next/server";
import {
  addNewVenue,
  getVenues
} from "./controller";
import { VenueDocument } from "@/schemas/services/venue";
import { QueryParamsType } from "@/types/cms/api";

export async function GET(
  req: Request
): Promise<NextResponse> {
  try {
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: QueryParamsType = {
      offset:
        Number(urlParams.get("offset")) || 0,
      limit: Number(urlParams.get("limit")) || 0,
      sortBy: urlParams.get("sortBy") || "",
      orderBy: urlParams.get("orderBy") || "asc",
      filterBy: urlParams.get("filterBy") || "",
      keyword: urlParams.get("keyword") || "",
      fromDate: urlParams.get("fromDate") || "",
      toDate: urlParams.get("toDate") || ""
    };

    const venues = await getVenues(queryParams);

    if (!venues)
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't get venue, try again"
            }
          ]
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        count: venues.count,
        status: [],
        data: venues.data
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[ERR] in venue types:: ${error}`
    );
    return NextResponse.json(
      {
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't get venue, try again"
          }
        ]
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    const newVenue = await req.json();

    const newDataResponse =
      await addNewVenue(newVenue);

    if (!newDataResponse)
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: `Couldn't add venue: ${newVenue}, try again`
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
            message: "Added"
          }
        ],
        data: newDataResponse
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      `[ERR] in venue type addition:: ${error}`
    );
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message: `Couldn't add venue, try again`
          }
        ]
      },
      { status: 500 }
    );
  }
}
