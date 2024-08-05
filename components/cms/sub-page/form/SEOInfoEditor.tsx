// components
import FormControl from "@/components/common/form/FormControl";
import SEOInfoForm, {
  getSEOInfoFormConfig
} from "./SEOInfoForm";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";

export default function SEOInfoEditor({
  title,
  id,
  defaultValue,
  setDefaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: SubPageDocument;
  setDefaultValue: (
    defaultValue: SubPageDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  return (
    <FormControl
      config={getSEOInfoFormConfig(defaultValue)}
    >
      <SEOInfoForm
        id={id}
        setDefaultValue={setDefaultValue}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
