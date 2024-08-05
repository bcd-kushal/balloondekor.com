// components
import FormControl from "@/components/common/form/FormControl";
import VisualInfoForm, {
  getVisualInfoFormConfig
} from "@/components/cms/service-category/form/VisualInfoForm";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "./basicInfoEditor.module.css";

export default function VisualInfoEditor({
  title,
  id,
  defaultValue,
  setDefaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: ServiceCategoryDocument;
  setDefaultValue: (
    defaultValue: ServiceCategoryDocument
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
