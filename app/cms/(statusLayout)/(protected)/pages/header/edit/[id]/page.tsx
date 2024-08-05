import HeaderNavLinkEditor from "@/components/cms/header/HeaderLinkEditor";

export default function EditHeaderNavLinkRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <HeaderNavLinkEditor navLinkId={id} />;
}
