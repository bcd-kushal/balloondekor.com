// components
import FormControl from "@/components/common/form/FormControl";
import DeliveryInfoForm, {
  getDeliveryInfoFormConfig
} from "@/components/cms/service/form/DeliveryInfoForm";

// types
import { OptionType } from "@/types/cms/form";
import { ServiceDocument } from "@/schemas/cms/service";

export default function DeliveryInfoEditor({
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
      config={getDeliveryInfoFormConfig(
        defaultValue
      )}
    >
      <DeliveryInfoForm
        serviceId={serviceId}
        options={options}
        setDefaultValue={setDefaultValue}
        setShowFormNo={setShowFormNo}
      />
    </FormControl>
  );
}
