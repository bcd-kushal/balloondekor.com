// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface GeneralTagDocument
  extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneralTagModel
  extends Model<GeneralTagDocument> {}

// schemas
export const generalTagSchema = new Schema<
  GeneralTagDocument,
  GeneralTagModel
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

generalTagSchema.index({
  name: "text"
});
