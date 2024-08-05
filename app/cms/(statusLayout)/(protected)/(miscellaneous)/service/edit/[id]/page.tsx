import ServiceForm from "@/components/cms/service/ServiceForm";

export default function EditServiceRoute({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <ServiceForm id={id} />;
}
