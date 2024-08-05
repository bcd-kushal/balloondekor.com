// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Relations } = MODELS;

// types
import { RelationDocument } from "@/schemas/cms/relation";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getRelations = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: RelationDocument[];
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
      await Relations.find(
        query
      ).countDocuments();
    const relation = await Relations.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: relation
    };
  } catch (error) {
    console.error(
      "Error getting Relations:",
      error
    );

    return null;
  }
};

export const getRelation = async (
  relationId: string
): Promise<RelationDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const relation = await Relations.findOne({
      _id: relationId,
      isDeleted: false
    });

    return relation;
  } catch (error: any) {
    console.error(
      "Error getting  Relation:",
      error
    );

    return null;
  }
};

export const addRelation = async (
  addData: RelationDocument
): Promise<RelationDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newRelation = new Relations(addData);

    const relation = await newRelation.save();

    return relation;
  } catch (error) {
    console.error(
      "Error Adding Relation:",
      error
    );

    return null;
  }
};

export const updateRelation = async (
  relationId: string,
  updateData: Partial<RelationDocument>
): Promise<RelationDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const relation =
      await Relations.findOneAndUpdate(
        {
          _id: relationId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return relation;
  } catch (error) {
    console.error(
      "Error updating Relation:",
      error
    );

    return null;
  }
};

export const deleteRelation = async (
  relationId: string
): Promise<RelationDocument | null> => {
  try {
    await connectDB();

    const relation =
      await Relations.findOneAndUpdate(
        {
          _id: relationId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return relation;
  } catch (error) {
    console.error(
      "Error Deleting Relation:",
      error
    );

    return null;
  }
};

export const getRelationOptions =
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
      const relations =
        await Relations.find(query).sort(sort);

      return relations.map(({ _id, name }) => ({
        label: name,
        value: _id
      }));
    } catch (error) {
      console.error(
        "Error getting Relation Options:",
        error
      );

      return null;
    }
  };
