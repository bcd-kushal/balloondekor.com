// libraries
import mongoose, {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface ImageDocument extends Document {
  folderId: Schema.Types.ObjectId;
  folderName: string;
  name: string;
  data?: string; // base64 encoded string
  extension: string;
  defaultAlt: string;
  alt: string;
  width: number;
  height: number;
  size: number;
  url: string;
  inBin: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageModel
  extends Model<ImageDocument> {}

// schemas
export const imageSchema = new Schema(
  {
    folderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    folderName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    extension: {
      type: String,
      required: true
    },
    defaultAlt: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: ""
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: false
    },
    size: {
      type: Number,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    inBin: {
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

imageSchema.index({
  defaultAlt: "text",
  alt: "text"
});

imageSchema.post(
  "save",
  async function (doc, next) {
    const folderId = doc.folderId;

    await mongoose.models[
      "Folder"
    ].findByIdAndUpdate(folderId, {
      $inc: { imageCount: 1 }
    });

    next();
  }
);

imageSchema.post(
  "findOneAndUpdate",
  async function (doc, next) {
    const folderId = doc.folderId;

    if (doc.isDeleted)
      await mongoose.models[
        "Folder"
      ].findByIdAndUpdate(folderId, {
        $inc: { imageCount: -1 }
      });

    next();
  }
);
