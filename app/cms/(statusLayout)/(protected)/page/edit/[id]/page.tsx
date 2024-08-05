import PageForm from "@/components/cms/page/PageForm";

export default function EditPageRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <PageForm id={id} />;
}
