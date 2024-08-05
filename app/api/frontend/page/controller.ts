// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Pages, ServiceCategories } = MODELS;

// types
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export const getPageSlugs = async (): Promise<
  { category: string; page: string }[] | null
> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const pages = await Pages.find({
      isDeleted: false,
      isActive: true
    })
      .select(["category", "slug"])
      .populate([
        {
          path: "category",
          select: ["slug"]
        }
      ]);

    const slugs = pages.map(
      ({ category, slug }) => ({
        category: (
          category as ServiceCategoryDocument
        ).slug,
        page: slug
      })
    );

    return slugs;
  } catch (error: any) {
    console.error(
      "Error getting Page Slugs:",
      error
    );

    return null;
  }
};

export const getPage = async (
  categorySlug: string,
  pageSlug: string
): Promise<PageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const category =
      await ServiceCategories.findOne({
        slug: categorySlug
      }).select(["_id"]);

    if (!category) {
      return null;
    }

    const page = await Pages.findOne({
      category: category._id,
      slug: pageSlug,
      isDeleted: false,
      isActive: true
    }).populate([
      {
        path: "category",
        select: "slug"
      },
      {
        path: "city",
        select: "name"
      },
      {
        path: "relatedCategories",
        select: "name slug openIn icon",
        populate: [
          {
            path: "icon",
            select: "alt defaultAlt url"
          }
        ]
      },
      {
        path: "banners",
        populate: [
          {
            path: "desktop",
            select: "alt defaultAlt url",
            strictPopulate: false
          },
          {
            path: "mobile",
            select: "alt defaultAlt url",
            strictPopulate: false
          }
        ],
        strictPopulate: false
      },
      {
        path: "quickLinks",
        populate: [
          {
            path: "image",
            select: "alt defaultAlt url",
            strictPopulate: false
          }
        ],
        strictPopulate: false
      },
      {
        path: "services",
        select:
          "name price media.primary quality.rating quality.totalReviews",
        populate: [
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          },
          {
            path: "price.cities.city",
            select: "name"
          }
        ]
      }
    ]);

    return page;
  } catch (error) {
    console.error("Error getting page:", error);

    return null;
  }
};
