// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { OrderDetails, Services } = MODELS;

// types
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { ServiceDocument } from "@/schemas/cms/service";

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
    })
      .select([
        "city",
        "lineItems",
        "checkoutInfo",
        "appliedCoupon"
      ])
      .populate([
        {
          path: "city",
          select: "name"
        },
        {
          path: "lineItems.service",
          populate: [
            {
              path: "category",
              select: [
                "name",
                "slug",
                "advancePayment"
              ],
              populate: [
                {
                  path: "advancePayment",
                  select: ["label", "value"]
                }
              ]
            },
            {
              path: "categories",
              select: ["name", "slug"]
            },
            {
              path: "media.primary",
              select: ["alt", "defaultAlt", "url"]
            },
            {
              path: "media.gallery",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "price.cities.city",
              select: ["name"]
            },
            {
              path: "media.review",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "details.deliveryDetails"
            },
            {
              path: "details.careInfo"
            },
            {
              path: "details.cancellationPolicy"
            },
            {
              path: "details.faq"
            },
            {
              path: "deliveryTime.orderProcessingTime",
              select: ["label", "time"]
            },
            {
              path: "deliveryTime.deliverySlots.deliveryType",
              select: ["name", "timeSlots"]
            },
            {
              path: "addons.addon",
              select: [
                "name",
                "price",
                "isCustomizable"
              ],
              populate: [
                {
                  path: "category",
                  select: ["name"]
                },
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
              path: "variants.custom.unit",
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.image",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.price.cities.city",
              select: ["name"],
              strictPopulate: false
            }
          ]
        },
        {
          path: "lineItems.decorationTime.type",
          select: ["name", "price", "timeSlots"]
        },
        {
          path: "lineItems.addons",
          select: ["addon", "quantity"],
          populate: [
            {
              path: "addon",
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
            }
          ]
        },
        {
          path: "checkoutInfo.city",
          select: ["name"],
          strictPopulate: false
        },
        {
          path: "checkoutInfo.occasion",
          select: ["name"],
          strictPopulate: false
        },
        {
          path: "checkoutInfo.venue",
          select: ["venue"],
          strictPopulate: false
        },
        {
          path: "appliedCoupon",
          strictPopulate: false
        }
      ]);

    return cart;
  } catch (error: any) {
    console.error("Error getting Cart:", error);

    return null;
  }
};

export const addCart = async (
  addData: OrderDetailDocument
): Promise<OrderDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCart = new OrderDetails(addData);

    const cart = await newCart.save();

    const populatedCart = OrderDetails.findById(
      cart._id
    )
      .select([
        "city",
        "lineItems",
        "checkoutInfo",
        "appliedCoupon"
      ])
      .populate([
        {
          path: "city",
          select: "name"
        },
        {
          path: "lineItems.service",
          populate: [
            {
              path: "category",
              select: [
                "name",
                "slug",
                "advancePayment"
              ],
              populate: [
                {
                  path: "advancePayment",
                  select: ["label", "value"]
                }
              ]
            },
            {
              path: "categories",
              select: ["name", "slug"]
            },
            {
              path: "media.primary",
              select: ["alt", "defaultAlt", "url"]
            },
            {
              path: "media.gallery",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "price.cities.city",
              select: ["name"]
            },
            {
              path: "media.review",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "details.deliveryDetails"
            },
            {
              path: "details.careInfo"
            },
            {
              path: "details.cancellationPolicy"
            },
            {
              path: "details.faq"
            },
            {
              path: "deliveryTime.orderProcessingTime",
              select: ["label", "time"]
            },
            {
              path: "deliveryTime.deliverySlots.deliveryType",
              select: ["name", "timeSlots"]
            },
            {
              path: "addons.addon",
              select: [
                "name",
                "price",
                "isCustomizable"
              ],
              populate: [
                {
                  path: "category",
                  select: ["name"]
                },
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
              path: "variants.custom.unit",
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.image",
              select: [
                "alt",
                "defaultAlt",
                "url"
              ],
              strictPopulate: false
            },
            {
              path: "variants.custom.variants.price.cities.city",
              select: ["name"],
              strictPopulate: false
            }
          ]
        },
        {
          path: "lineItems.decorationTime.type",
          select: ["name", "price", "timeSlots"]
        },
        {
          path: "lineItems.addons",
          select: ["addon", "quantity"],
          populate: [
            {
              path: "addon",
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
            }
          ]
        },
        {
          path: "checkoutInfo.city",
          select: ["name"],
          strictPopulate: false
        },
        {
          path: "checkoutInfo.occasion",
          select: ["name"],
          strictPopulate: false
        },
        {
          path: "checkoutInfo.venue",
          select: ["venue"],
          strictPopulate: false
        },
        {
          path: "appliedCoupon",
          strictPopulate: false
        }
      ]);

    return populatedCart;
  } catch (error) {
    console.error("Error Adding Cart:", error);

    return null;
  }
};

