import {
  CouponDiscountDocument,
  CouponDocument,
  CouponValidityDocument
} from "@/schemas/cms/coupon";
import { CouponFormDataType } from "../management/CouponForm";

export const getCleanCouponData = (
  data: CouponFormDataType
): CouponDocument => {
  const { maxAvailability, minAmount, type } =
    data;

  if (minAmount < 0) data.minAmount = 0;
  if (maxAvailability < 1)
    data.maxAvailability = 1;

  if (type === "discount") {
    const { variant } = data;
    if (variant === "flat") {
      const { flatAmount } = data;
      if (flatAmount < 0) data.flatAmount = 0;
    } else {
      const { maxDiscount, percentage } = data;
      if (maxDiscount < 0) data.maxDiscount = 0;
      if (percentage < 0) data.percentage = 0;
      if (percentage > 100) data.percentage = 100;
    }
  }

  const currentDate = new Date();
  const futureDate = new Date("2590-07-09");

  const cleanData: CouponDocument = {
    type: data.type,
    code: data.code,
    description:
      data.type === "discount"
        ? data.description
        : "",
    minimumOrderAmount: data.minAmount,
    limitPerCustomer: data.maxAvailability,
    valid: {
      from: currentDate,
      till: futureDate
    } as CouponValidityDocument,

    applicableCategories:
      data.applicableCategories
  } as CouponDocument;

  if (data.type === "free-delivery")
    return cleanData;

  const updated: CouponDocument = {
    ...cleanData,
    discount: {
      amount:
        data.variant === "flat"
          ? data.flatAmount
          : data.maxDiscount,
      type:
        data.variant === "flat"
          ? "fixed"
          : "percentage"
    } as CouponDiscountDocument
  } as CouponDocument;

  if (data.variant === "flat") return updated;

  return {
    ...updated,
    discount: {
      amount: data.maxDiscount,
      type: "percentage",
      percentage: data.percentage
    } as CouponDiscountDocument
  } as CouponDocument;
};
