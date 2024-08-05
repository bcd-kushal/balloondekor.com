import UnitEditor from "@/components/cms/unit/UnitEditor";

export default function EditVariantEditorPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <UnitEditor unitId={id} />;
}
