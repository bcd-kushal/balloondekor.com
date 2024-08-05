import DeliverySlotEditor from "@/components/cms/delivery-type/DeliveryTypeEditor";

export default function EditDeliveryTypeRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <DeliverySlotEditor deliveryTypeId={id} />
  );
}
