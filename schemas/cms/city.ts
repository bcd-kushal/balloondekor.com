// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// schemas
import { ImageDocument } from "@/schemas/cms/image";
import { StateDocument } from "@/schemas/cms/state";

// types
export interface CityDocument extends Document {
  state: Schema.Types.ObjectId | StateDocument;
  name: string;
  isTopCity: boolean;
  icon: Schema.Types.ObjectId | ImageDocument;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CityModel
  extends Model<CityDocument> {}

// schemas
export const citySchema = new Schema<
  CityDocument,
  CityModel
>(
  {
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    isTopCity: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
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

citySchema.index({
  name: "text"
});
