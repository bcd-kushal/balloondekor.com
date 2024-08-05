// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

import { AddonDocument } from "@/schemas/cms/addon";
import { AITagDocument } from "@/schemas/cms/aiTag";
import { BrandDocument } from "@/schemas/cms/brand";
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { CityDocument } from "@/schemas/cms/city";
import { ColorDocument } from "@/schemas/cms/color";
import { CustomizationQuestionDocument } from "./customizationQuestion";
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { FAQDocument } from "@/schemas/cms/faq";
import { GeneralTagDocument } from "@/schemas/cms/generalTag";
import { ImageDocument } from "@/schemas/cms/image";
import { OccasionDocument } from "@/schemas/cms/occasion";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { RelationDocument } from "@/schemas/cms/relation";
import { ReviewDocument } from "@/schemas/cms/review";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { models } from "mongoose";
import { UnitDocument } from "./unit";

// types
export interface BasePriceDocument
  extends Document {
  mrp: number;
  price: number;
}

export interface CityPriceDocument
  extends Document {
  city: Schema.Types.ObjectId | CityDocument;
  mrp: number;
  price: number;
}

export interface PriceDocument extends Document {
  base: BasePriceDocument;
  cities: CityPriceDocument[];
}

export interface MediaDocument extends Document {
  primary: Schema.Types.ObjectId | ImageDocument;
  gallery:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
  video: string;
  review:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
}

export interface DetailsDocument
  extends Document {
  info: string;
  includes: string;
  excludes?: string;
  deliveryDetails:
    | Schema.Types.ObjectId
    | DeliveryDetailDocument;
  careInfo:
    | Schema.Types.ObjectId
    | CareInfoDocument;
  cancellationPolicy:
    | Schema.Types.ObjectId
    | CancellationPolicyDocument;
  faq: Schema.Types.ObjectId | FAQDocument;
}

export interface DeliverySlotDocument
  extends Document {
  deliveryType:
    | Schema.Types.ObjectId
    | DeliveryTypeDocument;
  timeSlots:
    | Schema.Types.ObjectId[]
    | TimeSlotDocument[];
  price: number;
}

export interface DeliveryTimeDocument
  extends Document {
  orderProcessingTime:
    | Schema.Types.ObjectId
    | OrderProcessingTimeDocument;
  deliverySlots: DeliverySlotDocument[];
}

export interface ReferenceVariantCategoryDocument
  extends Document {
  label: string;
  reference:
    | Schema.Types.ObjectId
    | ServiceDocument;
}

export interface CustomVariantCategoryOptionsDocument
  extends Document {
  image: boolean;
  unit: boolean;
}

export interface CustomVariantDocument
  extends Document {
  label: string;
  price: PriceDocument;
  image?: Schema.Types.ObjectId | ImageDocument;
  value?: number;
}

export interface CustomVariantCategoryDocument
  extends Document {
  options: CustomVariantCategoryOptionsDocument;
  unit?: Schema.Types.ObjectId | UnitDocument;
  variants: CustomVariantDocument[];
}

export interface VariantCategoryDocument
  extends Document {
  label: string;
  references: ReferenceVariantCategoryDocument[];
  custom: CustomVariantCategoryDocument;
}

export interface SelectedAddonDocument
  extends Document {
  addon: Schema.Types.ObjectId | AddonDocument;
  isPopular: boolean;
}

export interface TagsDocument extends Document {
  searchTags:
    | Schema.Types.ObjectId[]
    | GeneralTagDocument[];
  promotionTags:
    | Schema.Types.ObjectId[]
    | PackageTagDocument[];
  aiTags:
    | Schema.Types.ObjectId[]
    | AITagDocument[];
}

export interface QualityDocument
  extends Document {
  rating?: number;
  totalReviews?: number;
  showReviews?: number;
  review?: Schema.Types.ObjectId | ReviewDocument;
}

export interface MetaDocument extends Document {
  title: string;
  tags: string;
  description: string;
}

export interface CustomerReviewDocument
  extends Document {
  customer: Schema.Types.ObjectId;
  rating: number;
  review: string;
}

export interface ServiceDocument
  extends Document {
  sku: string;
  name: string;
  category:
    | Schema.Types.ObjectId
    | ServiceCategoryDocument;
  categories:
    | Schema.Types.ObjectId[]
    | ServiceCategoryDocument[];
  price: PriceDocument;
  limitAvailability: boolean;
  media: MediaDocument;
  details: DetailsDocument;
  deliveryTime: DeliveryTimeDocument;
  brand: Schema.Types.ObjectId | BrandDocument;
  variants: VariantCategoryDocument[];
  addons: SelectedAddonDocument[];
  occasions:
    | Schema.Types.ObjectId[]
    | OccasionDocument[];
  relations:
    | Schema.Types.ObjectId[]
    | RelationDocument[];
  tags: TagsDocument;
  colors:
    | Schema.Types.ObjectId[]
    | ColorDocument[];
  quality: QualityDocument;
  meta: MetaDocument;
  // customerReviews: CustomerReviewDocument[]; // need separate collection
  customizationQuestions:
    | Schema.Types.ObjectId[]
    | CustomizationQuestionDocument[];
  isBestSeller: boolean;
  isCorporate: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceModel
  extends Model<ServiceDocument> {}

// schemas
export const basePriceSchema =
  new Schema<BasePriceDocument>({
    mrp: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });

export const cityPriceSchema =
  new Schema<CityPriceDocument>({
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });

export const priceSchema =
  new Schema<PriceDocument>({
    base: {
      type: basePriceSchema,
      required: true
    },
    cities: [
      {
        type: cityPriceSchema,
        required: false,
        default: []
      }
    ]
  });

export const mediaSchema =
  new Schema<MediaDocument>({
    primary: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false,
        default: []
      }
    ],
    video: {
      type: String,
      required: false
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false,
        default: []
      }
    ]
  });

