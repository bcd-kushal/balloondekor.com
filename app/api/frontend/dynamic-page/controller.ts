// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { DynamicPages } = MODELS;

// types
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";

export const getDynamicPageSlugs =
  async (): Promise<
    { slug: string }[] | null
  > => {
    try {
      // check or set DB connection
      await connectDB();

      // DB query
      const dynamicPages =
        await DynamicPages.find({
          isDeleted: false,
          isActive: true
        }).select("slug");

      const slugs = dynamicPages.map(
        ({ slug }) => ({
          slug
        })
      );

      return slugs;
    } catch (error: any) {
      console.error(
        "Error getting Dynamic Page Slugs:",
        error
      );

      return null;
    }
  };

export const getDynamicPage = async (
  slug: string
): Promise<DynamicPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const dynamicPage =
      await DynamicPages.findOne({
        slug,
        isDeleted: false,
        isActive: true
      });

    return dynamicPage;
  } catch (error) {
    console.error(
      "Error getting Dynamic Page:",
      error
    );

    return null;
  }
};
