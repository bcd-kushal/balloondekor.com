// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { OrderProcessingTimes } = MODELS;

// types
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { QueryParamsType } from "@/types/cms/api";
import { OptionType } from "@/types/cms/form";

export const getOrderProcessingTimes = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: OrderProcessingTimeDocument[];
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
        filterBy === "isActive" || "isTopCity"
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
      await OrderProcessingTimes.find(
        query
      ).countDocuments();
    const orderProcessingTimes =
      await OrderProcessingTimes.find(query)
        .sort(sort)
        .skip(offset)
        .limit(limit);

    return {
      count: count,
      data: orderProcessingTimes
    };
  } catch (error) {
    console.error(
      "Error getting Order Processing Times:",
      error
    );

    return null;
  }
};

export const getOrderProcessingTime = async (
  orderProcessingTimeId: string
): Promise<OrderProcessingTimeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const orderProcessingTime =
      await OrderProcessingTimes.findOne({
        _id: orderProcessingTimeId,
        isDeleted: false
      });

    return orderProcessingTime;
  } catch (error: any) {
    console.error(
      "Error getting Order Processing Time:",
      error
    );

    return null;
  }
};

export const addOrderProcessingTime = async (
  addData: OrderProcessingTimeDocument
): Promise<OrderProcessingTimeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newOrderProcessingTime =
      new OrderProcessingTimes(addData);

    const orderProcessingTime =
      await newOrderProcessingTime.save();

    return orderProcessingTime;
  } catch (error) {
    console.error(
      "Error Adding Order Processing Time:",
      error
    );

    return null;
  }
};

export const updateOrderProcessingTime = async (
  orderProcessingTimeId: string,
  updateData: Partial<OrderProcessingTimeDocument>
): Promise<OrderProcessingTimeDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const orderProcessingTime =
      await OrderProcessingTimes.findOneAndUpdate(
        {
          _id: orderProcessingTimeId,
          isDeleted: false
        },
        updateData,
        {
          new: true
        }
      );

    return orderProcessingTime;
  } catch (error) {
    console.error(
      "Error updating Order Processing Time:",
      error
    );

    return null;
  }
};

export const deleteOrderProcessingTime = async (
  orderProcessingTimeId: string
): Promise<OrderProcessingTimeDocument | null> => {
  try {
    await connectDB();

    const orderProcessingTime =
      await OrderProcessingTimes.findOneAndUpdate(
        {
          _id: orderProcessingTimeId,
          isDeleted: false
        },
        { isDeleted: true },
        {
          new: true
        }
      );

    return orderProcessingTime;
  } catch (error) {
    console.error(
      "Error Deleting Order Processing Time:",
      error
    );

    return null;
  }
};

export const getOrderProcessingTimeOptions =
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
      const orderProcessingTimes =
        await OrderProcessingTimes.find(
          query
        ).sort(sort);

      return orderProcessingTimes.map(
        ({ _id, label }) => ({
          label,
          value: _id
        })
      );
    } catch (error) {
      console.error(
        "Error getting Order Processing Time Options:",
        error
      );

      return null;
    }
  };
