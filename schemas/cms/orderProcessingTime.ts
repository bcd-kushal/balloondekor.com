// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface OrderProcessingTimeDocument
  extends Document {
  label: string;
  time: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProcessingTimeModel
  extends Model<OrderProcessingTimeDocument> {}

// schemas
export const orderProcessingTimeSchema =
  new Schema<
    OrderProcessingTimeDocument,
    OrderProcessingTimeModel
  >(
    {
      label: {
        type: String,
        required: true,
        unique: true
      },
      time: {
        type: Number,
        required: true,
        unique: true
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

orderProcessingTimeSchema.index({
  label: "text",
  time: "text"
});
