import GeneralTagEditor from "@/components/cms/general-tag/GeneralTagEditor";

export default function EditGeneralTagEditorPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <GeneralTagEditor generalTagId={id} />;
}
