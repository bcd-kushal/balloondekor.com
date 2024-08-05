import VenueEditor from "@/components/cms/venue/VenueEditor";

export default function EditStateEditorPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return <VenueEditor id={id} />;
}
