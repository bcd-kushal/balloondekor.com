import CareInfoEditor from "@/components/cms/care-info/CareInfoEditor";

export default function EditCareInfoEditorPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <CareInfoEditor careInfoId={id} />;
}
