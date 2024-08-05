// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Coupons } = MODELS;

// types
import { CouponDocument } from "@/schemas/cms/coupon";

export const getCoupons = async (
  categoryId: string
): Promise<CouponDocument[] | null> => {
  try {
    // check or set DB connection
    await connectDB();

    const query: any = {
      $and: [
        { "valid.from": { $lte: new Date() } },
        { "valid.till": { $gte: new Date() } }
      ],
      applicableCategories: { $in: [categoryId] },
      isActive: true,
      isDeleted: false
    };

    // DB query
    const coupons = await Coupons.find(
      query
    ).sort({ amount: 1 });

    return coupons;
  } catch (error) {
    console.error(
      "Error getting Coupons:",
      error
    );

    return null;
  }
};
