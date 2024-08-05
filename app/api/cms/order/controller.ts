// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Orders, OrderDetails } = MODELS;

// types
import { OrderDocument } from "@/schemas/cms/order";
import { QueryParamsType } from "@/types/cms/api";
import { LineItemDocument } from "@/schemas/cms/lineItem";

type OrderType =
  | "new-order"
  | "in-progress"
  | "delivered"
  | "cancelled";

type LineItemStatusTypes =
  | "ordered"
  | "preparing"
  | "on-the-way"
  | "completed"
  | "cancelled";

type QueryOrderType = Record<
  OrderType,
  Array<LineItemStatusTypes>
>;

const queryOrderMap: QueryOrderType = {
  "in-progress": ["on-the-way", "preparing"],
  "new-order": ["ordered"],
  cancelled: ["cancelled"],
  delivered: ["completed"]
};

type OrderUpdatePropsType = {
  orderId: string;
  orderDetailId: string;
  lineItemId: string;
  newStatus: LineItemStatusTypes;
  currStatus: LineItemStatusTypes;
};

export const getOrders = async (
  queryParams: QueryParamsType & {
    orderType: OrderType;
  }
): Promise<{
  count: number;
  data: OrderDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      populate,
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword,
      fromDate,
      toDate,
      orderType
    } = queryParams;

    const query: any = {};

    if (filterBy) {
      query[filterBy] = {
        $regex: new RegExp(keyword || "", "i")
      };
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    const statusBeingQueried: LineItemStatusTypes[] =
      queryOrderMap[orderType];

    // DB query
    const orders = await Orders.find(query)
      .populate(
        populate
          ? [
              {
                path: "detail",
                strictPopulate: false,
                select: [
                  "city",
                  "lineItems",
                  "checkoutInfo",
                  "appliedCoupon"
                ],
                populate: [
                  {
                    path: "city",
                    select: ["name"]
                  },
                  {
                    path: "lineItems.service",
                    select: [
                      "name",
                      "price",
                      "media.primary"
                    ],
                    populate: [
                      {
                        path: "media.primary",
                        select: [
                          "alt",
                          "defaultAlt",
                          "url"
                        ]
                      }
                    ]
                  },
                  {
                    path: "lineItems.decorationTime.type"
                  },
                  {
                    path: "lineItems.addons.addon",
                    select: [
                      "name",
                      "image",
                      "price"
                    ],
                    populate: [
                      {
                        path: "image",
                        select: [
                          "alt",
                          "defaultAlt",
                          "url"
                        ]
                      }
                    ]
                  },
                  {
                    path: "checkoutInfo",
                    strictPopulate: false,
                    populate: [
                      {
                        path: "city",
                        select: ["name"]
                      },
                      {
                        path: "occasion",
                        select: ["name"]
                      },
                      {
                        path: "venue",
                        select: ["venue"]
                      }
                    ]
                  },
                  {
                    path: "appliedCoupon",
                    strictPopulate: false
                  }
                ]
              },
              {
                path: "detail",
                populate: {
                  path: "lineItems",
                  match: {
                    status: {
                      $in: statusBeingQueried
                    }
                  }
                }
              }
            ]
          : []
      )
      .sort(sort)
      .skip(offset)
      .limit(limit);

    const count = orders.length;

    return {
      count: count,
      data: orders
    };
  } catch (error) {
    console.error("Error getting Orders:", error);

    return null;
  }
};

export const getOrder = async (
  orderId: string
): Promise<OrderDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const Order = await Orders.findOne({
      _id: orderId,
      isDeleted: false
    }).populate([
      {
        path: "detail",
        strictPopulate: false,
        select: [
          "city",
          "lineItems",
          "checkoutInfo",
          "appliedCoupon"
        ],
        populate: [
          {
            path: "city",
            select: ["name"]
          },
          {
            path: "lineItems.service",
            select: [
              "name",
              "price",
              "media.primary"
            ],
            populate: [
              {
                path: "media.primary",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ]
              }
            ]
          },
          {
            path: "lineItems.decorationTime.type"
          },
          {
            path: "lineItems.addons.addon",
            select: ["name", "image", "price"],
            populate: [
              {
                path: "image",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ]
              }
            ]
          },
          {
            path: "checkoutInfo",
            strictPopulate: false,
            populate: [
              {
                path: "city",
                select: ["name"]
              },
              {
                path: "occasion",
                select: ["name"]
              },
              {
                path: "venue",
                select: ["venue"]
              }
            ]
          },
          {
            path: "appliedCoupon",
            strictPopulate: false
          }
        ]
      }
    ]);

    return Order;
  } catch (error: any) {
    console.error("Error getting Order:", error);

    return null;
  }
};

export const updateOrderStatus = async ({
  orderId,
  orderDetailId,
  lineItemId,
  newStatus,
  currStatus
}: OrderUpdatePropsType): Promise<boolean> => {
  try {
    await connectDB();

    const detail = await OrderDetails.findById(
      orderDetailId
    );
    if (!detail) {
      throw new Error("");
    }

    const lineItems = detail?.lineItems;
    const updatedLineItems = lineItems?.map(
      (obj) =>
        obj._id === lineItemId
          ? obj
          : { ...obj, status: newStatus }
    );

    detail.lineItems =
      updatedLineItems as LineItemDocument[];

    await detail.save();

    return true;
  } catch (err: any) {
    console.error(
      `Failed to update order status: ${err}`
    );
    return false;
  }
};

export const getFailedOrders = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: OrderDocument[];
} | null> => {
  try {
    await connectDB();

    // query
    const {
      populate,
      offset,
      limit,
      sortBy,
      orderBy,
      filterBy,
      keyword,
      fromDate,
      toDate
    } = queryParams;

    const query: any = {};

    query["payment.status"] = "pending";

    if (filterBy) {
      query[filterBy] = {
        $regex: new RegExp(keyword || "", "i")
      };
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    const orders = await Orders.find(query)
      .populate(
        populate
          ? [
              {
                path: "detail",
                strictPopulate: false,
                select: [
                  "city",
                  "lineItems",
                  "checkoutInfo",
                  "appliedCoupon"
                ],
                populate: [
                  {
                    path: "city",
                    select: ["name"]
                  },
                  {
                    path: "lineItems.service",
                    select: [
                      "name",
                      "price",
                      "media.primary"
                    ],
                    populate: [
                      {
                        path: "media.primary",
                        select: [
                          "alt",
                          "defaultAlt",
                          "url"
                        ]
                      }
                    ]
                  },
                  {
                    path: "lineItems.decorationTime.type"
                  },
                  {
                    path: "lineItems.addons.addon",
                    select: [
                      "name",
                      "image",
                      "price"
                    ],
                    populate: [
                      {
                        path: "image",
                        select: [
                          "alt",
                          "defaultAlt",
                          "url"
                        ]
                      }
                    ]
                  },
                  {
                    path: "checkoutInfo",
                    strictPopulate: false,
                    populate: [
                      {
                        path: "city",
                        select: ["name"]
                      },
                      {
                        path: "occasion",
                        select: ["name"]
                      },
                      {
                        path: "venue",
                        select: ["venue"]
                      }
                    ]
                  },
                  {
                    path: "appliedCoupon",
                    strictPopulate: false
                  }
                ]
              }
            ]
          : []
      )
      .sort(sort)
      .skip(offset)
      .limit(limit);

    const count = orders.length;

    return {
      count: count,
      data: orders
    };
  } catch (err: any) {
    console.error(
      `Failed to read filed orders from database: ${err}`
    );
    return null;
  }
};
