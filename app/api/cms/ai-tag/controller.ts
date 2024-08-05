// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { AITags } = MODELS;

// types
import { AITagDocument } from "@/schemas/cms/aiTag";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getAITags = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: AITagDocument[];
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
      await AITags.find(query).countDocuments();
    const aiTags = await AITags.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: aiTags
    };
  } catch (error) {
    console.error(
      "Error getting AI Tags:",
      error
    );

    return null;
  }
};

export const getAITag = async (
  aiTagId: string
): Promise<AITagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const aiTag = await AITags.findOne({
      _id: aiTagId,
      isDeleted: false
    });

    return aiTag;
  } catch (error: any) {
    console.error("Error getting AI Tag:", error);

    return null;
  }
};

export const addAITag = async (
  addData: AITagDocument
): Promise<AITagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newAITag = new AITags(addData);

    const aiTag = await newAITag.save();

    return aiTag;
  } catch (error) {
    console.error("Error Adding AI Tag:", error);

    return null;
  }
};

export const updateAITag = async (
  aiTagId: string,
  updateData: Partial<AITagDocument>
): Promise<AITagDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const aiTag = await AITags.findOneAndUpdate(
      {
        _id: aiTagId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return aiTag;
  } catch (error) {
    console.error(
      "Error updating AI Tag:",
      error
    );

    return null;
  }
};

export const deleteAITag = async (
  aiTagId: string
): Promise<AITagDocument | null> => {
  try {
    await connectDB();

    const aiTag = await AITags.findOneAndUpdate(
      {
        _id: aiTagId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return aiTag;
  } catch (error) {
    console.error(
      "Error Deleting AI Tag:",
      error
    );

    return null;
  }
};

export const getAITagOptions = async (): Promise<
  OptionType[] | null
> => {
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
    const aiTags =
      await AITags.find(query).sort(sort);

    return aiTags.map(({ _id, label }) => ({
      label,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting AI Tag Options:",
      error
    );

    return null;
  }
};
