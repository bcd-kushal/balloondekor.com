// NextJS
export const dynamic = "force-dynamic";

// libraries
import { NextResponse } from "next/server";

// controllers
import { getServiceData } from "@/app/api/frontend/service/controller";
import { ImageDocument } from "@/schemas/cms/image";

// constants
const ROUTE_SLUG = `/service/`;

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  try {
    // extracting url parameters
    let slug: string =
      req.url.split(ROUTE_SLUG)[1];

    slug = slug
      .substring(0, slug.length - 5)
      ?.split("-")
      ?.join(" ");

    // DB operation
    const { service } =
      await getServiceData(slug);

    const res = {
      title: service?.meta.title,
      description: service?.meta.description,
      keywords: service?.meta.tags
        .split(",")
        .map((item) => item.trim()),
      images: [
        (service?.media.primary as ImageDocument)
          .url
      ]
    };

    return NextResponse.json(
      { data: res },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.error(
      "Error Getting Service metadata",
      error
    );

    // server error response
    return NextResponse.json(
      {},
      {
        status: 500
      }
    );
  }
};
