// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface AITagDocument extends Document {
  label: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AITagModel
  extends Model<AITagDocument> {}

// schemas
export const aiTagSchema = new Schema<
  AITagDocument,
  AITagModel
>(
  {
    label: {
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

aiTagSchema.index({
  label: "text"
});
