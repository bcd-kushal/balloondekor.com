// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface StateDocument extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StateModel
  extends Model<StateDocument> {}

// schemas
export const stateSchema = new Schema<
  StateDocument,
  StateModel
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

stateSchema.index({
  name: "text"
});
