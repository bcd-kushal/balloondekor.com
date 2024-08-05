// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

export interface VenueDocument extends Document {
  venue: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueModel
  extends Model<VenueDocument> {}

// schemas
export const venueSchema = new Schema<
  VenueDocument,
  VenueModel
>({
  venue: {
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
});
