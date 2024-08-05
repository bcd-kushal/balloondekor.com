import FooterLinkSectionEditor from "@/components/cms/footer/FooterLinkEditor";

export default function EditHeaderNavLinkRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <FooterLinkSectionEditor
      footerLinkSectionId={id}
    />
  );
}
