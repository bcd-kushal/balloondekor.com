// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Services } = MODELS;

// types
import { ServiceDocument } from "@/schemas/cms/service";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";
import { getServiceCategoryOptions } from "../service-category/controller";
import { getBrandOptions } from "../brand/controller";
import { getColorOptions } from "../color/controller";
import { getOccasionOptions } from "../occasion/controller";
import { getRelationOptions } from "../relation/controller";
import { getSearchTagOptions } from "../general-tag/controller";
import { getPromotionTagOptions } from "../package-tag/controller";
import { getAITagOptions } from "../ai-tag/controller";
import { getDeliveryDetailOptions } from "../delivery-detail/controller";
import { getCareInfoOptions } from "../care-info/controller";
import { getCancellationPolicyOptions } from "../cancellation-policy/controller";
import { getFAQOptions } from "../faq/controller";
import { getReviewOptions } from "../review/controller";
import { getOrderProcessingTimeOptions } from "../order-processing-time/controller";
import { getOrderCustomizationQuestionOptions } from "../customization-question/controller";
import { getCityOptions } from "../city/controller";

export const getServices = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ServiceDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      populate,
      active,
      deleted,
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword,
      fromDate,
      toDate
    } = queryParams;

    const query: any = {
      isDeleted: false
    };

    if (active) {
      query.isActive = true;
    }

    if (deleted) {
      query.isDeleted = true;
    }

    if (filterBy) {
      if (filterBy.toLowerCase() === "category") {
        if (
          keyword &&
          keyword.toLowerCase() !== "all"
        ) {
          query.category = keyword;
        }
      } else {
        query[filterBy] =
          filterBy === "isActive" || "isCorporate"
            ? keyword === "false"
              ? false
              : true
            : {
                $regex: new RegExp(
                  keyword || "",
                  "i"
                )
              };
      }
    }

    if (!filterBy && keyword) {
      query.$text = { $search: keyword };
    }

    if (fromDate || toDate) {
      query.createdAt = {
        ...(fromDate
          ? { $gte: new Date(fromDate) }
          : {}),
        ...(toDate
          ? { $lt: new Date(toDate) }
          : {})
      };
    }

    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = orderBy === "asc" ? 1 : -1;
    } else {
      sort.value = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await Services.find(query).countDocuments();
    const services = await Services.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(
        populate
          ? [
              {
                path: "category",
                select: "name"
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
                path: "media.review",
                select: "alt defaultAlt url",
                strictPopulate: false
              },
              {
                path: "addons.addon",
                populate: [
                  {
                    path: "image",
                    select: "alt defaultAlt url",
                    strictPopulate: false
                  }
                ]
              },
              {
                path: "variants.references.reference",
                select: "media price",
                populate: [
                  {
                    path: "media.primary",
                    select: "alt defaultAlt url"
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
              }
            ]
          : []
      );

    return {
      count: count,
      data: services
    };
  } catch (error) {
    console.error(
      "Error getting Services:",
      error
    );

    return null;
  }
};

export const getService = async (
  serviceId: string
): Promise<ServiceDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const service = await Services.findOne({
      _id: serviceId,
      isDeleted: false
    })
      .populate({ path: "media.primary" })
      .populate({ path: "media.gallery" })
      .populate({ path: "media.review" })
      .populate({
        path: "addons.addon",
        populate: {
          path: "image",
          strictPopulate: false
        }
      })
      .populate({
        path: "variants.references.reference",
        select: "media price",
        populate: {
          path: "media.primary"
        },
        strictPopulate: false
      })
      .populate({
        path: "variants.custom.unit",
        strictPopulate: false
      })
      .populate({
        path: "variants.custom.variants.image",
        strictPopulate: false
      });

    return service;
  } catch (error: any) {
    console.error(
      "Error getting Service:",
      error
    );

    return null;
  }
};

export const addService = async (
  addData: ServiceDocument
): Promise<ServiceDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newService = new Services(addData);

    const service = await newService.save();

    const populatedService =
      await Services.findById(service._id)
        .populate({ path: "media.primary" })
        .populate({ path: "media.gallery" })
        .populate({ path: "media.review" })
        .populate({
          path: "addons.addon",
          populate: {
            path: "image",
            strictPopulate: false
          }
        })
        .populate({
          path: "variants.references.reference",
          select: "media price",
          populate: {
            path: "media.primary"
          },
          strictPopulate: false
        })
        .populate({
          path: "variants.custom.unit",
          strictPopulate: false
        })
        .populate({
          path: "variants.custom.variants.image",
          strictPopulate: false
        });

    return populatedService;
  } catch (error) {
    console.error(
      "Error Adding Service:",
      JSON.stringify(error)
    );

    return null;
  }
};

