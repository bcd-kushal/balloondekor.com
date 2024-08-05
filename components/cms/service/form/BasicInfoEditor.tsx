// components
import BasicInfoForm, {
  getBasicInfoFormConfig
} from "@/components/cms/service/form/BasicInfoForm";
import FormControl from "@/components/common/form/FormControl";

// types
import { OptionType } from "@/types/cms/form";
import { ServiceDocument } from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/basicInfoEditor.module.css";

export default function BasicInfoEditor({
  title,
  serviceId,
  options,
  defaultValue,
  setServiceId,
  setDefaultValue,
  setShowFormNo
}: {
  title: string;
  serviceId?: string;
  options: { [key: string]: OptionType[] };
  defaultValue: ServiceDocument;
  setServiceId: (serviceId: string) => void;
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
  return (
    <FormControl
      config={getBasicInfoFormConfig(
        defaultValue
      )}
    >
      <BasicInfoForm
        serviceId={serviceId}
        options={options}
        setServiceId={setServiceId}
        setDefaultValue={setDefaultValue}
        setShowFormNo={setShowFormNo}
      />
    </FormControl>
  );
}
