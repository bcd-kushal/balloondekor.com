// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { FAQs } = MODELS;

// types
import { FAQDocument } from "@/schemas/cms/faq";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getFAQs = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: FAQDocument[];
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
      await FAQs.find(query).countDocuments();
    const faqs = await FAQs.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return {
      count: count,
      data: faqs
    };
  } catch (error) {
    console.error("Error getting FAQs:", error);

    return null;
  }
};

export const getFAQ = async (
  faqId: string
): Promise<FAQDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const faq = await FAQs.findOne({
      _id: faqId,
      isDeleted: false
    });

    return faq;
  } catch (error: any) {
    console.error("Error getting FAQ:", error);

    return null;
  }
};

export const addFAQ = async (
  addData: FAQDocument
): Promise<FAQDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newFAQ = new FAQs(addData);

    const faq = await newFAQ.save();

    return faq;
  } catch (error) {
    console.error("Error Adding FAQ:", error);

    return null;
  }
};

export const updateFAQ = async (
  faqId: string,
  updateData: Partial<FAQDocument>
): Promise<FAQDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const faq = await FAQs.findOneAndUpdate(
      {
        _id: faqId,
        isDeleted: false
      },
      updateData,

      {
        new: true
      }
    );

    return faq;
  } catch (error) {
    console.error("Error updating FAQ:", error);

    return null;
  }
};

export const deleteFAQ = async (
  faqId: string
): Promise<FAQDocument | null> => {
  try {
    await connectDB();

    const faq = await FAQs.findOneAndUpdate(
      {
        _id: faqId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    );

    return faq;
  } catch (error) {
    console.error("Error Deleting FAQ:", error);

    return null;
  }
};

export const getFAQOptions = async (): Promise<
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
    const faqs =
      await FAQs.find(query).sort(sort);

    return faqs.map(({ _id, category }) => ({
      label: category,
      value: _id
    }));
  } catch (error) {
    console.error(
      "Error getting FAQ Options:",
      error
    );

    return null;
  }
};
