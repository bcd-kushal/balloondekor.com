// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { CancellationPolicies } = MODELS;

// types
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getCancellationPolicies = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CancellationPolicyDocument[];
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
      await CancellationPolicies.find(
        query
      ).countDocuments();
    const cancellationPolicies =
      await CancellationPolicies.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: cancellationPolicies
    };
  } catch (error) {
    console.error(
      "Error getting Cancellation Policies:",
      error
    );

    return null;
  }
};

export const getCancellationPolicy = async (
  cancellationPolicyId: string
): Promise<CancellationPolicyDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const cancellationPolicy =
      await CancellationPolicies.findOne({
        _id: cancellationPolicyId,
        isDeleted: false
      });

    return cancellationPolicy;
  } catch (error: any) {
    console.error(
      "Error getting Cancellation Policy:",
      error
    );

    return null;
  }
};

export const addCancellationPolicy = async (
  addData: CancellationPolicyDocument
): Promise<CancellationPolicyDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCancellationPolicy =
      new CancellationPolicies(addData);

    const cancellationPolicy =
      await newCancellationPolicy.save();

    return cancellationPolicy;
  } catch (error) {
    console.error(
      "Error Adding Cancellation Policy:",
      error
    );

    return null;
  }
};

export const updateCancellationPolicy = async (
  cancellationPolicyId: string,
  updateData: Partial<CancellationPolicyDocument>
): Promise<CancellationPolicyDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const cancellationPolicy =
      await CancellationPolicies.findOneAndUpdate(
        {
          _id: cancellationPolicyId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return cancellationPolicy;
  } catch (error) {
    console.error(
      "Error updating Cancellation Policy:",
      error
    );

    return null;
  }
};

export const deleteCancellationPolicy = async (
  cancellationPolicyId: string
): Promise<CancellationPolicyDocument | null> => {
  try {
    await connectDB();

    const cancellationPolicy =
      await CancellationPolicies.findOneAndUpdate(
        {
          _id: cancellationPolicyId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return cancellationPolicy;
  } catch (error) {
    console.error(
      "Error Deleting Cancellation Policy:",
      error
    );

    return null;
  }
};

export const getCancellationPolicyOptions =
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
      const cancellationPolicies =
        await CancellationPolicies.find(
          query
        ).sort(sort);

      return cancellationPolicies.map(
        ({ _id, label }) => ({
          label,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Cancellation Policy Options:",
        error
      );

      return null;
    }
  };
