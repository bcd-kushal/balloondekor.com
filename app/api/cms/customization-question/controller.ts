// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { CustomizationQuestions } = MODELS;

// types
import { CustomizationQuestionDocument } from "@/schemas/cms/customizationQuestion";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getCustomizationQuestions = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CustomizationQuestionDocument[];
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
      await CustomizationQuestions.find(
        query
      ).countDocuments();
    const customizationQuestions =
      await CustomizationQuestions.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: customizationQuestions
    };
  } catch (error) {
    console.error(
      "Error getting Customization Questions:",
      error
    );

    return null;
  }
};

export const getCustomizationQuestion = async (
  customizationQuestionId: string
): Promise<CustomizationQuestionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customizationQuestion =
      await CustomizationQuestions.findOne({
        _id: customizationQuestionId,
        isDeleted: false
      });

    return customizationQuestion;
  } catch (error: any) {
    console.error(
      "Error getting Customization Question:",
      error
    );

    return null;
  }
};

export const addCustomizationQuestion = async (
  addData: CustomizationQuestionDocument
): Promise<CustomizationQuestionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCustomizationQuestion =
      new CustomizationQuestions(addData);

    const customizationQuestion =
      await newCustomizationQuestion.save();

    return customizationQuestion;
  } catch (error) {
    console.error(
      "Error Adding Customization Question:",
      error
    );

    return null;
  }
};

export const updateCustomizationQuestion = async (
  customizationQuestionId: string,
  updateData: Partial<CustomizationQuestionDocument>
): Promise<CustomizationQuestionDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const customizationQuestion =
      await CustomizationQuestions.findOneAndUpdate(
        {
          _id: customizationQuestionId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return customizationQuestion;
  } catch (error) {
    console.error(
      "Error updating Customization Question:",
      error
    );

    return null;
  }
};

export const deleteCustomizationQuestion = async (
  customizationQuestionId: string
): Promise<CustomizationQuestionDocument | null> => {
  try {
    await connectDB();

    const customizationQuestion =
      await CustomizationQuestions.findOneAndUpdate(
        {
          _id: customizationQuestionId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return customizationQuestion;
  } catch (error) {
    console.error(
      "Error Deleting Customization Question:",
      error
    );

    return null;
  }
};

export const getOrderCustomizationQuestionOptions =
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
      const customizationQuestions =
        await CustomizationQuestions.find(
          query
        ).sort(sort);

      return customizationQuestions.map(
        ({ _id, question }) => ({
          label: question,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Customization Question Options:",
        error
      );

      return null;
    }
  };
