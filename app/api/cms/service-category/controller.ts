// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { ServiceCategories } = MODELS;

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getServiceCategories = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ServiceCategoryDocument[];
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
      query[filterBy] =
        filterBy === "isActive"
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await ServiceCategories.find(
        query
      ).countDocuments();
    const serviceCategories =
      await ServiceCategories.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate(
          populate
            ? [
                {
                  path: "icon",
                  select: "alt defaultAlt url"
                }
              ]
            : []
        );

    return {
      count: count,
      data: serviceCategories
    };
  } catch (error) {
    console.error(
      "Error getting Service Categories:",
      error
    );

    return null;
  }
};

export const getServiceCategory = async (
  serviceCategoryId: string
): Promise<ServiceCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const serviceCategory =
      await ServiceCategories.findOne({
        _id: serviceCategoryId,
        isDeleted: false
      }).populate([
        {
          path: "icon",
          select: "alt defaultAlt url"
        },
        {
          path: "quickLinks",
          populate: {
            path: "image",
            select: "alt defaultAlt url",
            strictPopulate: false
          }
        },
        {
          path: "banners",
          populate: [
            {
              path: "desktop",
              select: "alt defaultAlt url"
            },
            {
              path: "mobile",
              select: "alt defaultAlt url"
            }
          ]
        }
      ]);

    return serviceCategory;
  } catch (error: any) {
    console.error(
      "Error getting Service Category:",
      error
    );

    return null;
  }
};

export const addServiceCategory = async (
  addData: ServiceCategoryDocument
): Promise<ServiceCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newServiceCategory =
      new ServiceCategories(addData);

    const serviceCategory =
      await newServiceCategory.save();

    return serviceCategory;
  } catch (error) {
    console.error(
      "Error Adding Service Category:",
      error
    );

    return null;
  }
};

export const updateServiceCategory = async (
  serviceCategoryId: string,
  updateData: Partial<ServiceCategoryDocument>
): Promise<ServiceCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    let serviceCategory =
      await ServiceCategories.findOneAndUpdate(
        {
          _id: serviceCategoryId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      ).populate([
        {
          path: "gst",
          strictPopulate: false
        },
        {
          path: "advancePayment",
          strictPopulate: false
        },
        {
          path: "icon",
          select: "alt defaultAlt url"
        },
        {
          path: "quickLinks",
          populate: {
            path: "image",
            select: "alt defaultAlt url",
            strictPopulate: false
          }
        },
        {
          path: "banners",
          populate: [
            {
              path: "desktop",
              select: "alt defaultAlt url"
            },
            {
              path: "mobile",
              select: "alt defaultAlt url"
            }
          ]
        }
      ]);

    // update isCompleted
    if (serviceCategory) {
      const {
        name,
        slug,
        heading,
        openIn,
        // relatedCategories,
        deliveryCharge,
        // gst,
        advancePayment,
        // topContent,
        // bottomContent,
        icon,
        // banners,
        // quickLinks,
        seoSchema,
        // faqs,
        metaTitle,
        metaTags,
        metaDescription
      } = serviceCategory;

      if (
        name &&
        slug &&
        heading &&
        openIn &&
        // relatedCategories.length &&
        (deliveryCharge === 0 ||
          deliveryCharge) &&
        // gst &&
        advancePayment &&
        // topContent &&
        // bottomContent &&
        icon &&
        // banners.length &&
        // quickLinks.length &&
        seoSchema &&
        // faqs.length &&
        metaTitle &&
        metaTags &&
        metaDescription
      ) {
        serviceCategory =
          await ServiceCategories.findOneAndUpdate(
            {
              _id: serviceCategoryId,
              isDeleted: false
            },
            { isCompleted: true },
            {
              new: true
            }
          ).populate([
            {
              path: "gst",
              strictPopulate: false
            },
            {
              path: "advancePayment",
              strictPopulate: false
            },
            {
              path: "icon",
              select: "alt defaultAlt url"
            },
            {
              path: "quickLinks",
              populate: {
                path: "image",
                select: "alt defaultAlt url",
                strictPopulate: false
              }
            },
            {
              path: "banners",
              populate: {
                path: "image",
                select: "alt defaultAlt url"
              }
            }
          ]);
      }
    }

    return serviceCategory;
  } catch (error) {
    console.error(
      "Error updating Service Category:",
      error
    );

    return null;
  }
};

export const restoreServiceCategory = async (
  serviceCategoryId: string
): Promise<ServiceCategoryDocument | null> => {
  try {
    await connectDB();

    const service =
      await ServiceCategories.findOneAndUpdate(
        {
          _id: serviceCategoryId,
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
      "Error Restoring Service Category:",
      error
    );

    return null;
  }
};

export const softDeleteServiceCategory = async (
  serviceCategoryId: string
): Promise<ServiceCategoryDocument | null> => {
  try {
    await connectDB();

    const serviceCategory =
      await ServiceCategories.findOneAndUpdate(
        {
          _id: serviceCategoryId,
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

    return serviceCategory;
  } catch (error) {
    console.error(
      "Error Soft Deleting Service Category:",
      error
    );

    return null;
  }
};

export const hardDeleteServiceCategory = async (
  serviceCategoryId: string
): Promise<ServiceCategoryDocument | null> => {
  try {
    await connectDB();

    const serviceCategory =
      await ServiceCategories.findOneAndDelete(
        {
          _id: serviceCategoryId,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return serviceCategory;
  } catch (error) {
    console.error(
      "Error Hard Deleting Service Category:",
      error
    );

    return null;
  }
};

export const getServiceCategoryOptions =
  async (): Promise<OptionType[] | null> => {
    try {
      // check or set DB connection
      await connectDB();

      // query
      const query: any = {
        isDeleted: false,
        isActive: true
      };

      const sort: any = {
        name: 1
      };

      // DB query
      const serviceCategories =
        await ServiceCategories.find(query).sort(
          sort
        );

      return serviceCategories.map(
        ({ _id, name }) => ({
          label: name,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Service Category Options:",
        error
      );

      return null;
    }
  };
