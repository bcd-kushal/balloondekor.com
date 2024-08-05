// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Orders } = MODELS;

// types
import { OrderDocument } from "@/schemas/cms/order";

export const getOrders = async (
  orderIds: string[]
): Promise<OrderDocument[] | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const orders = await Orders.find({
      _id: { $in: orderIds }
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

    return orders;
  } catch (error) {
    console.error("Error getting Orders:", error);

    return null;
  }
};
