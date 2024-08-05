// components
import FormControl from "@/components/common/form/FormControl";
import BasicInfoForm, {
  getBasicInfoFormConfig
} from "./BasicInfoForm";

// types
import { PageDocument } from "@/schemas/cms/page";

export default function BasicInfoEditor({
  title,
  id,
  defaultValue,
  setId,
  setDefaultValue,
  setShowForm
}: {
  title: string;
  id?: string;
  defaultValue: PageDocument;
  setId: (id: string) => void;
  setDefaultValue: (
    defaultValue: PageDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  return (
    <FormControl
      config={getBasicInfoFormConfig(
        defaultValue
      )}
    >
      <BasicInfoForm
        id={id}
        setId={setId}
        setDefaultValue={setDefaultValue}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
