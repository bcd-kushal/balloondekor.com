"use client";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";
import { getCoupon } from "@/fetchAPIs/cms/coupon";
import { useStatusContext } from "@/hooks/useStatusContext";
import { CouponDocument } from "@/schemas/cms/coupon";
import { ResponseDataType } from "@/types/cms/api";
import { useEffect, useState } from "react";
import CouponForm from "./CouponForm";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function CouponManagement({
  couponId,
  categories
}: {
  couponId?: string;
  categories: ServiceCategoryDocument[];
}) {
  const { addStatus } = useStatusContext();

  const [coupon, setCoupon] =
    useState<CouponDocument>(
      {} as CouponDocument
    );

  const handleGetCoupon = (id: string) => {
    getCoupon(id).then(
      (resData: ResponseDataType) => {
        if (resData.data) {
          setCoupon(
            (prev) =>
              resData.data as CouponDocument
          );
        }
      }
    );
  };

  useEffect(() => {
    if (couponId) handleGetCoupon(couponId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (couponId) {
    if (!coupon._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <CMSPageLayout
      title={
        couponId ? "Edit Coupon" : "Add Coupon"
      }
      noAddBtn
    >
      <CouponForm
        coupon={coupon}
        setCoupon={setCoupon}
        categories={categories}
        couponId={couponId}
      />
    </CMSPageLayout>
  );
}
