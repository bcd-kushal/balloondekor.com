// components
import FormControl from "@/components/common/form/FormControl";
import BasicInfoForm, {
  getBasicInfoFormConfig
} from "./BasicInfoForm";

// types
import { SubPageDocument } from "@/schemas/cms/subPage";

export default function BasicInfoEditor({
  title,
  id,
  initialCategory,
  initialPage,
  defaultValue,
  setId,
  setDefaultValue,
  setShowForm
}: {
  title: string;
  id?: string;
  initialCategory?: string;
  initialPage?: string;
  defaultValue: SubPageDocument;
  setId: (id: string) => void;
  setDefaultValue: (
    defaultValue: SubPageDocument
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
        initialCategory={initialCategory}
        initialPage={initialPage}
        setId={setId}
        setDefaultValue={setDefaultValue}
        setShowForm={setShowForm}
      />
    </FormControl>
  );
}
