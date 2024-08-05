// libraries
import { Document, Schema } from "mongoose";

// types
import { CityDocument } from "./city";
import { OccasionDocument } from "./occasion";
import { VenueDocument } from "../services/venue";

// types

export interface CheckoutInfoDocument
  extends Document {
  name: string;
  mobileNumber: string;
  alternateMobileNumber?: string;
  mail: string;
  address: string;
  landmark?: string;
  pinCode: number;
  city: string | CityDocument;
  occasion?: string | OccasionDocument;
  venue?: string | VenueDocument;
  createdAt: Date;
  updatedAt: Date;
}

// schemas
export const checkoutInfoSchema =
  new Schema<CheckoutInfoDocument>(
    {
      name: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true
      },
      alternateMobileNumber: {
        type: String,
        required: false
      },
      mail: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      landmark: {
        type: String,
        required: false
      },
      pinCode: {
        type: Number,
        required: true
      },
      city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true
      },
      occasion: {
        type: Schema.Types.ObjectId,
        ref: "Occasion",
        required: false
      },
      venue: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: false
      }
    },
    { timestamps: true }
  );
