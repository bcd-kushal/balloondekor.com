import SubPageForm from "@/components/cms/sub-page/SubPageForm";

export default function EditSubPageRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <SubPageForm id={id} />;
}
