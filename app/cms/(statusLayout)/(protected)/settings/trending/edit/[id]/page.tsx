import TrendingEditor from "@/components/cms/trending/TrendingEditor";

export default function EditTrendingRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <TrendingEditor trendingId={id} />;
}
