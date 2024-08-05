import HomepageLayoutForm from "@/components/cms/homepage/HomepageLayoutForm";

export default function EditHomepageLayoutRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <HomepageLayoutForm id={id} />;
}
