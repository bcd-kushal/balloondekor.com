// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface ColorDocument extends Document {
  name: string;
  code: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorModel
  extends Model<ColorDocument> {}

// schemas
export const colorSchema = new Schema<
  ColorDocument,
  ColorModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
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

colorSchema.index({
  name: "text"
});
