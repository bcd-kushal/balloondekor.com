import CouponManagement from "@/components/cms/coupons/management/CouponMangement";
import { getServiceCategories } from "../edit/[id]/page";

export default async function AddCouponRoute() {
  const categories = await getServiceCategories();
  return (
    <CouponManagement categories={categories} />
  );
}
