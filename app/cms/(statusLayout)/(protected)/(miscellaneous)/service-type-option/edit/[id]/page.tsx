import ServiceTypeOptionEditor from "@/components/cms/service-type-option/ServiceTypeOptionEditor";
export default function EditServiceTypeOptionPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <ServiceTypeOptionEditor
      serviceTypeOptionId={id}
    />
  );
}
