import FAQSEditor from "@/components/cms/faq/FAQEditor";

export default function EditFAQPage({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return <FAQSEditor faqId={id} />;
}
