// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface BrandDocument extends Document {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandModel
  extends Model<BrandDocument> {}

// schemas
export const brandSchema = new Schema<
  BrandDocument,
  BrandModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true
    },
    address: {
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

brandSchema.index({
  name: "text"
});
