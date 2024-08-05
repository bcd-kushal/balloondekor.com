// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface AddonCategoryDocument
  extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddonCategoryModel
  extends Model<AddonCategoryDocument> {}

// schemas
export const addonCategorySchema = new Schema<
  AddonCategoryDocument,
  AddonCategoryModel
>(
  {
    name: {
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

addonCategorySchema.index({
  name: "text"
});
