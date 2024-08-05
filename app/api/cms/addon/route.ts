// libraries
import { NextResponse } from "next/server";

// controllers
import {
  getAddons,
  addAddon
} from "@/app/api/cms/addon/controller";

// types
import { QueryParamsType } from "@/types/cms/api";
import { AddonDocument } from "@/schemas/cms/addon";

// handle pagination, search, sort, filter
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting query parameters
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: QueryParamsType = {
      populate:
        urlParams.get("populate") === "true" ||
        false,
      active:
        urlParams.get("active") === "true" ||
        false,
      deleted:
        urlParams.get("deleted") === "true" ||
        false,
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

    // DB operation
    const addons = await getAddons(queryParams);

    if (!addons) {
      // user error response
      return NextResponse.json(
        {
          count: NaN,
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Addons, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: addons.count,
        data: addons.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Getting Addons:", error);

    // server error response
    return NextResponse.json(
      {
        count: NaN,
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Addons, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add Addon
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const addon = await addAddon(addData);

    if (!addon) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message: `"${(addData as Partial<AddonDocument>).name}" Addon Already Exists`
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        data: addon,
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
    console.error("Error Adding Addon:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Addon, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
