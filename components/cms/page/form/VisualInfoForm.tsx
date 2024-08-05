/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import { getServiceCategories } from "@/fetchAPIs/cms/serviceCategory";
import { updatePage } from "@/fetchAPIs/cms/page";

// types
import { OptionType } from "@/types/cms/form";
import { PageDocument } from "@/schemas/cms/page";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "./visualInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getVisualInfoFormConfig({
  heading,
  openIn,
  relatedCategories,
  topContent,
  bottomContent
}: Partial<PageDocument>): ConfigType {
  return {
    heading: {
      isRequired: true,
      type: "text",
      defaultValue: heading || ""
    },
    openIn: {
      isRequired: true,
      type: "dropdown",
      defaultValue: openIn || ""
    },
    relatedCategories: {
      isRequired: false,
      type: "checkbox",
      defaultValue:
        (relatedCategories as string[]) || []
    },
    topContent: {
      isRequired: false,
      type: "text",
      defaultValue: topContent || ""
    },
    bottomContent: {
      isRequired: false,
      type: "text",
      defaultValue: bottomContent || ""
    }
  };
}

export default function VisualInfoForm({
  id,
  setDefaultValue,
  setShowForm
}: {
  id: string;
  setDefaultValue: (
    defaultValue: PageDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  const { addStatus } = useStatusContext();

  const {
    defaultValue,
    resetValue,
    value,
    setValue,
    hasSubmitted,
    error,
    onReset,
    onSubmit
  } = useFormContext();

  const [
    serviceCategoryOptions,
    setServiceCategoryOptions
  ] = useState<OptionType[]>([]);

  const handleGetServiceCategoryOptions = () => {
    getServiceCategories({
      active: true,
      offset: 0,
      limit: 0,
      sortBy: "",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setServiceCategoryOptions(
            (
              responseData.data as ServiceCategoryDocument[]
            )
              .filter(({ _id }) => _id !== id)
              .map(({ _id, name }) => ({
                label: name,
                value: _id
              }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleSubmit = (
    data: Partial<PageDocument>
  ): void => {
    updatePage(id, data)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as PageDocument
        );
        addStatus(responseData.status);
        setShowForm(3);
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetServiceCategoryOptions();
  }, []);

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="h1 heading"
          name="heading"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["heading"]}
          errorMessage={"heading is required"}
          variant="text"
          defaultValue={
            defaultValue["heading"] as string
          }
          resetValue={resetValue["heading"]}
          setValue={setValue["heading"]}
        />
        <Input
          title="open in"
          name="openIn"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["openIn"]}
          errorMessage={"openIn is required"}
          variant="dropdown"
          options={[
            {
              label: "same window",
              value: "_self"
            },
            {
              label: "new window",
              value: "_blank"
            }
          ]}
          defaultValue={
            defaultValue["openIn"] as string
          }
          resetValue={resetValue["openIn"]}
          setValue={setValue["openIn"]}
        />
      </section>
      <section className={styles.section2}>
        <Input
          title="related categories"
          name="relatedCategories"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["relatedCategories"]}
          errorMessage={
            "relatedCategories is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "relatedCategories"
            ] as string[]
          }
          options={serviceCategoryOptions}
          setValues={
            setValue["relatedCategories"]
          }
        />
      </section>
      <section className={styles.section4}>
        <Input
          title="top content"
          name="topContent"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["topContent"]}
          errorMessage={"Top Content is required"}
          variant="richText"
          defaultValue={
            defaultValue["topContent"] as string
          }
          resetValue={resetValue["topContent"]}
          setValue={setValue["topContent"]}
        />
        <Input
          title="bottom content"
          name="bottomContent"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["bottomContent"]}
          errorMessage={
            "Bottom Content is required"
          }
          variant="richText"
          defaultValue={
            defaultValue[
              "bottomContent"
            ] as string
          }
          resetValue={resetValue["bottomContent"]}
          setValue={setValue["bottomContent"]}
        />
      </section>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowForm(1);
            }}
          />
        </section>
      </div>
    </form>
  );
}
