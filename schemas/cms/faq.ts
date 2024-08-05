// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

export interface QADocument extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

// types
export interface FAQDocument extends Document {
  category: string;
  faqs: QADocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQModel
  extends Model<FAQDocument> {}

// schemas
export const qaSchema = new Schema<QADocument>(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const faqSchema = new Schema<
  FAQDocument,
  FAQModel
>(
  {
    category: {
      type: String,
      required: true,
      unique: true
    },
    faqs: [
      {
        type: qaSchema,
        required: true
      }
    ],
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

faqSchema.index({
  category: "text"
});
