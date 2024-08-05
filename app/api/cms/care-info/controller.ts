// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { CareInfos } = MODELS;

// types
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getCareInfos = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CareInfoDocument[];
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
      await CareInfos.find(
        query
      ).countDocuments();
    const careInfos = await CareInfos.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: careInfos
    };
  } catch (error) {
    console.error(
      "Error getting Care Infos:",
      error
    );

    return null;
  }
};

export const getCareInfo = async (
  careInfoId: string
): Promise<CareInfoDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const careInfo = await CareInfos.findOne({
      _id: careInfoId,
      isDeleted: false
    });

    return careInfo;
  } catch (error: any) {
    console.error(
      "Error getting Care Info:",
      error
    );

    return null;
  }
};

export const addCareInfo = async (
  addData: CareInfoDocument
): Promise<CareInfoDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCareInfo = new CareInfos(addData);

    const careInfo = await newCareInfo.save();

    return careInfo;
  } catch (error) {
    console.error(
      "Error Adding Care Info:",
      error
    );

    return null;
  }
};

export const updateCareInfo = async (
  careInfoId: string,
  updateData: Partial<CareInfoDocument>
): Promise<CareInfoDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const careInfo =
      await CareInfos.findOneAndUpdate(
        {
          _id: careInfoId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return careInfo;
  } catch (error) {
    console.error(
      "Error updating Care Info:",
      error
    );

    return null;
  }
};

export const deleteCareInfo = async (
  careInfoId: string
): Promise<CareInfoDocument | null> => {
  try {
    await connectDB();

    const careInfo =
      await CareInfos.findOneAndUpdate(
        {
          _id: careInfoId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return careInfo;
  } catch (error) {
    console.error(
      "Error Deleting Care Info:",
      error
    );

    return null;
  }
};

export const getCareInfoOptions =
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
      const careInfos =
        await CareInfos.find(query).sort(sort);

      return careInfos.map(({ _id, label }) => ({
        label,
        value: _id
      }));
    } catch (error) {
      console.error(
        "Error getting Care Info Options:",
        error
      );

      return null;
    }
  };
