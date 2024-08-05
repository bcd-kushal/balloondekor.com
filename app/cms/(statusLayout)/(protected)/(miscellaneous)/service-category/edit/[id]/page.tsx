import AdvancePaymentEditor from "@/components/cms/advance-payment/AdvancePaymentEditor";
import ServiceCategoryForm from "@/components/cms/service-category/ServiceCategoryForm";

export default function EditOrderProcessingTimePage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <ServiceCategoryForm id={id} />;
}
