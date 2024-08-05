import AdvancePaymentEditor from "@/components/cms/advance-payment/AdvancePaymentEditor";

export default function EditOrderProcessingTimePage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <AdvancePaymentEditor advancePaymentId={id} />
  );
}
