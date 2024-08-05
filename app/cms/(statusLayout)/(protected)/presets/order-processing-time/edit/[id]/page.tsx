import OrderProcessingTimeEditor from "@/components/cms/order-processing-time/OrderProcessingTimeEditor";

export default function EditOrderProcessingTimeRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <OrderProcessingTimeEditor
      orderProcessingTimeId={id}
    />
  );
}
