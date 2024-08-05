// components
import FormControl from "@/components/common/form/FormControl";
import ServiceForm, {
  getServicesFormConfig
} from "./ServicesForm";

// types
import { PageDocument } from "@/schemas/cms/page";

export default function ServicesEditor({
  title,
  id,
  defaultValue,
  setShowForm
}: {
  title: string;
  id: string;
  defaultValue: PageDocument;
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
