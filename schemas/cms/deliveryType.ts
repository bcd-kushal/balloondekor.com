// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

export interface TimeSlotDocument
  extends Document {
  label: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

// types
export interface DeliveryTypeDocument
  extends Document {
  name: string;
  price: number;
  timeSlots: TimeSlotDocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryTypeModel
  extends Model<DeliveryTypeDocument> {}

// schemas
export const timeSlotSchema =
  new Schema<TimeSlotDocument>(
    {
      label: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );

export const deliveryTypeSchema = new Schema<
  DeliveryTypeDocument,
  DeliveryTypeModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    timeSlots: [
      {
        type: timeSlotSchema,
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

deliveryTypeSchema.index({
  name: "text"
});
