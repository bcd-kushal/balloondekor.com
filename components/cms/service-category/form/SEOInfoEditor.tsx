// components
import FormControl from "@/components/common/form/FormControl";
import SEOInfoForm, {
  getSEOInfoFormConfig
} from "./SEOInfoForm";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "./basicInfoEditor.module.css";

export default function SEOInfoEditor({
  title,
  id,
  defaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: ServiceCategoryDocument;
  setShowForm: (showForm: number) => void;
}) {
  return (
    <FormControl
      config={getSEOInfoFormConfig(defaultValue)}
    >
      <SEOInfoForm
        id={id}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
