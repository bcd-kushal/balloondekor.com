import CityEditor from "@/components/cms/city/CityEditor";
export default function EditCityRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <CityEditor cityId={id} />;
}
