import ColorEditor from "@/components/cms/color/ColorEditor";

export default function EditColorRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <ColorEditor colorId={id} />;
}
