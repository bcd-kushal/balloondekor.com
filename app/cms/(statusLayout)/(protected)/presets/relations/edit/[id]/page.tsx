import RelationEditor from "@/components/cms/relation/RelationEditor";

export default function EditRelationEditorPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <RelationEditor relationId={id} />;
}
