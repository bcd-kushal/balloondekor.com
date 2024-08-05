// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceData } from "@/app/api/frontend/service/controller";

// constants
const ROUTE_SLUG = `/service/`;

// handle get Service
export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    const serviceName: string = req.url
      .split(ROUTE_SLUG)[1]
      ?.split("-")
      ?.join(" ");

    // DB operation
    const serviceData =
      await getServiceData(serviceName);

    if (!serviceData.service) {
      // user error response
      return NextResponse.json(null, {
        status: 400
      });
    }

    // success response
    return NextResponse.json(serviceData, {
      status: 200
    });
  } catch (error: any) {
    console.error(
      "Error Getting Service Data:",
      error
    );

    // server error response
    return NextResponse.json(null, {
      status: 500
    });
  }
};
