import { NextResponse } from "next/server";
import { getSearchData } from "./controller";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { ImageDocument } from "@/schemas/cms/image";
import { CityDocument } from "@/schemas/cms/city";

export const GET =
  async (): Promise<NextResponse> => {
    try {
      const searchData: ServiceDocument[] | null =
        await getSearchData();

      if (!searchData) {
        return NextResponse.json(
          {
            data: null,
            status: [
              {
                message:
                  "Couldnt get search list data",
                type: "error"
              }
            ]
          },
          { status: 400 }
        );
      }

      const responseReadyData = searchData.map(
        ({
          name,
          category,
          media: { primary },
          price
        }) => ({
          name,
          category: {
            name: (
              category as ServiceCategoryDocument
            ).name,
            slug: (
              category as ServiceCategoryDocument
            ).slug
          },
          img: (primary as ImageDocument).url,
          price: [
            ["base", price.base.price],
            ...price.cities.map(
              ({ city, price }) => [
                (city as CityDocument).name,
                price
              ]
            )
          ]
        })
      );

      return NextResponse.json(
        {
          data: responseReadyData,
          status: [
            {
              message: "Search data found",
              type: "success"
            }
          ]
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error(
        `Error getting service list for search: `,
        err
      );
      return NextResponse.json(
        {
          data: null,
          status: [
            {
              message:
                "Couldn't get search list data",
              type: "error"
            }
          ]
        },
        { status: 500 }
      );
    }
  };
