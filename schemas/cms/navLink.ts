// libraries
import mongoose, {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface TagDocument extends Document {
  label: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NestedLinkDocument
  extends Document {
  label: string;
  url: string;
  tag: TagDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface NestedSectionDocument
  extends Document {
  heading: string;
  nestedLinks: NestedLinkDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NavLinkDocument
  extends Document {
  order: number;
  label: string;
  url: string;
  nestedSections: NestedSectionDocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NavLinkModel
  extends Model<NavLinkDocument> {}

// schemas
export const tagSchema = new Schema(
  {
    label: {
      type: String,
      required: false,
      default: ""
    },
    color: {
      type: String,
      required: false,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const nestedLinkSchema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    tag: {
      type: tagSchema,
      required: true,
      default: {
        label: "",
        color: ""
      }
    }
  },
  { timestamps: true }
);

export const nestedSectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: true
    },
    nestedLinks: [
      {
        type: nestedLinkSchema,
        required: true,
        default: []
      }
    ]
  },
  {
    timestamps: true
  }
);

export const navLinkSchema = new Schema(
  {
    order: {
      type: Number,
      required: false,
      unique: true
    },
    label: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: false
    },
    nestedSections: [
      {
        type: nestedSectionSchema,
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

navLinkSchema.index({
  label: "text"
});

navLinkSchema.pre("save", async function (next) {
  if (!this.order) {
    this.order =
      (await mongoose.models["NavLink"]
        .find()
        .countDocuments()) + 1;
  }

  next();
});
