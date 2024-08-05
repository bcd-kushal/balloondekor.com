// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";

// types
export interface OrderPaymentGatewayDocument
  extends Document {
  name: "offline" | "razorpay" | "payu";
  info?: Record<string, unknown>;
}

export interface OrderPaymentDocument
  extends Document {
  status: "pending" | "completed";
  percentage: number;
  amount: number;
  gateway: OrderPaymentGatewayDocument;
}

export interface OrderDocument extends Document {
  id: string;
  detail: string | OrderDetailDocument;
  payment: OrderPaymentDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderModel
  extends Model<OrderDocument> {}

// schemas
export const orderPaymentGatewaySchema =
  new Schema<OrderPaymentGatewayDocument>({
    name: {
      type: String,
      required: true,
      enum: ["offline", "razorpay", "payu"]
    },
    info: {
      type: Schema.Types.Mixed,
      required: false
    }
  });

export const orderPaymentSchema =
  new Schema<OrderPaymentDocument>({
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"]
    },
    percentage: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    gateway: {
      type: orderPaymentGatewaySchema,
      required: true
    }
  });

export const orderSchema = new Schema<
  OrderDocument,
  OrderModel
>(
  {
    id: {
      type: String,
      required: true
    },
    detail: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetail",
      required: true
    },
    payment: {
      type: orderPaymentSchema,
      required: true
    }
  },
  { timestamps: true }
);
