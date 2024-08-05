// components
import FormControl from "@/components/common/form/FormControl";
import VisualInfoForm, {
  getVisualInfoFormConfig
} from "@/components/cms/sub-page/form/VisualInfoForm";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";

// styles
import styles from "./visualInfoEditor.module.css";

export default function VisualInfoEditor({
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
