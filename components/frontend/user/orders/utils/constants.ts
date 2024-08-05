import { OrderInQuestionType } from "./types";

export const DEFAULT_ORDER_STATE_DATA: OrderInQuestionType =
  {
    deliveryAddress: "",
    orderHeadingData: {
      orderId: "",
      bookedOn: "",
      city: ""
    },
    pricingSummary: {
      due: 0,
      paid: 0,
      total: 0
    },
    orderServiceList: [],
    paymentStatus: "completed"
  };
