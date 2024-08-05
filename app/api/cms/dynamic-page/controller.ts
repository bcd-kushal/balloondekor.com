// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { DynamicPages } = MODELS;

// types
import { OptionType } from "@/types/cms/form";
import { DynamicPageDocument } from "@/schemas/cms/dynamicPage";
import { QueryParamsType } from "@/types/cms/api";

export const getDynamicPages = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: DynamicPageDocument[];
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
      await DynamicPages.find(
        query
      ).countDocuments();
    const pages = await DynamicPages.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: pages
    };
  } catch (error) {
    console.error(
      "Error getting Dynamic Pages:",
      error
    );

    return null;
  }
};

export const getDynamicPage = async (
  dynamicPageId: string
): Promise<DynamicPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const dynamicPage =
      await DynamicPages.findOne({
        _id: dynamicPageId,
        isDeleted: false
      });

    return dynamicPage;
  } catch (error: any) {
    console.error(
      "Error getting Dynamic Page:",
      error
    );

    return null;
  }
};

export const addDynamicPage = async (
  addData: DynamicPageDocument
): Promise<DynamicPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newDynamicPage = new DynamicPages(
      addData
    );

    const dynamicPage =
      await newDynamicPage.save();

    return dynamicPage;
  } catch (error) {
    console.error(
      "Error Adding Dynamic Page:",
      error
    );

    return null;
  }
};

export const updateDynamicPage = async (
  dynamicPageId: string,
  updateData: Partial<DynamicPageDocument>
): Promise<DynamicPageDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const dynamicPage =
      await DynamicPages.findOneAndUpdate(
        {
          _id: dynamicPageId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return dynamicPage;
  } catch (error) {
    console.error(
      "Error updating Dynamic Page:",
      error
    );

    return null;
  }
};

export const deleteDynamicPage = async (
  dynamicPageId: string
): Promise<DynamicPageDocument | null> => {
  try {
    await connectDB();

    const dynamicPage =
      await DynamicPages.findOneAndUpdate(
        {
          _id: dynamicPageId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return dynamicPage;
  } catch (error) {
    console.error(
      "Error Deleting Dynamic Page:",
      error
    );

    return null;
  }
};

export const getDynamicPageOptions =
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
      const dynamicPages =
        await DynamicPages.find(query).sort(sort);

      return dynamicPages.map(
        ({ _id, name }) => ({
          label: name,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Dynamic Page Options:",
        error
      );

      return null;
    }
  };
