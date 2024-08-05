import DeliveryDetailEditor from "@/components/cms/delivery-detail/DeliveryDetailEditor";
export default function EditDeliveryDetailEditorPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <DeliveryDetailEditor deliveryDetailId={id} />
  );
}
