// libraries
import {
  Document,
  Model,
  models,
  Schema
} from "mongoose";

// schemas
import {
  BannerDocument,
  bannerSchema
} from "@/schemas/cms/banner";
import { ImageDocument } from "@/schemas/cms/image";

// types
export interface ContentDocument
  extends Document {
  heading: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BtnDocument extends Document {
  label: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkImageDocument
  extends Document {
  label: string;
  url: string;
  image: string | ImageDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface SectionDocument
  extends Document {
  heading: string;
  subHeading: string;
  btn: BtnDocument;
  linkImages: LinkImageDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HomepageLayoutDocument
  extends Document {
  // basic
  layout:
    | "banner"
    | "circle"
    | "square-m"
    | "square-l"
    | "tiles"
    | "collage"
    | "text"
    | "faq"
    | "quick-link";
  order: number;
  heading: string;
  subHeading: string;
  banners: BannerDocument[];
  contents: ContentDocument[];
  sections: SectionDocument[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomepageLayoutModel
  extends Model<HomepageLayoutDocument> {}

// schemas
export const contentSchema = new Schema(
  {
    heading: {
      type: String,
      required: false,
      default: ""
    },
    content: {
      type: String,
      required: false,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const btnSchema = new Schema(
  {
    label: {
      type: String,
      required: false,
      default: ""
    },
    url: {
      type: String,
      required: false,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const linkImageSchema = new Schema(
  {
    label: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    }
  },
  { timestamps: true }
);

export const sectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: false,
      default: ""
    },
    subHeading: {
      type: String,
      required: false,
      default: ""
    },
    btn: {
      type: btnSchema,
      required: false
    },
    linkImages: [
      {
        type: linkImageSchema,
        required: false
      }
    ]
  },
  {
    timestamps: true
  }
);

export const homepageLayoutSchema = new Schema<
  HomepageLayoutDocument,
  HomepageLayoutModel
>(
  {
    order: {
      type: Number,
      required: false,
      unique: true
    },
    layout: {
      type: String,
      required: true,
      enum: [
        "banner",
        "circle",
        "square-m",
        "square-l",
        "tiles",
        "collage",
        "text",
        "faq",
        "quick-link"
      ]
    },
    heading: {
      type: String,
      required: false,
      default: ""
    },
    subHeading: {
      type: String,
      required: false,
      default: ""
    },
    banners: [
      {
        type: bannerSchema,
        required: false
      }
    ],
    contents: [
      {
        type: contentSchema,
        required: false
      }
    ],
    sections: [
      {
        type: sectionSchema,
        required: false
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

homepageLayoutSchema.index({
  heading: "text",
  subHeading: "text"
});

homepageLayoutSchema.pre(
  "save",
  async function (next) {
    if (!this.order) {
      this.order =
        (await models.HomepageLayout.find().countDocuments()) +
        1;
    }

    next();
  }
);
