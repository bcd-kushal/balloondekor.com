// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface FolderDocument extends Document {
  name: string;
  label: string;
  imageCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderModel
  extends Model<FolderDocument> {}

// schemas
export const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
      unique: true
    },
    imageCount: {
      type: Number,
      required: false,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);
