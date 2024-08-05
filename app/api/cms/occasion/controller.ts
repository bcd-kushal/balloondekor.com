// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Occasions } = MODELS;

// types
import { OccasionDocument } from "@/schemas/cms/occasion";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getOccasions = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: OccasionDocument[];
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
      await Occasions.find(
        query
      ).countDocuments();
    const occasions = await Occasions.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: occasions
    };
  } catch (error) {
    console.error(
      "Error getting Occasion:",
      error
    );

    return null;
  }
};

export const getOccasion = async (
  occasionId: string
): Promise<OccasionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const occasion = await Occasions.findOne({
      _id: occasionId,
      isDeleted: false
    });

    return occasion;
  } catch (error: any) {
    console.error(
      "Error getting Occasion:",
      error
    );

    return null;
  }
};

export const addOccasion = async (
  addData: OccasionDocument
): Promise<OccasionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newOccasion = new Occasions(addData);

    const occasion = await newOccasion.save();

    return occasion;
  } catch (error) {
    console.error(
      "Error Adding Occasion:",
      error
    );

    return null;
  }
};

export const updateOccasion = async (
  occasionId: string,
  updateData: Partial<OccasionDocument>
): Promise<OccasionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const occasion =
      await Occasions.findOneAndUpdate(
        {
          _id: occasionId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return occasion;
  } catch (error) {
    console.error(
      "Error updating Occasion:",
      error
    );

    return null;
  }
};

export const deleteOccasion = async (
  occasionId: string
): Promise<OccasionDocument | null> => {
  try {
    await connectDB();

    const occasion =
      await Occasions.findOneAndUpdate(
        {
          _id: occasionId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return occasion;
  } catch (error) {
    console.error(
      "Error Deleting Occasion:",
      error
    );

    return null;
  }
};

export const getOccasionOptions =
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
      const occasions =
        await Occasions.find(query).sort(sort);

      return occasions.map(({ _id, name }) => ({
        label: name,
        value: _id
      }));
    } catch (error) {
      console.error(
        "Error getting Occasion Options:",
        error
      );

      return null;
    }
  };
