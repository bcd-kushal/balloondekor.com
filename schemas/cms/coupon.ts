// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// types
export interface CouponValidityDocument
  extends Document {
  from: Date;
  till: Date;
}

export interface CouponDiscountDocument
  extends Document {
  type: "fixed" | "percentage";
  amount: number;
  percentage?: number;
}

export interface CouponDocument extends Document {
  type: "free-delivery" | "discount";
  code: string;
  description: string;
  minimumOrderAmount: number;
  limitPerCustomer: number;
  valid: CouponValidityDocument;
  discount?: CouponDiscountDocument;
  applicableCategories:
    | string[]
    | ServiceCategoryDocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CouponModel
  extends Model<CouponDocument> {}

// schemas
export const couponValiditySchema =
  new Schema<CouponValidityDocument>({
    from: {
      type: Date,
      required: true
    },
    till: {
      type: Date,
      required: true
    }
  });

export const couponDiscountSchema =
  new Schema<CouponDiscountDocument>({
    type: {
      type: String,
      required: true,
      enum: ["fixed", "percentage"]
    },
    amount: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: false
    }
  });

export const couponSchema = new Schema<
  CouponDocument,
  CouponModel
>(
  {
    type: {
      type: String,
      required: true,
      enum: ["free-delivery", "discount"]
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    minimumOrderAmount: {
      type: Number,
      required: true
    },
    limitPerCustomer: {
      type: Number,
      required: true
    },
    valid: {
      type: couponValiditySchema,
      required: true
    },
    discount: {
      type: couponDiscountSchema,
      required: false
    },
    applicableCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true
      }
    ],
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);

couponSchema.index({
  code: "text",
  description: "text"
});
