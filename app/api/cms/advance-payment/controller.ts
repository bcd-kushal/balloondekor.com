// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { AdvancePayments } = MODELS;

// types
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
import { QueryParamsType } from "@/types/cms/api";

export const getAdvancePayments = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: AdvancePaymentDocument[];
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
      await AdvancePayments.find(
        query
      ).countDocuments();
    const advancePayments =
      await AdvancePayments.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: advancePayments
    };
  } catch (error) {
    console.error(
      "Error getting Advance Payments:",
      error
    );

    return null;
  }
};

export const getAdvancePayment = async (
  advancePaymentId: string
): Promise<AdvancePaymentDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const advancePayment =
      await AdvancePayments.findOne({
        _id: advancePaymentId,
        isDeleted: false
      });

    return advancePayment;
  } catch (error: any) {
    console.error(
      "Error getting Advance Payment:",
      error
    );

    return null;
  }
};

export const addAdvancePayment = async (
  addData: AdvancePaymentDocument
): Promise<AdvancePaymentDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newAdvancePayment = new AdvancePayments(
      addData
    );

    const advancePayment =
      await newAdvancePayment.save();

    return advancePayment;
  } catch (error) {
    console.error(
      "Error Adding Advance Payment:",
      error
    );

    return null;
  }
};

export const updateAdvancePayment = async (
  advancePaymentId: string,
  updateData: Partial<AdvancePaymentDocument>
): Promise<AdvancePaymentDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const advancePayment =
      await AdvancePayments.findOneAndUpdate(
        {
          _id: advancePaymentId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return advancePayment;
  } catch (error) {
    console.error(
      "Error updating Advance Payment:",
      error
    );

    return null;
  }
};

export const deleteAdvancePayment = async (
  advancePaymentId: string
): Promise<AdvancePaymentDocument | null> => {
  try {
    await connectDB();

    const advancePayment =
      await AdvancePayments.findOneAndUpdate(
        {
          _id: advancePaymentId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return advancePayment;
  } catch (error) {
    console.error(
      "Error Deleting Advance Payment:",
      error
    );

    return null;
  }
};
