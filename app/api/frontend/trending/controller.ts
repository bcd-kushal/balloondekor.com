// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Trendings } = MODELS;

// types
import { TrendingDocument } from "@/schemas/cms/trending";

export const getTrendings = async (): Promise<
  TrendingDocument[]
> => {
  try {
    // check or set DB connection
    await connectDB();

    const query: any = {
      isDeleted: false,
      isActive: true
    };

    const sort: any = {
      createdAt: -1
    };

    // DB query
    const trendings = await Trendings.find(query)
      .sort(sort)
      .select("label path");

    return trendings;
  } catch (error) {
    console.error(
      "Error getting Trendings:",
      error
    );

    return [];
  }
};
