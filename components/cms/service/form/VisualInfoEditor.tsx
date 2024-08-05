// components
import FormControl from "@/components/common/form/FormControl";
import VisualInfoForm, {
  getVisualInfoFormConfig
} from "@/components/cms/service/form/VisualInfoForm";

// types
import { OptionType } from "@/types/cms/form";
import { ServiceDocument } from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/visualInfoEditor.module.css";

export default function VisualInfoEditor({
  title,
  serviceId,
  options,
  defaultValue,
  setDefaultValue,
  setShowFormNo
}: {
  title: string;
  serviceId: string;
  options: { [key: string]: OptionType[] };
  defaultValue: ServiceDocument;
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
  return (
    <FormControl
      config={getVisualInfoFormConfig(
        defaultValue
      )}
    >
      <VisualInfoForm
        serviceId={serviceId}
        options={options}
        setDefaultValue={setDefaultValue}
        setShowFormNo={setShowFormNo}
      />
    </FormControl>
  );
}
