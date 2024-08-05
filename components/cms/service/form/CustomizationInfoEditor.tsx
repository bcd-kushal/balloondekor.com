// components
import FormControl from "@/components/common/form/FormControl";
import CustomizationInfoForm, {
  getCustomizationInfoFormConfig
} from "@/components/cms/service/form/CustomizationInfoForm";

// types
import { OptionType } from "@/types/cms/form";
import { ServiceDocument } from "@/schemas/cms/service";

export default function CustomizationInfoEditor({
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
      config={getCustomizationInfoFormConfig(
        defaultValue
      )}
    >
      <CustomizationInfoForm
        serviceId={serviceId}
        options={options}
        selfReference={defaultValue}
        setDefaultValue={setDefaultValue}
        setShowFormNo={setShowFormNo}
      />
    </FormControl>
  );
}
