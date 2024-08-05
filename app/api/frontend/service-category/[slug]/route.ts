// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceCategory } from "@/app/api/frontend/service-category/controller";

// constants
const ROUTE_SLUG = `/service-category/`;

// handle get cities
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const slug: string =
      req.url.split(ROUTE_SLUG)[1];

    // DB operation
    const serviceCategoryData =
      await getServiceCategory(slug);

    if (!serviceCategoryData) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(
      serviceCategoryData,
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Service Category:",
      error
    );

    // server error response
    return NextResponse.json(
      {
        category: null,
        services: []
      },
      {
        status: 500
      }
    );
  }
};
