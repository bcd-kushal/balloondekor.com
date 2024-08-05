// libraries
import { NextResponse } from "next/server";

// controllers
import {
  addImages,
  getImages
} from "./controller";

// types
import { QueryParamsType } from "@/types/cms/api";
export interface ImageQueryParamsType
  extends QueryParamsType {
  folderId: string;
}

// handle pagination, search, sort, filter
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting query parameters
    const urlParams: URLSearchParams =
      new URLSearchParams(req.url.split("?")[1]);

    const queryParams: ImageQueryParamsType = {
      folderId: urlParams.get("folderId") || "",
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
    const result = await getImages(queryParams);

    if (!result) {
      // user error response
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              type: "error",
              message:
                "Couldn't Get Images, Try Again"
            }
          ]
        },
        { status: 400 }
      );
    }

    // success response
    return NextResponse.json(
      {
        count: result.count,
        data: result.data,
        status: []
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error Getting Images:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Get Images, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};

// handle add images
export const POST = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting data
    const addData = await req.json();

    // DB operation
    const images = await addImages(addData);

    // response
    return NextResponse.json(
      {
        data: null,
        status: images.map(
          ({ name, status }) => ({
            type: status,
            message:
              status === "success"
                ? `Added "${name}"`
                : `Couldn't Add "${name}"`
          })
        )
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Adding Images:", error);

    // server error response
    return NextResponse.json(
      {
        data: null,
        status: [
          {
            type: "error",
            message:
              "Couldn't Add Images, Try Again"
          }
        ]
      },
      { status: 500 }
    );
  }
};
