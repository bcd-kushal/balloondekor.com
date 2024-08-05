// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface RelationDocument
  extends Document {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RelationModel
  extends Model<RelationDocument> {}

// schemas
export const relationSchema = new Schema<
  RelationDocument,
  RelationModel
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

relationSchema.index({
  name: "text"
});
