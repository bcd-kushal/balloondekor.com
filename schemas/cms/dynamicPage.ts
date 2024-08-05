// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface DynamicPageDocument
  extends Document {
  name: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaTags: string;
  metaDescription: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DynamicPageModel
  extends Model<DynamicPageDocument> {}

// schemas
export const dynamicPageSchema = new Schema<
  DynamicPageDocument,
  DynamicPageModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    metaTitle: {
      type: String,
      required: false
    },
    metaTags: {
      type: String,
      required: false
    },
    metaDescription: {
      type: String,
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

// Indexes
dynamicPageSchema.index({
  name: "text",
  slug: "text",
  content: "text",
  metaTitle: "text",
  metaTags: "text",
  metaDescription: "text"
});
