// DB connection
import connectDB from "@/db/mongoose";

// models
import MODELS from "@/db/models";
const { Coupons } = MODELS;

// types
import { CouponDocument } from "@/schemas/cms/coupon";
import { QueryParamsType } from "@/types/cms/api";

export const getCoupons = async (
  queryParams: QueryParamsType
): Promise<{
  count: number;
  data: CouponDocument[];
} | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // query
    const {
      populate,
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
        filterBy === "isActive" ||
        "isCustomizable"
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
      await Coupons.find(query).countDocuments();
    const coupons = await Coupons.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(
        populate
          ? [
              {
                path: "applicableCategories",
                select: ["name"]
              }
            ]
          : []
      );

    return {
      count: count,
      data: coupons
    };
  } catch (error) {
    console.error(
      "Error getting Coupons:",
      error
    );

    return null;
  }
};

export const getCoupon = async (
  couponId: string
): Promise<CouponDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB query
    const coupon = await Coupons.findOne({
      _id: couponId,
      isDeleted: false
    }).populate([
      {
        path: "applicableCategories",
        select: ["name"]
      }
    ]);

    return coupon;
  } catch (error: any) {
    console.error("Error getting Coupon:", error);

    return null;
  }
};

export const addCoupon = async (
  addData: CouponDocument
): Promise<CouponDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB insert
    const newCoupon = new Coupons(addData);

    const coupon = await newCoupon.save();

    const populatedCoupon =
      await Coupons.findById(coupon._id).populate(
        [
          {
            path: "applicableCategories",
            select: ["name"]
          }
        ]
      );

    return populatedCoupon;
  } catch (error) {
    console.error("Error Adding Coupon:", error);

    return null;
  }
};

export const updateCoupon = async (
  couponId: string,
  updateData: Partial<CouponDocument>
): Promise<CouponDocument | null> => {
  try {
    // check or set DB connection
    await connectDB();

    // DB update
    const coupon = await Coupons.findOneAndUpdate(
      {
        _id: couponId,
        isDeleted: false
      },
      updateData,
      {
        new: true
      }
    ).populate([
      {
        path: "applicableCategories",
        select: ["name"]
      }
    ]);

    return coupon;
  } catch (error) {
    console.error(
      "Error updating Coupon:",
      error
    );

    return null;
  }
};

export const deleteCoupon = async (
  couponDocumentId: string
): Promise<CouponDocument | null> => {
  try {
    await connectDB();

    const coupon = await Coupons.findOneAndUpdate(
      {
        _id: couponDocumentId,
        isDeleted: false
      },
      { isDeleted: true },
      {
        new: true
      }
    ).populate([
      {
        path: "applicableCategories",
        select: ["name"]
      }
    ]);

    return coupon;
  } catch (error) {
    console.error(
      "Error Deleting Coupon:",
      error
    );

    return null;
  }
};
