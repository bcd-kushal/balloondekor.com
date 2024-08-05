// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

import { ImageDocument } from "@/schemas/cms/image";

// types
export interface BasePriceDocument
  extends Document {
  mrp: number;
  price: number;
}

// export interface CityWisePriceDocument
//   extends Document {
//   placeId: string;
//   mrp: number;
//   price: number;
// }

// export interface PriceDocument extends Document {
//   base: BasePriceDocument;
//   cities: CityWisePriceDocument;
// }

export interface DeliverySlotDocument
  extends Document {
  deliverySlotID: string;
  deliverySlotTimeID: string;
  price: number;
}

export interface MediaTypeDocument
  extends Document {
  primary: Schema.Types.ObjectId | ImageDocument;
  gallery:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
  video: string;
  reviewImages:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
}

export interface MetaDocument extends Document {
  metaTitle: string;
  metaTags: string;
  metaDescription: string;
}

export interface QualityDocument
  extends Document {
  rating: number;
  totalReviewCount: number;
  showReviewCount: number;
  reviewCategory: string;
}

export interface UnitsDocument extends Document {
  unit: string;
  quantity: number;
  mrp: number;
  price: number;
  image: string | ImageDocument;
}

export interface ExtraPackagesDocument
  extends Document {
  label: string;
  images: string | ImageDocument;
  price: number;
}

export interface ProductDocument
  extends Document {
  serviceCategoryId: string[];
  productName: string;
  base: BasePriceDocument;
  //price: PriceDocument;
  baseMrp: number;
  basePrice: number;
  orderProcessingID: string;
  baseColor: string[];
  deliverySlot: DeliverySlotDocument[];
  mediaType: MediaTypeDocument;
  primary: Schema.Types.ObjectId | ImageDocument;
  gallery:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
  reviewImages:
    | Schema.Types.ObjectId[]
    | ImageDocument[];
  video: string;
  packageIncludes: string;
  packageExcludes: string;
  deliveryDetailsID: string;
  careInfoID: string;
  cancellationRefundPolicy: string;
  faq: string;
  productDetails: string;
  sku: string;
  meta: MetaDocument;
  metaTitle: string;
  metaTags: string;
  metaDescription: string;
  addons: string[];
  normalTags: string[];
  packageTags: string[];
  occasions: string[];
  relations: string[];
  brand: string;
  quality: QualityDocument;
  rating: number;
  totalReviewCount: number;
  showReviewCount: number;
  reviewCategory: string;
  chronologicalOrder: number;
  isBestSellers: boolean;
  units: UnitsDocument[];
  similarPackages: string[];
  extraPackages: ExtraPackagesDocument[];
  aiTagKeyword: string[];
  popularAddon: string[];
  generalAddon: string[];
  isCorporate: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductModel
  extends Model<ProductDocument> {}

// schemas
export const basePriceSchema = new Schema({
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
// export const cityWiseSchema = new Schema({
//   placeID: {
//     type: Schema.Types.ObjectId,
//     ref: "City",
//     required: true
//   },
//   mrp: {
//     type: Number,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   }
// });
// export const priceSchema = new Schema({
//   base: {
//     type: baseSchema,
//     required: true
//   },
//   cities: [
//     {
//       type: cityWiseSchema,
//       required: true
//     }
//   ]
// });
export const deliverySlotSchema = new Schema({
  deliverySlotID: {
    type: Schema.Types.ObjectId,
    ref: "DeliverySlot",
    required: true
  },
  deliverySlotTimeID: [
    {
      type: Schema.Types.ObjectId,
      ref: "DeliverySlotTime",
      required: true
    }
  ],
  price: {
    type: Number,
    required: true,
    default: false
  }
});

export const mediaTypeSchema = new Schema({
  primary: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  gallery: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    }
  ],
  video: {
    type: String,
    required: false,
    default: false
  },
  reviewImages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    }
  ]
});

export const metaSchema = new Schema(
  {
    metaTitle: {
      type: String,
      required: true
    },
    metaTags: {
      type: String,
      required: true
    },
    metaDescription: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const qualitySchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  totalReviewCount: {
    type: Number,
    required: true
  },
  showReviewCount: {
    type: Number,
    required: true
  },
  reviewCategory: {
    type: Schema.Types.ObjectId,
    ref: "Reviews",
    required: true
  }
});

export const unitsSchema = new Schema({
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  }
});

export const extraPackagesSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  images: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export const productSchema = new Schema(
  {
    serviceCategoryId: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true
      }
    ],
    productName: {
      type: String,
      required: true,
      unique: true
    },
    base: {
      type: basePriceSchema,
      required: true
    },
    // price: {
    //   type: priceSchema,
    //   required: true
    // },
    baseMrp: {
      type: Number,
      required: true
    },
    basePrice: {
      type: Number,
      required: true
    },
    orderProcessingID: {
      type: Schema.Types.ObjectId,
      ref: "OrderProcessingTime",
      required: true
    },
    baseColor: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: false
      }
    ],
    deliverySlot: [
      {
        type: deliverySlotSchema,
        required: true
      }
    ],
    mediaType: {
      type: mediaTypeSchema,
      required: true
    },
    primary: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    ],
    reviewImages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    ],
    video: { type: String, required: false },
    packageIncludes: {
      type: String,
      required: true
    },
    packageExcludes: {
      type: String,
      required: true
    },
    deliveryDetailsID: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryDetail",
      required: true
    },
    careInfoID: {
      type: Schema.Types.ObjectId,
      ref: "CareInfo",
      required: true
    },
    cancellationRefundPolicy: {
      type: Schema.Types.ObjectId,
      ref: "CancellationPolicy",
      required: true
    },
    faq: {
      type: Schema.Types.ObjectId,
      ref: "FAQS",
      required: true
    },
    productDetails: {
      type: String,
      required: false
    },
    sku: {
      type: String,
      required: true,
      unique: true
    },
    meta: {
      type: metaSchema,
      required: false
    },
    metaTitle: {
      type: String,
      required: true
    },
    metaTags: {
      type: String,
      required: true
    },
    metaDescription: {
      type: String,
      required: true
    },
    addons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addon",
        required: true
      }
    ],
    normalTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "GeneralTag",
        required: true
      }
    ],
    packageTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "PackageTag",
        required: true
      }
    ],
    occasions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Occasion",
        required: false
      }
    ],
    relations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Relation",
        required: false
      }
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: false
    },
    quality: {
      type: qualitySchema,
      required: true
    },
    rating: { type: Number, required: true },
    totalReviewCount: {
      type: Number,
      required: true
    },
    showReviewCount: {
      type: Number,
      required: true
    },
    reviewCategory: {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
      required: true
    },
    chronologicalOrder: {
      type: Number,
      required: true
    },
    isBestSellers: {
      type: Boolean,
      required: false
    },
    units: [
      {
        type: unitsSchema,
        required: false
      }
    ],
    similarPackages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false
      }
    ],
    extraPackages: [
      {
        type: extraPackagesSchema,
        required: false
      }
    ],
    aiTagKeyword: [
      {
        type: Schema.Types.ObjectId,
        ref: "AITag",
        required: false
      }
    ],
    popularAddon: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addon",
        required: true
      }
    ],
    generalAddon: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addon",
        required: true
      }
    ],
    isCorporate: {
      type: Boolean,
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

productSchema.index({
  productNames: "text"
});
