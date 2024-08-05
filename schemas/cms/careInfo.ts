// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface CareInfoDocument
  extends Document {
  label: string;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareInfoModel
  extends Model<CareInfoDocument> {}

// schemas
export const careInfoSchema = new Schema<
  CareInfoDocument,
  CareInfoModel
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

careInfoSchema.index({
  label: "text",
  content: "text"
});
