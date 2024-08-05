// libraries
import { Document, Schema } from "mongoose";

// types
import { ImageDocument } from "./image";

// types
export interface BannerDocument extends Document {
  desktop: string | ImageDocument;
  mobile: string | ImageDocument;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const bannerSchema =
  new Schema<BannerDocument>(
    {
      desktop: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
      },
      mobile: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
      },
      url: {
        type: String,
        required: false
      }
    },
    {
      timestamps: true
    }
  );
