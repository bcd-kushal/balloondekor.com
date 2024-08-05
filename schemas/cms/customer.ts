// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
import { CouponDocument } from "@/schemas/cms/coupon";
import { OrderDocument } from "@/schemas/cms/order";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";

// types
export interface CustomerAvailedCouponDocument
  extends Document {
  coupon: string | CouponDocument;
  times: number;
}

export interface CustomerDocument
  extends Document {
  mobileNumber?: string;
  name?: string;
  password?: string;
  mail?: string;
  address?: string;
  pinCode?: string;
  gender?: "male" | "female" | "others";
  cart?: string | OrderDetailDocument;
  orders: string[] | OrderDocument[];
  availedCoupons: CustomerAvailedCouponDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerModel
  extends Model<CustomerDocument> {}

// schemas
export const customerAvailedCouponSchema =
  new Schema<CustomerAvailedCouponDocument>({
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      required: true
    },
    times: {
      type: Number,
      required: true,
      default: 1
    }
  });

export const customerSchema = new Schema<
  CustomerDocument,
  CustomerModel
>(
  {
    mobileNumber: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    mail: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    pinCode: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female", "others"]
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetail",
      required: false
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: false,
        default: []
      }
    ],
    availedCoupons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        required: false,
        default: []
      }
    ]
  },
  { timestamps: true }
);

customerSchema.index({
  mobileNumber: "text",
  mail: "text"
});
