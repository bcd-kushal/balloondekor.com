// components
import FormControl from "@/components/common/form/FormControl";
import VisualInfoForm, {
  getVisualInfoFormConfig
} from "@/components/cms/page/form/VisualInfoForm";

// types
import { PageDocument } from "@/schemas/cms/page";

export default function VisualInfoEditor({
  title,
  id,
  defaultValue,
  setDefaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: PageDocument;
  setDefaultValue: (
    defaultValue: PageDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  return (
    <FormControl
      config={getVisualInfoFormConfig(
        defaultValue
      )}
    >
      <VisualInfoForm
        id={id}
        setDefaultValue={setDefaultValue}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
