// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Addons, AddonCategories } = MODELS;

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { QueryParamsType } from "@/types/cms/api";

export const getAddons = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: AddonDocument[];
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
      if (filterBy === "category") {
        if (keyword) {
          const categories =
            await AddonCategories.find({
              name: {
                $regex: new RegExp(keyword, "i")
              }
            });

          if (categories.length) {
            query[filterBy] = categories[0]._id;
          }
        }
      } else {
        query[filterBy] =
          filterBy === "isActive" ||
          "isCustomizable"
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
      await Addons.find(query).countDocuments();
    const addons = await Addons.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate({
        ...(populate
          ? { path: "category" }
          : {
              path: "",
              strictPopulate: false
            })
      })
      .populate({
        ...(populate
          ? {
              path: "image"
            }
          : {
              path: "",
              strictPopulate: false
            })
      });

    return {
      count: count,
      data: addons
    };
  } catch (error) {
    console.error("Error getting Addons:", error);

    return null;
  }
};

export const getAddon = async (
  addonId: string
): Promise<AddonDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const addon = await Addons.findOne({
      _id: addonId,
      isDeleted: false
    })
      .populate({ path: "category" })
      .populate({ path: "image" });

    return addon;
  } catch (error: any) {
    console.error("Error getting Addon:", error);

    return null;
  }
};

export const addAddon = async (
  addData: AddonDocument
): Promise<AddonDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newAddon = new Addons(addData);

    const addon = await newAddon.save();

    const populatedAddon = await Addons.findById(
      addon._id
    )
      .populate({ path: "category" })
      .populate({ path: "image" });

    return populatedAddon;
  } catch (error) {
    console.error("Error Adding Addon:", error);

    return null;
  }
};

export const updateAddon = async (
  addonId: string,
  updateData: Partial<AddonDocument>
): Promise<AddonDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const addon = await Addons.findOneAndUpdate(
      {
        _id: addonId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    )
      .populate({ path: "category" })
      .populate({ path: "image" });

    return addon;
  } catch (error) {
    console.error("Error updating Addon:", error);

    return null;
  }
};

export const restoreAddon = async (
  addonId: string
): Promise<AddonDocument | null> => {
  try {
    await connectDB();

    const addon = await Addons.findOneAndUpdate(
      {
        _id: addonId,
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

    return addon;
  } catch (error) {
    console.error(
      "Error Restoring Addon:",
      error
    );

    return null;
  }
};

export const softDeleteAddon = async (
  addonDocumentId: string
): Promise<AddonDocument | null> => {
  try {
    await connectDB();

    const addon = await Addons.findOneAndUpdate(
      {
        _id: addonDocumentId,
        isDeleted: false
      },
      {
        isActive: false,
        isDeleted: true
      },
      {
        new: true
      }
    )
      .populate({ path: "category" })
      .populate({ path: "image" });

    return addon;
  } catch (error) {
    console.error(
      "Error Soft Deleting Addon:",
      error
    );

    return null;
  }
};

export const hardDeleteAddon = async (
  addonDocumentId: string
): Promise<AddonDocument | null> => {
  try {
    await connectDB();

    const addon = await Addons.findOneAndDelete(
      {
        _id: addonDocumentId,
        isDeleted: true
      },
      {
        new: true
      }
    );

    return addon;
  } catch (error) {
    console.error(
      "Error Hard Deleting Addon:",
      error
    );

    return null;
  }
};
