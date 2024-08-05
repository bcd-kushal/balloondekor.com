// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { OrderDetails } = MODELS;

// types
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { QueryParamsType } from "@/types/cms/api";

export const getCarts = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: OrderDetailDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      offset,
      limit,
      sortBy,
      orderBy,
      fromDate,
      toDate
    } = queryParams;

    const query: any = {
      lineItems: { $gt: [] },
      isOrdered: false
    };

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
      await OrderDetails.find(
        query
      ).countDocuments();
    const orderDetails = await OrderDetails.find(
      query
    )
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate([
        {
          path: "customer",
          select: "name"
        }
      ]);

    return {
      count: count,
      data: orderDetails
    };
  } catch (error) {
    console.error("Error getting Carts:", error);

    return null;
  }
};

export const getCart = async (
  cartId: string
): Promise<OrderDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const cart = await OrderDetails.findOne({
      _id: cartId,
      isOrdered: false
    }).populate([
      {
        path: "customer",
        select: "name"
      },
      {
        path: "city",
        select: "name"
      },
      {
        path: "lineItems.service",
        select: "name price media.primary",
        populate: [
          {
            path: "media.primary",
            select: "alt defaultAlt url"
          }
        ]
      },
      {
        path: "lineItems.decorationTime",
        select: "type timeSlot",
        populate: [
          {
            path: "type",
            select: "name price timeSlots"
          }
        ]
      },
      {
        path: "lineItems.addons",
        select: "addon quantity",
        populate: [
          {
            path: "addon",
            select: "name image price",
            populate: [
              {
                path: "image",
                select: "alt defaultAlt url"
              }
            ]
          }
        ]
      }
    ]);

    return cart;
  } catch (error: any) {
    console.error("Error getting Cart:", error);

    return null;
  }
};
