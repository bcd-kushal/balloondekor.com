// libraries
import { Document, Schema } from "mongoose";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { ServiceDocument } from "@/schemas/cms/service";

// types
export interface LineItemDecorationTimeDocument
  extends Document {
  type: string | DeliveryTypeDocument;
  timeSlot: string | TimeSlotDocument;
}

export interface LineItemAddonDocument
  extends Document {
  addon: string | AddonDocument;
  pricePerUnit?: number;
  quantity: number;
  customizationOption?: string;
}

export interface LineItemDocument
  extends Document {
  service: string | ServiceDocument;
  customVariant?: string;
  pricePerUnit?: number;
  quantity: number;
  eventDate: string | Date;
  decorationTime: LineItemDecorationTimeDocument;
  instruction?: string;
  addons: LineItemAddonDocument[];
  isRequestedForCancellation: boolean;
  status:
    | "ordered"
    | "preparing"
    | "on-the-way"
    | "completed"
    | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// schemas
export const lineItemDecorationTimeSchema =
  new Schema<LineItemDecorationTimeDocument>({
    type: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryType",
      required: true
    },
    timeSlot: {
      type: Schema.Types.ObjectId,
      required: true
    }
  });

export const lineItemAddonSchema =
  new Schema<LineItemAddonDocument>({
    addon: {
      type: Schema.Types.ObjectId,
      ref: "Addon",
      required: true
    },
    pricePerUnit: {
      type: Number,
      required: false
    },
    quantity: {
      type: Number,
      required: true
    },
    customizationOption: {
      type: String,
      required: false
    }
  });

export const lineItemSchema =
  new Schema<LineItemDocument>(
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
      },
      customVariant: {
        type: Schema.Types.ObjectId,
        required: false
      },
      pricePerUnit: {
        type: Number,
        required: false
      },
      quantity: {
        type: Number,
        required: true
      },
      eventDate: {
        type: Date,
        required: true
      },
      decorationTime: {
        type: lineItemDecorationTimeSchema,
        required: true
      },
      instruction: {
        type: String,
        required: false
      },
      addons: [
        {
          type: lineItemAddonSchema,
          required: false,
          default: []
        }
      ],
      isRequestedForCancellation: {
        type: Boolean,
        required: false,
        default: false
      },
      status: {
        type: String,
        required: false,
        enum: [
          "ordered",
          "preparing",
          "on-the-way",
          "completed",
          "cancelled"
        ],
        default: "ordered"
      }
    },
    { timestamps: true }
  );
