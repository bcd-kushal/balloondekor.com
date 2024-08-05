// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { GSTs } = MODELS;

// types
import { GSTDocument } from "@/schemas/cms/gst";
import { QueryParamsType } from "@/types/cms/api";

export const getGSTs = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: GSTDocument[];
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
      await GSTs.find(query).countDocuments();
    const gsts = await GSTs.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return { count: count, data: gsts };
  } catch (error) {
    console.error("Error getting GSTs:", error);

    return null;
  }
};

export const getGST = async (
  gstId: string
): Promise<GSTDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const gst = await GSTs.findOne({
      _id: gstId,
      isDeleted: false
    });

    return gst;
  } catch (error: any) {
    console.error("Error getting GST:", error);

    return null;
  }
};

export const addGST = async (
  addData: GSTDocument
): Promise<GSTDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newGST = new GSTs(addData);

    const gst = await newGST.save();

    return gst;
  } catch (error) {
    console.error("Error Adding GST:", error);

    return null;
  }
};

export const updateGST = async (
  gstId: string,
  updateData: Partial<GSTDocument>
): Promise<GSTDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const gst = await GSTs.findOneAndUpdate(
      { _id: gstId, isDeleted: false },
      updateData,
      {
        new: true
      }
    );

    return gst;
  } catch (error) {
    console.error("Error updating GST:", error);

    return null;
  }
};

export const deleteGST = async (
  gstId: string
): Promise<GSTDocument | null> => {
  try {
    await connectDB();

    const gst = await GSTs.findOneAndUpdate(
      { _id: gstId, isDeleted: false },
      { isDeleted: true },
      {
        new: true
      }
    );

    return gst;
  } catch (error) {
    console.error("Error Deleting GST:", error);

    return null;
  }
};
