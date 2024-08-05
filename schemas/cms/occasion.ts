// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface OccasionDocument
  extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OccasionModel
  extends Model<OccasionDocument> {}

// schemas
export const occasionSchema = new Schema<
  OccasionDocument,
  OccasionModel
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

occasionSchema.index({
  name: "text"
});
