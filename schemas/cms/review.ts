// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// type

export interface ReviewDocument extends Document {
  serviceCategory:
    | Schema.Types.ObjectId
    | ServiceCategoryDocument;
  reviewCategory: string;
  reviews: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewModel
  extends Model<ReviewDocument> {}

export const reviewsSchema = new Schema<
  ReviewDocument,
  ReviewModel
>(
  {
    serviceCategory: {
      type: Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true
    },
    reviewCategory: {
      type: String,
      required: true,
      unique: true
    },
    reviews: {
      type: [String],
      required: true,
      default: []
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

reviewsSchema.index({
  reviewCategory: "text"
});
