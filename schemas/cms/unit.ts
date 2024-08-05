// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface UnitDocument extends Document {
  name: string;
  abbr: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnitModel
  extends Model<UnitDocument> {}

// schemas
export const unitSchema = new Schema<
  UnitDocument,
  UnitModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    abbr: {
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

unitSchema.index({
  name: "text",
  abbr: "text"
});
