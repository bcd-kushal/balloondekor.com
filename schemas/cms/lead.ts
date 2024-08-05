// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface LeadDocument extends Document {
  contactNumber: string;
  count: number;
  status:
    | ""
    | "in-progress"
    | "interested"
    | "not-interested";
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadModel
  extends Model<LeadDocument> {}

// schemas
export const leadSchema = new Schema<
  LeadDocument,
  LeadModel
>(
  {
    contactNumber: {
      type: String,
      required: true,
      unique: true
    },
    count: {
      type: Number,
      required: false,
      default: 1
    },
    status: {
      type: String,
      required: false,
      enum: [
        "",
        "in-progress",
        "interested",
        "not-interested"
      ],
      default: ""
    },
    submittedAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

leadSchema.index({
  contactNumber: "text"
});
