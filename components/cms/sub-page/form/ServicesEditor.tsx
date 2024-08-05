// components
import FormControl from "@/components/common/form/FormControl";
import ServiceForm, {
  getServicesFormConfig
} from "./ServicesForm";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";

// styles
import styles from "./servicesEditor.module.css";

export default function ServicesEditor({
  title,
  id,
  defaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: SubPageDocument;
  setShowForm: (showForm: number) => void;
}) {
  return (
    <FormControl
      config={getServicesFormConfig(defaultValue)}
    >
      <ServiceForm
        id={id}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
