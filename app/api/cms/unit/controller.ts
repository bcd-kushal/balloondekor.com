// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Units } = MODELS;

// types
import { OptionType } from "@/types/cms/form";
import { QueryParamsType } from "@/types/cms/api";
import { UnitDocument } from "@/schemas/cms/unit";

export const getUnits = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: UnitDocument[];
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
      await Units.find(query).countDocuments();
    const units = await Units.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: units
    };
  } catch (error) {
    console.error("Error getting Units:", error);

    return null;
  }
};

export const getUnit = async (
  unitId: string
): Promise<UnitDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const unit = await Units.findOne({
      _id: unitId,
      isDeleted: false
    });

    return unit;
  } catch (error: any) {
    console.error("Error getting Unit:", error);

    return null;
  }
};

export const addUnit = async (
  addData: UnitDocument
): Promise<UnitDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newUnit = new Units(addData);

    const unit = await newUnit.save();

    return unit;
  } catch (error) {
    console.error("Error Adding Unit:", error);

    return null;
  }
};

export const updateUnit = async (
  unitId: string,
  updateData: Partial<UnitDocument>
): Promise<UnitDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const unit = await Units.findOneAndUpdate(
      {
        _id: unitId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    );

    return unit;
  } catch (error) {
    console.error("Error updating Unit:", error);

    return null;
  }
};

export const deleteUnit = async (
  unitId: string
): Promise<UnitDocument | null> => {
  try {
    await connectDB();

    const unit = await Units.findOneAndUpdate(
      {
        _id: unitId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return unit;
  } catch (error) {
    console.error("Error Deleting Unit:", error);

    return null;
  }
};

export const getUnitOptions = async (): Promise<
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
    const units =
      await Units.find(query).sort(sort);

    return units.map(({ _id, name }) => ({
      label: name,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting Unit Options:",
      error
    );

    return null;
  }
};
