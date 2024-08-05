import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { CustomerDocument } from "@/schemas/cms/customer";
import { OccasionDocument } from "@/schemas/cms/occasion";
import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { VenueDocument } from "@/schemas/services/venue";
import React, { SetStateAction } from "react";

export type CartProgressType = Array<{
  label: string;
  side: "left" | "center" | "right";
  completed:
    | "completed"
    | "currentlyActive"
    | "untouched";
  position: "last" | "first" | "inBetween";
}>;

export type PriceDetailsType = {
  basePrices: {
    baseTotal: {
      label: string;
      amount: number;
    };
    addonTotal: {
      label: string;
      amount: number;
    };
    totalAmount: {
      label: string;
      amount: number;
    };
  };
  coupon: {
    label: string;
    amount: number;
    isApplicable: boolean;
  };
  finalAmount: {
    label: string;
    amount: number;
    rawAmount: number;
  };
};

export type CompletionStatusType =
  | "completed"
  | "currentlyActive"
  | "untouched";

export type NavigationType = {
  goBack: () => void;
  goForward: () => void;
};

export type SelectedAddonType = {
  label: string;
  price: number;
  amount: number;
  image: {
    url: string;
    alt: string;
  };
  id: string;
};

export type CartDetailsType = {
  serviceId: string;
  serviceName: string;
  serviceImage: {
    alt: string;
    url: string;
  };
  pricePerUnit: number;
  totalUnits: number;
  eventDate: Date | string;
  eventTime: string;
  instruction?: string;
  addons: SelectedAddonType[];
  customVariant?: {
    label: string;
    id: string;
    price: {
      base: number;
      cities: { price: number; city: string }[];
    };
    img?: { src: string; alt: string };
  };
};

export type CouponType = {
  couponId: string;
  discountType:
    | "flat"
    | "percentage"
    | "freeDelivery";
  discount: number;
  maxCap: number;
  couponCode: string;
  minReqAmount: number;
  description?: string;
};

export type HandleQuantityType = {
  service: (
    id: string,
    relatedDate: string,
    newQuantity: number
  ) => void;
  addon: (
    serviceId: string,
    relatedServiceDate: string,
    addonId: string,
    newQuantity: number
  ) => void;
};

export type HandleDeletionType = {
  service: (
    id: string,
    relatedDate: string
  ) => void;
  addon: (
    serviceId: string,
    relatedServiceDate: string,
    addonId: string
  ) => void;
};

export type HandleInstructionManagementType = (
  serviceId: string,
  relatedDate: string,
  prevInstruction: string | undefined,
  newInstruction: string | undefined
) => void;

export type EditCartServiceDateTimeType = {
  editDate: (
    serviceId: string,
    relatedDate: string,
    serviceName: string,
    currDate: string
  ) => void;
  editTime: (
    serviceId: string,
    relatedDate: string,
    serviceName: string,
    currDate: string,
    currTime: string
  ) => void;
};

export type EditAddonType = (
  serviceId: string,
  relatedDate: string,
  selectedAddons: SelectedAddonType[]
) => void;

export type EditAddonsType = {
  serviceId: string;
  relatedDate: string;
  selectedAddons: SelectedAddonType[];
  cartServicesServiceDocumentData: ServiceDocument[];
  setServiceInQuestion: React.Dispatch<
    SetStateAction<ServiceDocument | undefined>
  >;
  setServiceInQuestionsDate: React.Dispatch<
    SetStateAction<string>
  >;
  setFullAddonsData: React.Dispatch<
    SetStateAction<SelectedAddonDocument[]>
  >;
  setShowAddonsDialog: React.Dispatch<
    SetStateAction<boolean>
  >;
  setSelectedAddons: React.Dispatch<
    SetStateAction<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >
  >;
};

export type UpdateAddonsType = {
  serviceId: string;
  relatedDate: string;
  newChosenAddonsCartWrapper: CartDetailsType;
  cartDetails: CartDetailsType[];
  setCartDetails: React.Dispatch<
    SetStateAction<CartDetailsType[]>
  >;
  setCartHasUpdate: React.Dispatch<
    SetStateAction<{
      cart: boolean;
      checkoutFormData: boolean;
    }>
  >;
};

export type CheckoutFormFieldType = {
  title: string;
  required: boolean;
  className?: string;
  name: string;
  disabled?: boolean;
  value?: string;
  hasError?: boolean | undefined;
} & (
  | {
      variant: "text" | "longText";
      defaultValue?: string;
      setValue: (val: string) => void;
    }
  | {
      variant: "number";
      defaultValue?: string;
      setValue: (val: string) => void;
    }
  | {
      variant: "dropdown";
      dropdownOptionPlaceholder: string;
      defaultOptionValue: string;
      defaultValue?: string;
      setValue: (val: string) => void;
      options: {
        label: string;
        value: string;
        id: string;
      }[];
    }
  | {
      variant: "password";
      defaultValue?: string;
      setValue: (val: string) => void;
    }
);

export type DateInUseType = {
  date: string;
  serviceId: string;
};

export type UpdatingAddonsFunctionType = ({
  serviceId,
  relatedDate,
  newChosenAddonsCartWrapper
}: {
  serviceId: string;
  relatedDate: string;
  newChosenAddonsCartWrapper: CartDetailsType;
}) => void;

export type PaymentPercentageType = {
  percentage: number;
  type: "full" | "partial";
};

export type CheckoutFormDataType = {
  name: string;
  email: string;
  address: string;
  landmark?: string;
  pincode: string;
  city: string;
  occasion: OccasionDocument;
  venue: VenueDocument;
  mobile: string;
  alternateMobile?: string;
};

export type TransactionCheckoutType = {
  contextInitialData: Partial<CheckoutInfoDocument> | null;
  handleNavigation: NavigationType;
  cartDetails: CartDetailsType[];
  currentCity: string | null;
  platformFee: number;
  venues: VenueDocument[];
  occasions: OccasionDocument[];
  overallPriceDetails:
    | PriceDetailsType
    | undefined;
  couponApplicable: boolean;
  advancePayPercent: number;
  paymentPercentage: PaymentPercentageType;
  formData: CheckoutFormDataType;
  customerInfo: Partial<CustomerDocument> | null;
  setFormData: React.Dispatch<
    SetStateAction<CheckoutFormDataType>
  >;
  setCouponApplicable: React.Dispatch<
    SetStateAction<boolean>
  >;
  setPaymentPercentage: React.Dispatch<
    SetStateAction<PaymentPercentageType>
  >;
};

export type FormValidtyType = {
  overallInvalid: boolean;
  distinct: {
    validAddress: boolean;
    validCity: boolean;
    validEmail: boolean;
    validMobile: boolean;
    validName: boolean;
    validOccasion: boolean;
    validPincode: boolean;
    validVenue: boolean;
  };
};
