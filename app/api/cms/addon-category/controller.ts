// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { AddonCategories } = MODELS;

// types
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { QueryParamsType } from "@/types/cms/api";

export const getAddonCategories = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: AddonCategoryDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
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
      sort.value = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await AddonCategories.find(
        query
      ).countDocuments();
    const addonCategories =
      await AddonCategories.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: addonCategories
    };
  } catch (error) {
    console.error(
      "Error getting Addon Categories:",
      error
    );

    return null;
  }
};

export const getAddonCategory = async (
  addonCategoryId: string
): Promise<AddonCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const addonCategory =
      await AddonCategories.findOne({
        _id: addonCategoryId,
        isDeleted: false
      });

    return addonCategory;
  } catch (error: any) {
    console.error(
      "Error getting Addon Category:",
      error
    );

    return null;
  }
};

export const addAddonCategory = async (
  addData: AddonCategoryDocument
): Promise<AddonCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newAddonCategory = new AddonCategories(
      addData
    );

    const addonCategory =
      await newAddonCategory.save();

    return addonCategory;
  } catch (error) {
    console.error(
      "Error Adding Addon Category:",
      error
    );

    return null;
  }
};

export const updateAddonCategory = async (
  addonCategoryId: string,
  updateData: Partial<AddonCategoryDocument>
): Promise<AddonCategoryDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const addonCategory =
      await AddonCategories.findOneAndUpdate(
        {
          _id: addonCategoryId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return addonCategory;
  } catch (error) {
    console.error(
      "Error updating Addon Category:",
      error
    );

    return null;
  }
};

export const restoreAddonCategory = async (
  addonCategoryId: string
): Promise<AddonCategoryDocument | null> => {
  try {
    await connectDB();

    const addonCategory =
      await AddonCategories.findOneAndUpdate(
        {
          _id: addonCategoryId,
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

    return addonCategory;
  } catch (error) {
    console.error(
      "Error Restoring Addon Category:",
      error
    );

    return null;
  }
};

export const softDeleteAddonCategory = async (
  addonCategoryId: string
): Promise<AddonCategoryDocument | null> => {
  try {
    await connectDB();

    const addonCategory =
      await AddonCategories.findOneAndUpdate(
        {
          _id: addonCategoryId,
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

    return addonCategory;
  } catch (error) {
    console.error(
      "Error Soft Deleting Addon Category:",
      error
    );

    return null;
  }
};

export const hardDeleteAddonCategory = async (
  addonCategoryId: string
): Promise<AddonCategoryDocument | null> => {
  try {
    await connectDB();

    const addonCategory =
      await AddonCategories.findOneAndDelete(
        {
          _id: addonCategoryId,
          isDeleted: true
        },
        {
          new: true
        }
      );

    return addonCategory;
  } catch (error) {
    console.error(
      "Error Hard Deleting Addon Category:",
      error
    );

    return null;
  }
};
