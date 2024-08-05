import ColorEditor from "@/components/cms/color/ColorEditor";
import CMSPageLayout from "@/components/common/layout/admin/PageLayout";

export default function EditColorRoute() {
  return (
    <CMSPageLayout
      title="New Coupon"
      noAddBtn
    >
      <ColorEditor />
    </CMSPageLayout>
  );
}
