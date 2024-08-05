// hooks
import {
  ConfigType,
  useFormContext
} from "../../../hooks/useFormContext";

// components
import Input from "@/components/common/form/Input";
import Button from "@/components/common/Button";

// types
import { SortType } from "@/types/cms/sidebar";
import { DialogClose } from "@/components/ui/dialog";

// form control configuration
export function getSortFormConfig({
  sortBy,
  orderBy
}: {
  sortBy: string;
  orderBy: string;
}): ConfigType {
  return {
    sortBy: {
      isRequired: false,
      type: "dropdown",
      defaultValue: sortBy || ""
    },
    orderBy: {
      isRequired: false,
      type: "dropdown",
      defaultValue: orderBy || ""
    }
  };
}

export default function SortForm({
  sort: { sortBy, orderBy }
}: {
  sort: SortType;
}) {
  // hooks
  const {
    hasSubmitted,
    defaultValue,
    setValue,
    onSubmit
  } = useFormContext();

  // handlers
  const handleSubmit = (data: any) => {
    sortBy.set(data.sortBy);
    orderBy.set(data.orderBy);
  };

  return (
    <form
      className={`w-full flex flex-col items-stretch justify-start gap-3`}
      autoComplete="off"
      onSubmit={(
        e: React.FormEvent<HTMLFormElement>
      ) => onSubmit(e, handleSubmit)}
    >
      <Input
        title="Sort By"
        name="sortBy"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="dropdown"
        options={sortBy.options}
        defaultValue={
          defaultValue["sortBy"] as string
        }
        setValue={setValue["sortBy"]}
      />
      <Input
        title="Order By"
        name="orderBy"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="dropdown"
        options={orderBy.options}
        defaultValue={
          defaultValue["orderBy"] as string
        }
        setValue={setValue["orderBy"]}
      />
      <DialogClose>
        <Button
          type="primary"
          label="sort"
          variant="submit"
        />
      </DialogClose>
    </form>
  );
}
