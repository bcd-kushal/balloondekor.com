// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface PackageTagDocument
  extends Document {
  name: string;
  colorCode: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageTagModel
  extends Model<PackageTagDocument> {}

// schemas
export const packageTagSchema = new Schema<
  PackageTagDocument,
  PackageTagModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    colorCode: {
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

packageTagSchema.index({
  name: "text"
});
