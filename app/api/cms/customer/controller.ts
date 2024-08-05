// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Customers } = MODELS;

// types
import { CustomerDocument } from "@/schemas/cms/customer";
import { QueryParamsType } from "@/types/cms/api";

export const getCustomers = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CustomerDocument[];
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
      toDate
    } = queryParams;

    const query: any = {};

    if (filterBy) {
      query[filterBy] = {
        $regex: new RegExp(keyword || "", "i")
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
      sort.createdAt = orderBy === "asc" ? 1 : -1;
    }

    // DB query
    const count =
      await Customers.find(
        query
      ).countDocuments();
    const customers = await Customers.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(
        populate
          ? [
              {
                path: "cart",
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
      );
    return {
      count: count,
      data: customers
    };
  } catch (error) {
    console.error(
      "Error getting Customers:",
      error
    );

    return null;
  }
};

export const getCustomer = async (
  customerId: string
): Promise<CustomerDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const customer = await Customers.findOne({
      _id: customerId
    }).populate([
      {
        path: "cart",
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

    return customer;
  } catch (error: any) {
    console.error(
      "Error getting Customer:",
      error
    );

    return null;
  }
};

export const eradicateCustomer = async (
  id: string
): Promise<boolean> => {
  try {
    await connectDB();
    const eradicationProcess =
      await Customers.findByIdAndDelete(id);

    if (!eradicationProcess) return false;

    return true;
  } catch (err: any) {
    console.error(
      `Error deleting customer from server`,
      err
    );
    return false;
  }
};
