import GSTEditor from "@/components/cms/gst/GSTEditor";

export default function EditOrderProcessingTimePage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <GSTEditor id={id} />;
}
