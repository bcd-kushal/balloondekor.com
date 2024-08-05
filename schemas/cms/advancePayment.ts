// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface AdvancePaymentDocument
  extends Document {
  label: string;
  value: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvancePaymentModel
  extends Model<AdvancePaymentDocument> {}

// schemas
export const advancePaymentSchema = new Schema<
  AdvancePaymentDocument,
  AdvancePaymentModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: Number,
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

advancePaymentSchema.index({
  label: "text"
});
