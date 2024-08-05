// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Services, ServiceCategories } = MODELS;

// types
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export const getServiceCategorySlugs =
  async (): Promise<
    { category: string }[] | null
  > => {
    try {
      // check or set DB connection
      await connectDB();

      // DB query
      const serviceCategories: ServiceCategoryDocument[] =
        await ServiceCategories.find({
          isDeleted: false,
          isActive: true
        }).select("slug");

      const slugs = serviceCategories.map(
        ({ slug }) => ({
          category: slug
        })
      );

      return slugs;
    } catch (error: any) {
      console.error(
        "Error getting Service Category Slugs:",
        error
      );

      return null;
    }
  };

export const getServiceCategory = async (
  categorySlug: string
): Promise<{
  category: ServiceCategoryDocument | null;
  services: ServiceDocument[];
}> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const serviceCategory =
      await ServiceCategories.findOne({
        slug: categorySlug,
        isDeleted: false,
        isActive: true
      }).populate([
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
          path: "gst",
          select: "label value",
          strictPopulate: false
        },
        {
          path: "advancePayment",
          select: "label value"
        },
        {
          path: "icon",
          select: "alt defaultAlt url"
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
        }
      ]);

    let services: ServiceDocument[] = [];

    if (serviceCategory) {
      services = await Services.find({
        isDeleted: false,
        isActive: true,
        $or: [
          {
            category: serviceCategory._id
          },
          {
            categories: {
              $in: serviceCategory._id
            }
          }
        ]
      })
        .select(
          "name price media.primary tags.promotionTags quality.rating quality.totalReviews"
        )
        .populate([
          {
            path: "price.cities.city",
            select: "name"
          },
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          },
          {
            path: "tags.promotionTags",
            select: "name colorCode"
          }
        ]);
    }

    return {
      category: serviceCategory || null,
      services: services
    };
  } catch (error) {
    console.error(
      "Error getting Service Category:",
      error
    );

    return {
      category: null,
      services: []
    };
  }
};
