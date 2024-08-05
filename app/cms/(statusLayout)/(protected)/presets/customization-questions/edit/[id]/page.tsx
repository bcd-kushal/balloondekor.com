import CustomizationQuestionEditor from "@/components/cms/customization-question/CustomizationQuestionEditor";

export default function EditCustomizationQuestionRoute({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  return (
    <CustomizationQuestionEditor
      customizationQuestionId={id}
    />
  );
}
