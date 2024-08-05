import AddonEditor from "@/components/cms/addon/AddonEditor";

export default function AddonEditorPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <AddonEditor addonId={id} />;
}
