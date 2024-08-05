// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface LinkImageDocument
  extends Document {
  linkedTo: Schema.Types.ObjectId;
  label: String;
  url: String;
  image: Schema.Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkImageModel
  extends Model<LinkImageDocument> {}

// schemas
export const linkImageSchema = new Schema(
  {
    linkedTo: {
      type: Schema.Types.ObjectId,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);
