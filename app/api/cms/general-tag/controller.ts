// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { GeneralTags } = MODELS;

// types
import { GeneralTagDocument } from "@/schemas/cms/generalTag";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getGeneralTags = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: GeneralTagDocument[];
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
      await GeneralTags.find(
        query
      ).countDocuments();
    const generalTags = await GeneralTags.find(
      query
    )
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: generalTags
    };
  } catch (error) {
    console.error(
      "Error getting General Tags:",
      error
    );

    return null;
  }
};

export const getGeneralTag = async (
  generalTagId: string
): Promise<GeneralTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const generalTags = await GeneralTags.findOne(
      {
        _id: generalTagId,
        isDeleted: false
      }
    );

    return generalTags;
  } catch (error: any) {
    console.error(
      "Error getting General Tag:",
      error
    );

    return null;
  }
};

export const addGeneralTag = async (
  addData: GeneralTagDocument
): Promise<GeneralTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newGeneralTag = new GeneralTags(
      addData
    );

    const generalTag = await newGeneralTag.save();

    return generalTag;
  } catch (error) {
    console.error(
      "Error Adding General Tag:",
      error
    );

    return null;
  }
};

export const updateGeneralTags = async (
  generalTagId: string,
  updateData: Partial<GeneralTagDocument>
): Promise<GeneralTagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const generalTag =
      await GeneralTags.findOneAndUpdate(
        {
          _id: generalTagId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return generalTag;
  } catch (error) {
    console.error(
      "Error updating General Tag:",
      error
    );

    return null;
  }
};

export const deleteGeneralTags = async (
  generalTagId: string
): Promise<GeneralTagDocument | null> => {
  try {
    await connectDB();

    const generalTag =
      await GeneralTags.findOneAndUpdate(
        {
          _id: generalTagId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return generalTag;
  } catch (error) {
    console.error(
      "Error Deleting General Tag:",
      error
    );

    return null;
  }
};

export const getSearchTagOptions =
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
      const searchTags =
        await GeneralTags.find(query).sort(sort);

      return searchTags.map(({ _id, name }) => ({
        label: name,
        value: _id
      }));
    } catch (error) {
      console.error(
        "Error getting Search Tag Options:",
        error
      );

      return null;
    }
  };
