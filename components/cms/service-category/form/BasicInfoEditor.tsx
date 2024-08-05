// components
import FormControl from "@/components/common/form/FormControl";
import BasicInfoForm, {
  getBasicInfoFormConfig
} from "./BasicInfoForm";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "./basicInfoEditor.module.css";

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
  defaultValue: ServiceCategoryDocument;
  setId: (id: string) => void;
  setDefaultValue: (
    defaultValue: ServiceCategoryDocument
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
