// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// schemas
import { AddonCategoryDocument } from "./addonCategory";
import { ImageDocument } from "@/schemas/cms/image";

// types
export interface AddonDocument extends Document {
  category:
    | Schema.Types.ObjectId
    | AddonCategoryDocument;
  name: string;
  image: Schema.Types.ObjectId | ImageDocument;
  price: number;
  isCustomizable: boolean;
  customizableLabel?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddonModel
  extends Model<AddonDocument> {}

// schemas
export const addonSchema = new Schema<
  AddonDocument,
  AddonModel
>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "AddonCategory",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isCustomizable: {
      type: Boolean,
      required: false,
      default: false
    },
    customizableLabel: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      required: false,
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

addonSchema.index({
  name: "text"
});
