// libraries
import mongoose, {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface LinkDocument extends Document {
  label: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FooterLinkSectionDocument
  extends Document {
  order: number;
  heading: string;
  url: string;
  links: LinkDocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FooterLinkSectionModel
  extends Model<FooterLinkSectionDocument> {}

// schemas
export const linkSchema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const footerLinkSectionSchema = new Schema(
  {
    order: {
      type: Number,
      required: false,
      unique: true
    },
    heading: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: false
    },
    links: [
      {
        type: linkSchema,
        required: true,
        default: []
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

footerLinkSectionSchema.index({
  heading: "text"
});

footerLinkSectionSchema.pre(
  "save",
  async function (next) {
    if (!this.order) {
      this.order =
        (await mongoose.models[
          "FooterLinkSection"
        ]
          .find()
          .countDocuments()) + 1;
    }

    next();
  }
);
