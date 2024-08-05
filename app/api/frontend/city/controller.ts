// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Cities } = MODELS;

// types
import { CityDocument } from "@/schemas/cms/city";

export const getCities = async (): Promise<
  CityDocument[]
> => {
  try {
    // check or set DB connection
    await connectDB();

    const query: any = {
      isDeleted: false,
      isActive: true
    };

    const sort: any = {
      name: 1
    };

    // DB query
    const cities = await Cities.find(query)
      .sort(sort)
      .select("name isTopCity icon")
      .populate([
        {
          path: "icon",
          select: "alt defaultAlt url",
          strictPopulate: false
        }
      ]);

    return cities;
  } catch (error) {
    console.error("Error getting Cities:", error);

    return [];
  }
};
