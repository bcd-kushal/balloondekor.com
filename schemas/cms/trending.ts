// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface TrendingDocument
  extends Document {
  label: string;
  path: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrendingModel
  extends Model<TrendingDocument> {}

// schemas
export const trendingSchema = new Schema<
  TrendingDocument,
  TrendingModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    path: {
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

trendingSchema.index({
  label: "text"
});
