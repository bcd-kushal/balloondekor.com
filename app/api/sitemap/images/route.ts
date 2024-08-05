import { getImages } from "@/app/api/cms/image/controller";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET =
  async (): Promise<NextResponse> => {
    try {
      const images = await getImages({
        sortBy: "",
        filterBy: "",
        folderId: "",
        fromDate: "",
        keyword: "",
        limit: 0,
        offset: 0,
        orderBy: "",
        toDate: ""
      });

      if (!images)
        return NextResponse.json(
          {
            count: NaN,
            data: {
              message:
                "Couldn't get images, try again"
            }
          },
          { status: 300 }
        );

      return NextResponse.json(images, {
        status: 200
      });
    } catch (err: any) {
      console.error(
        `Error getting images: ${err}`
      );
      return NextResponse.json(
        {
          count: NaN,
          data: {
            message: "ERR: Internal server error"
          }
        },
        { status: 500 }
      );
    }
  };
