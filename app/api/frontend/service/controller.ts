// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Services } = MODELS;

// types
import { ServiceDocument } from "@/schemas/cms/service";

export const getServiceSlugs = async (): Promise<
  { service: string }[] | null
> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const services: ServiceDocument[] =
      await Services.find({
        isDeleted: false,
        isActive: true
      }).select("name");

    const slugs = services.map(({ name }) => ({
      service: name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    }));

    return slugs;
  } catch (error: any) {
    console.error(
      "Error getting Service:",
      error
    );

    return null;
  }
};

export const getServiceData = async (
  serviceName: string
): Promise<{
  service: ServiceDocument | null;
  suggestions: ServiceDocument[];
}> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const service = await Services.findOne({
      name: {
        $regex: new RegExp(
          `^${serviceName}$`,
          "i"
        )
      },
      isDeleted: false,
      isActive: true
    }).populate([
      {
        path: "category",
        select: "name slug advancePayment",
        populate: [
          {
            path: "advancePayment",
            select: "label value"
          }
        ]
      },
      {
        path: "categories",
        select: "name slug"
      },
      {
        path: "media.primary",
        select: "alt defaultAlt url"
      },
      {
        path: "media.gallery",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "price.cities.city",
        select: "name"
      },
      {
        path: "media.review",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "details.deliveryDetails"
      },
      {
        path: "details.careInfo"
      },
      {
        path: "details.cancellationPolicy"
      },
      {
        path: "quality.review",
        strictPopulate: false
      },
      {
        path: "details.faq"
      },
      {
        path: "deliveryTime.orderProcessingTime",
        select: "label time"
      },
      {
        path: "deliveryTime.deliverySlots.deliveryType",
        select: "name timeSlots"
      },
      {
        path: "addons.addon",
        select: "name price isCustomizable",
        populate: [
          {
            path: "category",
            select: "name"
          },
          {
            path: "image",
            select: "alt defaultAlt url"
          }
        ]
      },
      {
        path: "variants.references.reference",
        select:
          "name quality price details media deliveryTime addons",
        populate: [
          {
            path: "price.cities.city",
            select: "name"
          },
          {
            path: "details.deliveryDetails"
          },
          {
            path: "details.careInfo"
          },
          {
            path: "details.cancellationPolicy"
          },
          {
            path: "details.faq"
          },
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          },
          {
            path: "media.gallery",
            select: "alt defaultAlt url",
            strictPopulate: false
          },
          {
            path: "deliveryTime.orderProcessingTime",
            select: "label time"
          },
          {
            path: "deliveryTime.deliverySlots.deliveryType",
            select: "name timeSlots"
          },
          {
            path: "addons.addon",
            select: "name price isCustomizable",
            populate: [
              {
                path: "category",
                select: "name"
              },
              {
                path: "image",
                select: "alt defaultAlt url"
              }
            ]
          }
        ],
        strictPopulate: false
      },
      {
        path: "variants.custom.unit",
        strictPopulate: false
      },
      {
        path: "variants.custom.variants.image",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "variants.custom.variants.price.cities.city",
        select: "name",
        strictPopulate: false
      }
    ]);

    let suggestions: ServiceDocument[] = [];

    if (service) {
      suggestions = await Services.find({
        _id: { $ne: service._id },
        "tags.aiTags": {
          $in: service.tags.aiTags
        },
        isDeleted: false,
        isActive: true
      })
        .select([
          "name",
          "price",
          "tags.promotionTags",
          "media.primary"
        ])
        .populate([
          {
            path: "price.cities.city",
            select: "name"
          },
          {
            path: "tags.promotionTags",
            select: "name colorCode"
          },
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          }
        ]);
    }

    return { service, suggestions };
  } catch (error: any) {
    console.error(
      "Error getting Service:",
      error
    );

    return { service: null, suggestions: [] };
  }
};