export const updateCart = async (
  cartId: string,
  customerId: string,
  updateData: Partial<OrderDetailDocument>
): Promise<OrderDetailDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const cart =
      await OrderDetails.findOneAndUpdate(
        {
          _id: cartId,
          customer: customerId,
          isOrdered: false
        },
        updateData,
        {
          new: true
        }
      )
        .select([
          "city",
          "lineItems",
          "checkoutInfo",
          "appliedCoupon"
        ])
        .populate([
          {
            path: "city",
            select: "name"
          },
          {
            path: "lineItems.service",
            populate: [
              {
                path: "category",
                select: [
                  "name",
                  "slug",
                  "advancePayment"
                ],
                populate: [
                  {
                    path: "advancePayment",
                    select: ["label", "value"]
                  }
                ]
              },
              {
                path: "categories",
                select: ["name", "slug"]
              },
              {
                path: "media.primary",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ]
              },
              {
                path: "media.gallery",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ],
                strictPopulate: false
              },
              {
                path: "price.cities.city",
                select: ["name"]
              },
              {
                path: "media.review",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ],
                strictPopulate: false
              },
              {
                path: "details.deliveryDetails"
              },
              {
                path: "details.careInfo"
              },
              {
                path: "details.cancellationPolicy"
              },
              {
                path: "details.faq"
              },
              {
                path: "deliveryTime.orderProcessingTime",
                select: ["label", "time"]
              },
              {
                path: "deliveryTime.deliverySlots.deliveryType",
                select: ["name", "timeSlots"]
              },
              {
                path: "addons.addon",
                select: [
                  "name",
                  "price",
                  "isCustomizable"
                ],
                populate: [
                  {
                    path: "category",
                    select: ["name"]
                  },
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
                path: "variants.custom.unit",
                strictPopulate: false
              },
              {
                path: "variants.custom.variants.image",
                select: [
                  "alt",
                  "defaultAlt",
                  "url"
                ],
                strictPopulate: false
              },
              {
                path: "variants.custom.variants.price.cities.city",
                select: ["name"],
                strictPopulate: false
              }
            ]
          },
          {
            path: "lineItems.decorationTime.type",
            select: ["name", "price", "timeSlots"]
          },
          {
            path: "lineItems.addons",
            select: ["addon", "quantity"],
            populate: [
              {
                path: "addon",
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
              }
            ]
          },
          {
            path: "checkoutInfo.city",
            select: ["name"],
            strictPopulate: false
          },
          {
            path: "checkoutInfo.occasion",
            select: ["name"],
            strictPopulate: false
          },
          {
            path: "checkoutInfo.venue",
            select: ["venue"],
            strictPopulate: false
          },
          {
            path: "appliedCoupon",
            strictPopulate: false
          }
        ]);

    return cart;
  } catch (error) {
    console.error("Error updating Cart:", error);

    return null;
  }
};

export const getCartServices = async (
  serviceIds: string[]
): Promise<ServiceDocument[] | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const query: any = {
      isActive: true,
      isDeleted: false,
      _id: { $in: serviceIds }
    };

    // DB query
    const services = await Services.find(
      query
    ).populate([
      {
        path: "category",
        select: "name slug advancePayment",
        populate: [
          {
            path: "advancePayment",
            select: "label value"
          }
        ]
      },
      {
        path: "categories",
        select: "name slug"
      },
      {
        path: "media.primary",
        select: "alt defaultAlt url"
      },
      {
        path: "media.gallery",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "price.cities.city",
        select: "name"
      },
      {
        path: "media.review",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "details.deliveryDetails"
      },
      {
        path: "details.careInfo"
      },
      {
        path: "details.cancellationPolicy"
      },
      {
        path: "details.faq"
      },
      {
        path: "deliveryTime.orderProcessingTime",
        select: "label time"
      },
      {
        path: "deliveryTime.deliverySlots.deliveryType",
        select: "name timeSlots"
      },
      {
        path: "addons.addon",
        select: "name price isCustomizable",
        populate: [
          {
            path: "category",
            select: "name"
          },
          {
            path: "image",
            select: "alt defaultAlt url"
          }
        ]
      },
      {
        path: "variants.custom.unit",
        strictPopulate: false
      },
      {
        path: "variants.custom.variants.image",
        select: "alt defaultAlt url",
        strictPopulate: false
      },
      {
        path: "variants.custom.variants.price.cities.city",
        select: "name",
        strictPopulate: false
      }
    ]);

    return services;
  } catch (error) {
    console.error(
      "Error getting Cart Services:",
      error
    );

    return null;
  }
};
