import DynamicPageEditor from "@/components/cms/dynamicPage/DynamicPageEditor";

export default function EditDynamicPageRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <DynamicPageEditor dynamicPageId={id} />;
}
