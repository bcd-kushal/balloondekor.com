// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// schemas
import { ImageDocument } from "@/schemas/cms/image";
import { GSTDocument } from "./gst";
import { AdvancePaymentDocument } from "./advancePayment";
import {
  BannerDocument,
  bannerSchema
} from "./banner";

// types
export interface LinkImageDocument
  extends Document {
  label: string;
  url: string;
  image?: string | ImageDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQDocument extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOSchemaRatingDocument
  extends Document {
  "@type": "AggregateRating";
  bestRating: number;
  ratingValue: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOSchemaOfferDocument
  extends Document {
  "@type": "AggregateOffer";
  highPrice: number;
  lowPrice: number;
  offerCount: number;
  priceCurrency: "INR";
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOSchemaDocument
  extends Document {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  aggregateRating: SEOSchemaRatingDocument;
  offers: SEOSchemaOfferDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategoryDocument
  extends Document {
  // basic
  name: string;
  slug: string;
  // visual
  heading: string;
  openIn: string;
  showRelatedCategories: boolean;
  relatedCategories:
    | Schema.Types.ObjectId[]
    | ServiceCategoryDocument[];
  deliveryCharge: number;
  gst: Schema.Types.ObjectId | GSTDocument;
  advancePayment:
    | Schema.Types.ObjectId
    | AdvancePaymentDocument;
  topContent: string;
  bottomContent: string;
  // media
  icon: Schema.Types.ObjectId | ImageDocument;
  banners: BannerDocument[];
  quickLinks: LinkImageDocument[];
  // seo
  seoSchema: SEOSchemaDocument;
  faqs: FAQDocument[];
  metaTitle: string;
  metaTags: string;
  metaDescription: string;
  // meta
  isCompleted: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategoryModel
  extends Model<ServiceCategoryDocument> {}

// schemas
export const linkImageSchema =
  new Schema<LinkImageDocument>(
    {
      label: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    },
    { timestamps: true }
  );

export const faqSchema = new Schema<FAQDocument>(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const seoSchemaRatingSchema =
  new Schema<SEOSchemaRatingDocument>(
    {
      "@type": {
        type: String,
        required: false,
        default: "AggregateRating"
      },
      bestRating: {
        type: Number,
        required: false,
        default: 5.0
      },
      ratingValue: {
        type: Number,
        required: false
      },
      ratingCount: {
        type: Number,
        required: false
      }
    },
    { timestamps: true }
  );

export const seoSchemaOfferSchema =
  new Schema<SEOSchemaOfferDocument>(
    {
      "@type": {
        type: String,
        required: false,
        default: "AggregateOffer"
      },
      highPrice: {
        type: Number,
        required: false
      },
      lowPrice: {
        type: Number,
        required: false
      },
      offerCount: {
        type: Number,
        required: false
      },
      priceCurrency: {
        type: String,
        required: false,
        default: "INR"
      }
    },
    { timestamps: true }
  );

export const seoSchemaSchema =
  new Schema<SEOSchemaDocument>(
    {
      "@context": {
        type: String,
        required: false,
        default: "https://schema.org"
      },
      "@type": {
        type: String,
        required: false,
        default: "product"
      },
      name: {
        type: String,
        required: false,
        default: ""
      },
      aggregateRating: {
        type: seoSchemaRatingSchema,
        required: false,
        default: {
          "@type": undefined,
          bestRating: undefined,
          ratingValue: undefined,
          ratingCount: undefined
        }
      },
      offers: {
        type: seoSchemaOfferSchema,
        required: false,
        default: {
          "@type": undefined,
          highPrice: undefined,
          lowPrice: undefined,
          offerCount: undefined,
          priceCurrency: undefined
        }
      }
    },
    { timestamps: true }
  );

export const serviceCategorySchema = new Schema<
  ServiceCategoryDocument,
  ServiceCategoryModel
>(
  {
    // basic
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    // visual
    heading: {
      type: String,
      required: false
    },
    openIn: {
      type: String,
      required: false
    },
    showRelatedCategories: {
      type: Boolean,
      required: true,
      default: false
    },
    relatedCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: false
      }
    ],
    deliveryCharge: {
      type: Number,
      required: false
    },
    gst: {
      type: Schema.Types.ObjectId,
      ref: "GST",
      required: false
    },
    advancePayment: {
      type: Schema.Types.ObjectId,
      ref: "AdvancePayment",
      required: false
    },
    topContent: {
      type: String,
      required: false
    },
    bottomContent: {
      type: String,
      required: false
    },
    // media
    icon: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    },
    banners: [
      {
        type: bannerSchema,
        required: false
      }
    ],
    quickLinks: [
      {
        type: linkImageSchema,
        required: false
      }
    ],
    // seo
    seoSchema: {
      type: seoSchemaSchema,
      required: false,
      default: {
        "@context": undefined,
        "@type": undefined,
        name: undefined,
        aggregateRating: undefined,
        offers: undefined
      }
    },
    faqs: [
      {
        type: faqSchema,
        required: false
      }
    ],
    metaTitle: {
      type: String,
      required: false
    },
    metaTags: {
      type: String,
      required: false
    },
    metaDescription: {
      type: String,
      required: false
    },
    // meta
    isCompleted: {
      type: Boolean,
      required: true,
      default: false
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
  },
  { timestamps: true }
);

serviceCategorySchema.index({
  name: "text",
  slug: "text",
  heading: "text",
  topContent: "text",
  bottomContent: "text",
  metaTitle: "text",
  metaTags: "text",
  metaDescription: "text"
});
