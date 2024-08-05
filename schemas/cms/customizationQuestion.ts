// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface CustomizationQuestionDocument
  extends Document {
  question: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomizationQuestionModel
  extends Model<CustomizationQuestionDocument> {}

// schemas
export const customizationQuestionSchema =
  new Schema<
    CustomizationQuestionDocument,
    CustomizationQuestionModel
  >(
    {
      question: {
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

customizationQuestionSchema.index({
  question: "text"
});
