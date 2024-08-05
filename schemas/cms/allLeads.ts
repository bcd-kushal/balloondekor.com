// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";
import {
  LineItemDocument,
  lineItemSchema
} from "./lineItem";
import { CityDocument } from "./city";

export interface AllLeadsDocument
  extends Document {
  customerId?: string;
  mobile: string;
  name?: string;
  cartItems?: LineItemDocument[];
  city?: string | CityDocument;
  type: "unregistered" | "registered";
  status:
    | ""
    | "in-progress"
    | "interested"
    | "not-interested";
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AllLeadsModel
  extends Model<AllLeadsDocument> {}

export const allLeadsSchema = new Schema<
  AllLeadsDocument,
  AllLeadsModel
>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: false
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: false
    },
    cartItems: [
      {
        type: lineItemSchema,
        required: false
      }
    ],
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: false
    },
    type: {
      type: String,
      required: false,
      enum: ["unregistered", "registered"],
      default: "unregistered"
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

allLeadsSchema.index({
  mobile: "text"
});
