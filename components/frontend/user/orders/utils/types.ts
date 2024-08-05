import { OrderPaymentDocument } from "@/schemas/cms/order";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";

type AtomicDataType = {
  img: { src: string; alt: string };
  name: string;
  quantity: number;
  pricePerUnit: number;
};

export type AddonDataInOrderDetailsType =
  AtomicDataType[];

export type OrderDetailsServiceListType = Array<
  AtomicDataType & {
    date: string;
    time: string;
    status:
      | "in-progress"
      | "cancelled"
      | "ordered"
      | "delivered";
    addons: AddonDataInOrderDetailsType;
  }
>;

export type OrderInQuestionType = {
  deliveryAddress: string;
  orderHeadingData: {
    orderId: string;
    city: string;
    bookedOn: string;
  };
  pricingSummary: {
    total: number;
    paid: number;
    due: number;
    coupon?: {
      code: string;
      appliedDiscount: number;
    };
  };
  orderServiceList: OrderDetailsServiceListType;
  paymentStatus: "pending" | "completed";
};

export type CleanOrderDataType = {
  _id: string;
  orderId: string;
  createdAt: Date;
  detail: OrderDetailDocument;
  payment: OrderPaymentDocument;
};
