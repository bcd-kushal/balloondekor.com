// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Services } = MODELS;

// types
import { ServiceDocument } from "@/schemas/cms/service";

export const getSearchData = async (): Promise<
  ServiceDocument[] | null
> => {
  try {
    await connectDB();

    // DB query
    const services: ServiceDocument[] =
      await Services.find({
        isDeleted: false,
        isActive: true
      })
        .populate([
          {
            path: "category",
            select: "name slug"
          },
          {
            path: "media.primary",
            select: "url"
          },
          {
            path: "price.cities.city",
            select: "name"
          }
        ])
        .select(
          "name category categories media.primary price"
        );

    if (services && services.length)
      return services;

    return null;
  } catch (err: any) {
    console.error(
      `error in getting search data from services`,
      err
    );
    return null;
  }
};
