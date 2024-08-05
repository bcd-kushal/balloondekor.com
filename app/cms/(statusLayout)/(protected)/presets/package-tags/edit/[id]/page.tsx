import PackageTagEditor from "@/components/cms/package-tag/PackageTagEditor";
export default function EditPackageTagEditorPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <PackageTagEditor packageTagId={id} />;
}
