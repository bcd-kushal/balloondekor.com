// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface GSTDocument extends Document {
  label: string;
  value: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GSTModel
  extends Model<GSTDocument> {}

// schemas
export const gstSchema = new Schema<
  GSTDocument,
  GSTModel
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

gstSchema.index({
  label: "text"
});
