import { AddonDocument } from "@/schemas/cms/addon";
import {
  CouponDiscountDocument,
  CouponDocument
} from "@/schemas/cms/coupon";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import {
  LineItemDecorationTimeDocument,
  LineItemDocument
} from "@/schemas/cms/lineItem";
import { ServiceDocument } from "@/schemas/cms/service";

export const calculateOverallPrice = (
  lineItems: LineItemDocument[],
  percentagePaid: number,
  coupon: CouponDocument | undefined
): OrderPriceType => {
  let totalBasePrice: number = 0;
  let totalAddonPrice: number = 0;
  let basePriceAfterPercentage: number = 0;
  let platformFees: number = 0;
  let couponDetails: OrderPriceType["coupon"];
  let finalAmount: OrderPriceType["finalAmount"];

  totalBasePrice = lineItems.reduce(
    (totalBase, item) =>
      (totalBase +=
        item.quantity *
        (item.pricePerUnit ||
          (item.service as ServiceDocument).price
            .base.price)),
    0
  );

  totalAddonPrice = lineItems.reduce(
    (totalAddons, item) =>
      (totalAddons += item.addons.reduce(
        (localSum, addon) =>
          (localSum +=
            addon.quantity *
            (addon.addon as AddonDocument).price),
        0
      )),
    0
  );

  basePriceAfterPercentage =
    percentagePaid === 100
      ? totalBasePrice
      : Math.ceil(
          totalBasePrice * (percentagePaid / 100)
        );

  platformFees = lineItems
    .map(
      ({ decorationTime }) =>
        (
          (
            decorationTime as LineItemDecorationTimeDocument
          ).type as DeliveryTypeDocument
        ).price
    )
    .reduce(
      (maxFee, fee) =>
        (maxFee = Math.max(maxFee, fee)),
      0
    );

  couponDetails =
    // NO COUPON ================================
    !coupon
      ? {
          code: "",
          isApplicable:
            percentagePaid === 100
              ? false
              : false,
          discount: 0
        }
      : // FREE DELIVERY ==============================
        coupon.type === "free-delivery"
        ? {
            code: coupon.code,
            discount: platformFees,
            isApplicable:
              percentagePaid === 100
                ? true
                : false
          }
        : // PERCENTAGE TYPE DISCOUNT =====================
          (
              coupon.discount as CouponDiscountDocument
            ).type === "percentage"
          ? {
              code: coupon.code,
              discount: Math.min(
                totalBasePrice + totalAddonPrice,
                (
                  coupon.discount as CouponDiscountDocument
                ).amount,
                Math.ceil(
                  (((
                    coupon.discount as CouponDiscountDocument
                  ).percentage || 100) *
                    totalBasePrice) /
                    100
                )
              ),
              isApplicable:
                percentagePaid === 100
                  ? true
                  : false
            }
          : // FLAT DISCOUNT ============================
            {
              code: coupon.code,
              discount: Math.min(
                (
                  coupon.discount as CouponDiscountDocument
                ).amount,
                totalBasePrice + totalAddonPrice
              ),
              isApplicable:
                percentagePaid === 100
                  ? true
                  : false
            };

  finalAmount = {
    toPay:
      basePriceAfterPercentage +
      totalAddonPrice +
      platformFees -
      (percentagePaid === 100
        ? couponDetails.isApplicable
          ? couponDetails.discount
          : 0
        : 0),
    raw: totalBasePrice - basePriceAfterPercentage
  };

  const reutrnData: OrderPriceType = {
    base: totalBasePrice,
    addon: totalAddonPrice,
    baseAndAddon:
      totalBasePrice + totalAddonPrice,
    coupon: couponDetails,
    finalAmount,
    platformFees
  };
  return reutrnData;
};

// =====================================================
// =====================================================

export type OrderPriceType = {
  base: number;
  addon: number;
  baseAndAddon: number;
  coupon: {
    isApplicable: boolean;
    code: string;
    discount: number;
  };
  platformFees: number;
  finalAmount: { raw: number; toPay: number };
};