export const updateService = async (
  serviceId: string,
  updateData: Partial<ServiceDocument>
): Promise<ServiceDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let service = await Services.findOneAndUpdate(
      {
        _id: serviceId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    )
      .populate({ path: "media.primary" })
      .populate({ path: "media.gallery" })
      .populate({ path: "media.review" })
      .populate({
        path: "addons.addon",
        populate: {
          path: "image",
          strictPopulate: false
        }
      })
      .populate({
        path: "variants.references.reference",
        select: "media price",
        populate: {
          path: "media.primary"
        },
        strictPopulate: false
      })
      .populate({
        path: "variants.custom.unit",
        strictPopulate: false
      })
      .populate({
        path: "variants.custom.variants.image",
        strictPopulate: false
      });

    return service;
  } catch (error) {
    console.error(
      "Error updating Service:",
      error
    );

    return null;
  }
};

export const restoreService = async (
  serviceId: string
): Promise<ServiceDocument | null> => {
  try {
    await connectDB();

    const service =
      await Services.findOneAndUpdate(
        {
          _id: serviceId,
          isDeleted: true
        },
        {
          isActive: false,
          isDeleted: false
        },
        {
          new: true
        }
      );

    return service;
  } catch (error) {
    console.error(
      "Error Restoring Service:",
      error
    );

    return null;
  }
};

export const softDeleteService = async (
  serviceId: string
): Promise<ServiceDocument | null> => {
  try {
    await connectDB();

    const service =
      await Services.findOneAndUpdate(
        {
          _id: serviceId,
          isDeleted: false
        },
        {
          isActive: false,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return service;
  } catch (error) {
    console.error(
      "Error Soft Deleting Service:",
      error
    );

    return null;
  }
};

export const hardDeleteService = async (
  serviceId: string
): Promise<ServiceDocument | null> => {
  try {
    await connectDB();

    const service =
      await Services.findOneAndDelete(
        {
          _id: serviceId,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return service;
  } catch (error) {
    console.error(
      "Error Soft Deleting Service:",
      error
    );

    return null;
  }
};

export const getServiceFormOptions =
  async (): Promise<{
    [key: string]: OptionType[];
  } | null> => {
    try {
      // check or set DB connection
      await connectDB();

      // DB query
      return Promise.all([
        await getServiceCategoryOptions(),
        await getBrandOptions(),
        await getColorOptions(),
        await getOccasionOptions(),
        await getRelationOptions(),
        await getSearchTagOptions(),
        await getPromotionTagOptions(),
        await getAITagOptions(),
        await getDeliveryDetailOptions(),
        await getCareInfoOptions(),
        await getCancellationPolicyOptions(),
        await getFAQOptions(),
        await getReviewOptions(),
        await getOrderProcessingTimeOptions(),
        await getOrderCustomizationQuestionOptions(),
        await getCityOptions()
      ]).then((values) => {
        const options: {
          [key: string]: OptionType[];
        } = {};

        values.forEach((value, i) => {
          switch (i) {
            case 0:
              options.serviceCategory = value
                ? value
                : [];
              break;

            case 1:
              options.brand = value ? value : [];
              break;

            case 2:
              options.color = value ? value : [];
              break;

            case 3:
              options.occasion = value
                ? value
                : [];
              break;

            case 4:
              options.relation = value
                ? value
                : [];
              break;

            case 5:
              options.searchTag = value
                ? value
                : [];
              break;

            case 6:
              options.promotionTag = value
                ? value
                : [];
              break;

            case 7:
              options.aiTag = value ? value : [];
              break;

            case 8:
              options.deliveryDetail = value
                ? value
                : [];
              break;

            case 9:
              options.careInfo = value
                ? value
                : [];
              break;

            case 10:
              options.cancellationPolicy = value
                ? value
                : [];
              break;

            case 11:
              options.faq = value ? value : [];
              break;

            case 12:
              options.review = value ? value : [];
              break;

            case 13:
              options.orderProcessingTime = value
                ? value
                : [];
              break;

            case 14:
              options.customizationQuestion =
                value ? value : [];
              break;

            case 15:
              options.city = value ? value : [];
              break;
          }
        });

        return options;
      });
    } catch (error: any) {
      console.error(
        "Error getting Service Form Options:",
        error
      );

      return null;
    }
  };
