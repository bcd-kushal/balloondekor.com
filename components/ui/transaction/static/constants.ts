import { QueryParamsType } from "@/types/cms/api";
import { transactionCompletionStatus } from "./switches";
import {
  CartDetailsType,
  CartProgressType,
  CheckoutFormDataType,
  PriceDetailsType
} from "./types";
import { EMPTY_SERVICE_ID } from "./utils/_fetchCartFromContext";
import { VenueDocument } from "@/schemas/services/venue";
import { OccasionDocument } from "@/schemas/cms/occasion";

export const MAX_TRANSACTION_DISTINCT_PAGES = 3;
export const PLATFORM_FEE_PLACEHOLDER = 80;
export const OVERALL_PRICE_PLACEHOLDER: PriceDetailsType =
  {
    basePrices: {
      baseTotal: {
        label: "string",
        amount: 0
      },
      addonTotal: {
        label: "string",
        amount: 0
      },
      totalAmount: {
        label: "string",
        amount: 0
      }
    },
    coupon: {
      label: "string",
      amount: 0,
      isApplicable: true
    },
    finalAmount: {
      label: "string",
      amount: 0,
      rawAmount: 0
    }
  };

export const transactionProgressData: (
  currIndex: number
) => CartProgressType = (currIndex: number) =>
  [
    {
      label: "Cart",
      side: "left",
      completed: transactionCompletionStatus(
        currIndex,
        0
      ),
      position: "first"
    },
    {
      label: "Checkout",
      side: "center",
      completed: transactionCompletionStatus(
        currIndex,
        1
      ),
      position: "inBetween"
    },
    {
      label: "Confirm",
      side: "right",
      completed: transactionCompletionStatus(
        currIndex,
        2
      ),
      position: "last"
    }
  ] as CartProgressType;

export const GET_COUPON_PLACEHOLDER_PARAMETER: QueryParamsType =
  {
    populate: true,
    active: true,
    deleted: false,
    offset: 0,
    limit: 10000,
    sortBy: "",
    orderBy: "",
    filterBy: "",
    keyword: "",
    fromDate: "",
    toDate: ""
  };

/********************************************************************
 **********[ HEADER ]**********************
 *********************************************************************/
export const COMPLETION_ACCENT_COLOR =
  "bg-green-600";
export const INCOMPLETE_ACCENT_COLOR =
  "bg-[#12121230]";

export const headerTitle: string[] = [
  "Cart",
  "Checkout",
  "Process Payment"
];

/********************************************************************
 **********[ COMMON ]**********************
 *********************************************************************/
export const BUY_BTN_LABEL: string[] = [
  "Proceed to checkout",
  "Proceed to pay",
  "Make payment"
];

/********************************************************************
 **********[ CART PAGE ]**********************
 *********************************************************************/
export const DEFAULT_INSTRUCTIONS_PLACEHOLDER =
  "Leave an Instruction";

export const BLANK_CART_DETAIL_OBJECT: CartDetailsType =
  {
    serviceId: EMPTY_SERVICE_ID,
    serviceName: "",
    serviceImage: {
      alt: "",
      url: ""
    },
    pricePerUnit: 0,
    totalUnits: 0,
    eventDate: new Date(),
    eventTime: ``,
    instruction: undefined,
    addons: []
  };

/********************************************************************
 **********[ CHECKOUT PAGE ]**********************
 *********************************************************************/
export const COUPON_NOT_APPLICABLE_LABEL =
  "Coupon not applicable";
export const COUPON_APPLICABLE_LABEL = "";
export const CHECKOUT_FORMDATA_STATE_PLACEHOLDER: CheckoutFormDataType =
  {
    address: "",
    city: "",
    email: "",
    venue: {
      venue: "",
      _id: ""
    } as VenueDocument,
    mobile: "",
    name: "",
    occasion: {
      name: "",
      _id: ""
    } as OccasionDocument,
    pincode: ""
  };
