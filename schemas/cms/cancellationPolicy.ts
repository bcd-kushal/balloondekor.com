// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface CancellationPolicyDocument
  extends Document {
  label: string;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CancellationPolicyModel
  extends Model<CancellationPolicyDocument> {}

// schemas
export const cancellationPolicySchema =
  new Schema<
    CancellationPolicyDocument,
    CancellationPolicyModel
  >(
    {
      label: {
        type: String,
        required: true,
        unique: true
      },
      content: {
        type: String,
        required: true
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

cancellationPolicySchema.index({
  label: "text",
  content: "text"
});
