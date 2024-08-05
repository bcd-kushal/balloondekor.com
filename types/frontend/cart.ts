import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { CouponDocument } from "@/schemas/cms/coupon";
import { LineItemDocument } from "@/schemas/cms/lineItem";

export type ContextCartType = {
  items: Partial<LineItemDocument>[];
  checkoutInfo?:
    | Partial<CheckoutInfoDocument>
    | undefined;
  appliedCoupon?: CouponDocument | undefined;
};
