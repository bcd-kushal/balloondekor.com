// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
import {
  CheckoutInfoDocument,
  checkoutInfoSchema
} from "@/schemas/cms/checkoutInfo";
import { CityDocument } from "@/schemas/cms/city";
import { CouponDocument } from "@/schemas/cms/coupon";
import { CustomerDocument } from "@/schemas/cms/customer";
import {
  LineItemDocument,
  lineItemSchema
} from "@/schemas/cms/lineItem";

// types
export interface OrderDetailDocument
  extends Document {
  customer: string | CustomerDocument;
  city: string | CityDocument;
  lineItems: LineItemDocument[];
  checkoutInfo?: CheckoutInfoDocument;
  appliedCoupon?: string | CouponDocument;
  isOrdered: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDetailModel
  extends Model<OrderDetailDocument> {}

// schemas
export const orderDetailSchema = new Schema<
  OrderDetailDocument,
  OrderDetailModel
>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    lineItems: [
      {
        type: lineItemSchema,
        required: true
      }
    ],
    checkoutInfo: {
      type: checkoutInfoSchema,
      required: false
    },
    appliedCoupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      required: false
    },
    isOrdered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);
