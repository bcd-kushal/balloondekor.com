// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { PackageTags } = MODELS;

// types
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getPackageTags = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: PackageTagDocument[];
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
      await PackageTags.find(
        query
      ).countDocuments();
    const packageTags = await PackageTags.find(
      query
    )
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: packageTags
    };
  } catch (error) {
    console.error(
      "Error getting Package Tags:",
      error
    );

    return null;
  }
};

export const getPackageTag = async (
  packageTagId: string
): Promise<PackageTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const packageTag = await PackageTags.findOne({
      _id: packageTagId,
      isDeleted: false
    });

    return packageTag;
  } catch (error: any) {
    console.error(
      "Error getting Package Tag:",
      error
    );

    return null;
  }
};

export const addPackageTag = async (
  addData: PackageTagDocument
): Promise<PackageTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newPackageTag = new PackageTags(
      addData
    );

    const packageTag = await newPackageTag.save();

    return packageTag;
  } catch (error) {
    console.error(
      "Error Adding Package Tag:",
      error
    );

    return null;
  }
};

export const updatePackageTag = async (
  packageTagId: string,
  updateData: Partial<PackageTagDocument>
): Promise<PackageTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const packageTag =
      await PackageTags.findOneAndUpdate(
        {
          _id: packageTagId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return packageTag;
  } catch (error) {
    console.error(
      "Error updating Package Tag:",
      error
    );

    return null;
  }
};

export const deletePackageTag = async (
  packageTagId: string
): Promise<PackageTagDocument | null> => {
  try {
    await connectDB();

    const packageTag =
      await PackageTags.findOneAndUpdate(
        {
          _id: packageTagId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return packageTag;
  } catch (error) {
    console.error(
      "Error Deleting Package Tag:",
      error
    );

    return null;
  }
};

export const getPromotionTagOptions =
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
      const promotionTags =
        await PackageTags.find(query).sort(sort);

      return promotionTags.map(
        ({ _id, name }) => ({
          label: name,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Promotion Tag Options:",
        error
      );

      return null;
    }
  };
