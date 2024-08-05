// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface ServiceTypeOptionDocument
  extends Document {
  name: string;
  price: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceTypeOptionModel
  extends Model<ServiceTypeOptionDocument> {}

// schemas
export const serviceTypeOptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
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

serviceTypeOptionSchema.index({
  name: "text"
});
