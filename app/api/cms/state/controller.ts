// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { States } = MODELS;

// types
import { StateDocument } from "@/schemas/cms/state";
import { QueryParamsType } from "@/types/cms/api";

export const getStates = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: StateDocument[];
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
      await States.find(query).countDocuments();
    const states = await States.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: states
    };
  } catch (error) {
    console.error("Error getting States:", error);

    return null;
  }
};

export const getState = async (
  stateId: string
): Promise<StateDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const state = await States.findOne({
      _id: stateId,
      isDeleted: false
    });

    return state;
  } catch (error: any) {
    console.error("Error getting State:", error);

    return null;
  }
};

export const addState = async (
  addData: StateDocument
): Promise<StateDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newState = new States(addData);

    const state = await newState.save();

    return state;
  } catch (error) {
    console.error("Error Adding State:", error);

    return null;
  }
};

export const updateState = async (
  stateId: string,
  updateData: Partial<StateDocument>
): Promise<StateDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const state = await States.findOneAndUpdate(
      {
        _id: stateId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return state;
  } catch (error) {
    console.error("Error updating State:", error);

    return null;
  }
};

export const deleteState = async (
  stateId: string
): Promise<StateDocument | null> => {
  try {
    await connectDB();

    const state = await States.findOneAndUpdate(
      {
        _id: stateId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return state;
  } catch (error) {
    console.error("Error Deleting State:", error);

    return null;
  }
};
