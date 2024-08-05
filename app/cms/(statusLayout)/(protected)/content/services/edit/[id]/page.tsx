import ServiceForm from "@/components/cms/service/ServiceForm";

export default function EditServiceRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <ServiceForm id={id} />;
}
