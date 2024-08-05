// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface DeliveryDetailDocument
  extends Document {
  label: string;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryDetailModel
  extends Model<DeliveryDetailDocument> {}

// schemas
export const deliveryDetailSchema = new Schema<
  DeliveryDetailDocument,
  DeliveryDetailModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

deliveryDetailSchema.index({
  label: "text",
  content: "text"
});
