import CouponManagement from "@/components/cms/coupons/management/CouponMangement";
import { DOMAIN } from "@/constants/cms/apiRoute";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { ResponseDataType } from "@/types/cms/api";

export async function getServiceCategories() {
  const response = await fetch(
    `${DOMAIN}/api/cms/service-category`
  );
  const resData: ResponseDataType =
    await response.json();

  if (resData.data)
    return resData.data as ServiceCategoryDocument[];

  return [];
}

export default async function EditCouponRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  const categories = await getServiceCategories();
  return (
    <CouponManagement
      couponId={id}
      categories={categories}
    />
  );
}
