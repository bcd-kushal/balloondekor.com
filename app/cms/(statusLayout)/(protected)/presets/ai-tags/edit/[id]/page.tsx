import AITagEditor from "@/components/cms/ai-tag/AITagEditor";

export default function EditSearchKeywordPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <AITagEditor aiTagId={id} />;
}
