// hooks
import {
  ConfigType,
  useFormContext
} from "../../../hooks/useFormContext";

// components
import Input from "@/components/common/form/Input";
import Button from "@/components/common/Button";

// types
import { FilterType } from "@/types/cms/sidebar";

// styles
import styles from "./sortForm.module.css";

// form control configuration
export function getFilterFormConfig({
  filterBy,
  keyword,
  fromDate,
  toDate
}: {
  filterBy: string;
  keyword: string;
  fromDate: string;
  toDate: string;
}): ConfigType {
  return {
    filterBy: {
      isRequired: false,
      type: "dropdown",
      defaultValue: filterBy || ""
    },
    keyword: {
      isRequired: false,
      type: "text",
      defaultValue: keyword || ""
    },
    fromDate: {
      isRequired: false,
      type: "date",
      defaultValue: fromDate || ""
    },
    toDate: {
      isRequired: false,
      type: "date",
      defaultValue: toDate || ""
    }
  };
}
// EXPORT
export default function FilterForm({
  filter: { filterBy, keyword, fromDate, toDate }
}: {
  filter: FilterType;
}) {
  // hooks
  const {
    hasSubmitted,
    defaultValue,
    resetValue,
    value,
    onReset,
    setValue,
    onSubmit
  } = useFormContext();

  // handlers
  const handleSubmit = (data: any) => {
    filterBy.set(data.filterBy);
    keyword.set(data.keyword);
    fromDate.set(data.fromDate);
    toDate.set(data.toDate);
  };

  const handleReset = () => {
    onReset();
    handleSubmit({
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    });
  };
  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={(
        e: React.FormEvent<HTMLFormElement>
      ) => onSubmit(e, handleSubmit)}
    >
      <Input
        title="Filter By"
        name="filterBy"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="dropdown"
        options={filterBy.options}
        defaultValue={
          defaultValue["filterBy"] as string
        }
        resetValue={resetValue["filterBy"]}
        setValue={setValue["filterBy"]}
      />
      <Input
        title="search"
        name="keyword"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="text"
        defaultValue={
          defaultValue["keyword"] as string
        }
        disabled={
          value["filterBy"] ? false : true
        }
        resetValue={resetValue["keyword"]}
        setValue={setValue["keyword"]}
      />
      <Input
        title="from"
        name="fromDate"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="date"
        defaultValue={
          defaultValue["fromDate"] as string
        }
        resetValue={resetValue["fromDate"]}
        setValue={setValue["fromDate"]}
      />
      <Input
        title="to"
        name="toDate"
        isRequired={false}
        hasSubmitted={hasSubmitted}
        showError={false}
        errorMessage=""
        variant="date"
        defaultValue={
          defaultValue["toDate"] as string
        }
        resetValue={resetValue["toDate"]}
        setValue={setValue["toDate"]}
      />
      <Button
        type="primary"
        label="filter"
        variant="submit"
      />
      <Button
        type="primary"
        label="reset"
        variant="normal"
        onClick={handleReset}
      />
    </form>
  );
}
