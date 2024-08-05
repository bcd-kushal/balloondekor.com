import OccasionEditor from "@/components/cms/occasion/OccasionEditor";

export default function EditOccasionRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <OccasionEditor occasionId={id} />;
}