export const detailsSchema =
  new Schema<DetailsDocument>({
    info: {
      type: String,
      required: false
    },
    includes: {
      type: String,
      required: true
    },
    excludes: {
      type: String,
      required: false
    },
    deliveryDetails: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryDetail",
      required: true
    },
    careInfo: {
      type: Schema.Types.ObjectId,
      ref: "CareInfo",
      required: true
    },
    cancellationPolicy: {
      type: Schema.Types.ObjectId,
      ref: "CancellationPolicy",
      required: true
    },
    faq: {
      type: Schema.Types.ObjectId,
      ref: "FAQ",
      required: true
    }
  });

export const deliverySlotSchema =
  new Schema<DeliverySlotDocument>({
    deliveryType: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryType",
      required: true
    },
    timeSlots: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ],
    price: {
      type: Number,
      required: true
    }
  });

export const deliveryTimeSchema =
  new Schema<DeliveryTimeDocument>({
    orderProcessingTime: {
      type: Schema.Types.ObjectId,
      ref: "OrderProcessingTime",
      required: true
    },
    deliverySlots: [
      {
        type: deliverySlotSchema,
        required: false,
        default: []
      }
    ]
  });

export const referenceVariantCategorySchema =
  new Schema<ReferenceVariantCategoryDocument>({
    label: {
      type: String,
      required: true
    },
    reference: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true
    }
  });

export const customVariantCategoryOptionsSchema =
  new Schema<CustomVariantCategoryOptionsDocument>(
    {
      image: {
        type: Boolean,
        required: true
      },
      unit: {
        type: Boolean,
        required: true
      }
    }
  );

export const customVariantSchema =
  new Schema<CustomVariantDocument>({
    label: {
      type: String,
      required: true
    },
    price: {
      type: priceSchema,
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    },
    value: {
      type: Number,
      required: false
    }
  });

export const customVariantCategorySchema =
  new Schema<CustomVariantCategoryDocument>({
    options: {
      type: customVariantCategoryOptionsSchema,
      required: true
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: false
    },
    variants: [
      {
        type: customVariantSchema,
        required: true
      }
    ]
  });

export const variantCategorySchema =
  new Schema<VariantCategoryDocument>({
    label: {
      type: String,
      required: true
    },
    references: [
      {
        type: referenceVariantCategorySchema,
        required: false
      }
    ],
    custom: {
      type: customVariantCategorySchema,
      required: false
    }
  });

export const selectedAddonSchema =
  new Schema<SelectedAddonDocument>({
    addon: {
      type: Schema.Types.ObjectId,
      ref: "Addon",
      required: true
    },
    isPopular: {
      type: Boolean,
      required: true,
      default: false
    }
  });

export const tagsSchema =
  new Schema<TagsDocument>({
    searchTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "GeneralTag",
        required: true
      }
    ],
    promotionTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "PackageTag",
        required: false
      }
    ],
    aiTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "AITag",
        required: true
      }
    ]
  });

export const qualitySchema =
  new Schema<QualityDocument>({
    rating: {
      type: Number,
      required: false
    },
    totalReviews: {
      type: Number,
      required: false
    },
    showReviews: {
      type: Number,
      required: false
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
      required: false
    }
  });

export const metaSchema =
  new Schema<MetaDocument>({
    title: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

export const customerReviewSchema =
  new Schema<CustomerReviewDocument>({
    customer: {
      type: Schema.Types.ObjectId,
      //   ref: "Customer",
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    review: {
      type: String,
      required: true
    }
  });

export const serviceSchema = new Schema<
  ServiceDocument,
  ServiceModel
>(
  {
    sku: {
      type: String,
      required: false,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: false
      }
    ],
    price: {
      type: priceSchema,
      required: false
    },
    limitAvailability: {
      type: Boolean,
      required: true,
      default: false
    },
    media: {
      type: mediaSchema,
      required: false
    },
    details: {
      type: detailsSchema,
      required: false
    },
    deliveryTime: {
      type: deliveryTimeSchema,
      required: false
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: false
    },
    variants: [
      {
        type: variantCategorySchema,
        required: false,
        default: []
      }
    ],
    addons: [
      {
        type: selectedAddonSchema,
        required: false,
        default: []
      }
    ],
    occasions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Occasion",
        required: false,
        default: []
      }
    ],
    relations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Relation",
        required: false,
        default: []
      }
    ],
    tags: {
      type: tagsSchema,
      required: false
    },
    colors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: false,
        default: []
      }
    ],
    quality: {
      type: qualitySchema,
      required: false
    },
    meta: {
      type: metaSchema,
      required: false
    },
    // customerReviews: [
    //   {
    //     type: customerReviewSchema,
    //     required: true
    //   }
    // ],
    customizationQuestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "CustomizationQuestion",
        required: false
      }
    ],
    isBestSeller: {
      type: Boolean,
      required: true,
      default: false
    },
    isCorporate: {
      type: Boolean,
      isRequired: true,
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

serviceSchema.index({
  name: "text"
});

serviceSchema.pre("save", async function (next) {
  if (!this.sku) {
    this.sku = `BD_SRV_${(
      (await models.Service.find().countDocuments()) +
      1
    )
      .toString()
      .padStart(5, "0")}`;
  }

  next();
});
