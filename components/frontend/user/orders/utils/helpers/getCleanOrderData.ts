import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { DEFAULT_ORDER_STATE_DATA } from "../constants";
import {
  CleanOrderDataType,
  OrderInQuestionType
} from "../types";
import { CityDocument } from "@/schemas/cms/city";
import moment from "moment";
import { calculateOverallPrice } from "@/components/cms/orders/utils/helpers/calculateOverallPrice";
import { CouponDocument } from "@/schemas/cms/coupon";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { ServiceDocument } from "@/schemas/cms/service";
import { ImageDocument } from "@/schemas/cms/image";
import { AddonDocument } from "@/schemas/cms/addon";

export const getCleanOrderData = ({
  _id,
  orderId,
  createdAt,
  detail,
  payment
}: CleanOrderDataType): OrderInQuestionType => {
  const paymentSummary = calculateOverallPrice(
    detail.lineItems,
    payment.percentage,
    detail.appliedCoupon
      ? (detail.appliedCoupon as CouponDocument)
      : undefined
  );

  return {
    ...DEFAULT_ORDER_STATE_DATA,
    // Delivery Address -----------------------------------------
    deliveryAddress: (
      detail.checkoutInfo as CheckoutInfoDocument
    ).address,

    // Order Heading -----------------------------------------
    orderHeadingData: {
      bookedOn: moment(createdAt).format(
        "Do MMM, YYYY"
      ),
      city: (
        (
          detail.checkoutInfo as CheckoutInfoDocument
        ).city as CityDocument
      ).name,
      orderId: orderId
    },

    // Payment Summary -----------------------------------------
    pricingSummary: {
      total:
        paymentSummary.finalAmount.toPay +
        paymentSummary.finalAmount.raw,
      due: paymentSummary.finalAmount.raw,
      paid: paymentSummary.finalAmount.toPay,
      coupon: paymentSummary.coupon.isApplicable
        ? {
            appliedDiscount:
              paymentSummary.coupon.discount,
            code: paymentSummary.coupon.code
          }
        : undefined
    },

    // Services and Addons ------------------------------------------
    orderServiceList: detail.lineItems.map(
      ({
        addons,
        decorationTime,
        eventDate,
        pricePerUnit,
        quantity,
        service,
        status,
        _id
      }) => {
        return {
          quantity,
          pricePerUnit: pricePerUnit || 0,
          date: moment(eventDate).format(
            "Do MMM, YYYY"
          ),
          time:
            (
              decorationTime.type as DeliveryTypeDocument
            ).timeSlots.find(
              ({ _id }) =>
                _id === decorationTime.timeSlot
            )?.label || "",
          img: {
            alt: (
              (service as ServiceDocument).media
                .primary as ImageDocument
            ).alt,
            src: (
              (service as ServiceDocument).media
                .primary as ImageDocument
            ).url
          },
          name: (service as ServiceDocument).name,
          status: getStatus(status),
          addons: addons.map(
            ({
              addon,
              pricePerUnit,
              quantity
            }) => ({
              img: {
                alt: (
                  (addon as AddonDocument)
                    .image as ImageDocument
                ).alt,
                src: (
                  (addon as AddonDocument)
                    .image as ImageDocument
                ).url
              },
              name: (addon as AddonDocument).name,
              pricePerUnit: pricePerUnit || 0,
              quantity
            })
          )
        };
      }
    )
  };
};

const getStatus = (
  status:
    | "ordered"
    | "preparing"
    | "on-the-way"
    | "completed"
    | "cancelled"
):
  | "ordered"
  | "cancelled"
  | "in-progress"
  | "delivered" => {
  if (status === "cancelled") return "cancelled";
  if (
    status === "preparing" ||
    status === "on-the-way"
  )
    return "in-progress";
  if (status === "completed") return "delivered";
  return "ordered";
};
