// components
import FormControl from "@/components/common/form/FormControl";
import MediaForm, {
  getMediaFormConfig
} from "./MediaForm";

// types
import { PageDocument } from "@/schemas/cms/page";

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
  defaultValue: PageDocument;
  setDefaultValue: (
    defaultValue: PageDocument
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
