// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Pages, ServiceCategories, SubPages } =
  MODELS;

// types
import { PageDocument } from "@/schemas/cms/page";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { SubPageDocument } from "@/schemas/cms/subPage";

export const getSubPageSlugs = async (): Promise<
  | {
      category: string;
      page: string;
      subPage: string;
    }[]
  | null
> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const subPages = await SubPages.find({
      isDeleted: false,
      isActive: true
    })
      .select(["page", "slug"])
      .populate([
        {
          path: "page",
          select: ["category", "slug"],
          populate: [
            {
              path: "category",
              select: ["slug"]
            }
          ]
        }
      ]);

    const slugs = subPages.map(
      ({ page, slug }) => ({
        category: (
          (page as PageDocument)
            .category as ServiceCategoryDocument
        ).slug,
        page: (page as PageDocument).slug,
        subPage: slug
      })
    );

    return slugs;
  } catch (error: any) {
    console.error(
      "Error getting Sub Page Slugs:",
      error
    );

    return null;
  }
};

export const getSubPage = async (
  categorySlug: string,
  pageSlug: string,
  subPageSlug: string
): Promise<SubPageDocument | null> => {
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
      slug: pageSlug
    }).select(["_id"]);

    if (!page) {
      return null;
    }

    const subPage = await SubPages.findOne({
      page: page._id,
      slug: subPageSlug,
      isDeleted: false,
      isActive: true
    }).populate([
      {
        path: "page",
        select: "category slug",
        populate: [
          {
            path: "category",
            select: "slug"
          }
        ]
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

    return subPage;
  } catch (error) {
    console.error(
      "Error getting Sub page:",
      error
    );

    return null;
  }
};
