// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Colors } = MODELS;

// types
import { ColorDocument } from "@/schemas/cms/color";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getColors = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: ColorDocument[];
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
      await Colors.find(query).countDocuments();
    const color = await Colors.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: color
    };
  } catch (error) {
    console.error("Error getting Color:", error);

    return null;
  }
};

export const getColor = async (
  colorId: string
): Promise<ColorDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const color = await Colors.findOne({
      _id: colorId,
      isDeleted: false
    });

    return color;
  } catch (error: any) {
    console.error("Error getting  Color:", error);

    return null;
  }
};

export const addColor = async (
  addData: ColorDocument
): Promise<ColorDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newColor = new Colors(addData);

    const color = await newColor.save();

    return color;
  } catch (error) {
    console.error("Error Adding Color:", error);

    return null;
  }
};

export const updateColor = async (
  colorId: string,
  updateData: Partial<ColorDocument>
): Promise<ColorDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const color = await Colors.findOneAndUpdate(
      {
        _id: colorId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return color;
  } catch (error) {
    console.error("Error updating Color:", error);

    return null;
  }
};

export const deleteColor = async (
  colorId: string
): Promise<ColorDocument | null> => {
  try {
    await connectDB();

    const color = await Colors.findOneAndUpdate(
      {
        _id: colorId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return color;
  } catch (error) {
    console.error("Error Deleting Color:", error);

    return null;
  }
};

export const getColorOptions = async (): Promise<
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
    const colors =
      await Colors.find(query).sort(sort);

    return colors.map(({ _id, name }) => ({
      label: name,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting Color Options:",
      error
    );

    return null;
  }
};
