// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Trendings } = MODELS;

// types
import { TrendingDocument } from "@/schemas/cms/trending";
import { QueryParamsType } from "@/types/cms/api";

export const getTrendings = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: TrendingDocument[];
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
      await Trendings.find(
        query
      ).countDocuments();
    const trendings = await Trendings.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return { count: count, data: trendings };
  } catch (error) {
    console.error(
      "Error getting Trendings:",
      error
    );

    return null;
  }
};

export const getTrending = async (
  trendingId: string
): Promise<TrendingDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const trending = await Trendings.findOne({
      _id: trendingId,
      isDeleted: false
    });

    return trending;
  } catch (error: any) {
    console.error(
      "Error getting Trending:",
      error
    );

    return null;
  }
};

export const addTrending = async (
  addData: TrendingDocument
): Promise<TrendingDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newTrending = new Trendings(addData);

    const trending = await newTrending.save();

    return trending;
  } catch (error) {
    console.error(
      "Error Adding Trending:",
      error
    );

    return null;
  }
};

export const updateTrending = async (
  trendingId: string,
  updateData: Partial<TrendingDocument>
): Promise<TrendingDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const trending =
      await Trendings.findOneAndUpdate(
        { _id: trendingId, isDeleted: false },
        updateData,
        {
          new: true
        }
      );

    return trending;
  } catch (error) {
    console.error(
      "Error updating Trending:",
      error
    );

    return null;
  }
};

export const deleteTrending = async (
  trendingId: string
): Promise<TrendingDocument | null> => {
  try {
    await connectDB();

    const trending =
      await Trendings.findOneAndUpdate(
        { _id: trendingId, isDeleted: false },
        { isDeleted: true },
        {
          new: true
        }
      );

    return trending;
  } catch (error) {
    console.error(
      "Error Deleting Trending:",
      error
    );

    return null;
  }
};
