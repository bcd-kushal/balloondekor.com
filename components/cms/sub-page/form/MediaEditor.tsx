// components
import FormControl from "@/components/common/form/FormControl";
import MediaForm, {
  getMediaFormConfig
} from "./MediaForm";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";

// styles
import styles from "./mediaEditor.module.css";

export default function MediaEditor({
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
      config={getMediaFormConfig(defaultValue)}
    >
      <MediaForm
        id={id}
        setDefaultValue={setDefaultValue}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
