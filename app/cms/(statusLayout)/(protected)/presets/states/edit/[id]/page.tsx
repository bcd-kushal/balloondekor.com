import StateEditor from "@/components/cms/state/StateEditor";

export default function EditStateEditorPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <StateEditor stateId={id} />;
}
