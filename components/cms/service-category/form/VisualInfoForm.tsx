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
import {
  getServiceCategories,
  updateServiceCategory
} from "@/fetchAPIs/cms/serviceCategory";
import { getGSTs } from "@/fetchAPIs/cms/gst";
import { getAdvancePayments } from "@/fetchAPIs/cms/advancePayment";

// types
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { GSTDocument } from "@/schemas/cms/gst";
import { AdvancePaymentDocument } from "@/schemas/cms/advancePayment";
import { OptionType } from "@/types/cms/form";
import {
  ResponseDataType,
  PaginationResponseDataType
} from "@/types/cms/api";

// styles
import styles from "./visualInfoForm.module.css";
import { Schema } from "mongoose";

// FORM CONTROL CONFIGURATION
export function getVisualInfoFormConfig({
  heading,
  openIn,
  showRelatedCategories,
  relatedCategories,
  deliveryCharge,
  gst,
  advancePayment,
  topContent,
  bottomContent
}: Partial<ServiceCategoryDocument>): ConfigType {
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
    showRelatedCategories: {
      isRequired: false,
      type: "boolean",
      defaultValue: showRelatedCategories || false
    },
    relatedCategories: {
      isRequired: false,
      type: "checkbox",
      defaultValue:
        (
          relatedCategories as Schema.Types.ObjectId[]
        ).map((id) => id.toString()) || []
    },
    deliveryCharge: {
      isRequired: true,
      type: "number",
      defaultValue:
        deliveryCharge === 0 || deliveryCharge
          ? deliveryCharge
          : NaN
    },
    gst: {
      isRequired: false,
      type: "dropdown",
      defaultValue:
        (gst as GSTDocument)?._id || ""
    },
    advancePayment: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (advancePayment as AdvancePaymentDocument)
          ?._id || "6614cca36ca198ae805e5c59"
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
    defaultValue: ServiceCategoryDocument
  ) => void;
  setShowForm: (showForm: number) => void;
}) {
  const { addStatus: addStatus } =
    useStatusContext();

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
  const [gstOptions, setGstOptions] = useState<
    OptionType[]
  >([]);
  const [
    advancePaymentOptions,
    setAdvancePaymentOptions
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

  const handleGetGSTOptions = () => {
    getGSTs({
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
          setGstOptions(
            (
              responseData.data as GSTDocument[]
            ).map(({ _id, label }) => ({
              label,
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

  const handleAdvancePaymentOptions = () => {
    getAdvancePayments({
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
          setAdvancePaymentOptions(
            (
              responseData.data as AdvancePaymentDocument[]
            ).map(({ _id, label }) => ({
              label,
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
    data: Partial<ServiceCategoryDocument>
  ): void => {
    if (!data.gst) {
      data.gst = undefined;
    }

    updateServiceCategory(id, data)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceCategoryDocument
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
    handleGetGSTOptions();
    handleAdvancePaymentOptions();
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
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="show related categories"
          name="showRelatedCategories"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={
            error["showRelatedCategories"]
          }
          errorMessage=""
          variant="boolean"
          defaultValue={
            defaultValue[
              "showRelatedCategories"
            ] as boolean
          }
          setValue={
            setValue["showRelatedCategories"]
          }
        />
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
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="delivery charges"
          name="deliveryCharge"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["deliveryCharge"]}
          errorMessage={
            "deliveryCharge is required"
          }
          variant="number"
          defaultValue={
            defaultValue[
              "deliveryCharge"
            ] as number
          }
          decimal
          resetValue={
            resetValue["deliveryCharge"]
          }
          setValue={setValue["deliveryCharge"]}
        />
        <Input
          title="GST"
          name="gst"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["gst"]}
          errorMessage={"gst is required"}
          variant="dropdown"
          options={gstOptions}
          defaultValue={
            defaultValue["gst"] as string
          }
          resetValue={resetValue["gst"]}
          setValue={setValue["gst"]}
        />
        <Input
          title="advance payment"
          name="advancePayment"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["advancePayment"]}
          errorMessage={
            "advancePayment is required"
          }
          variant="dropdown"
          options={advancePaymentOptions}
          defaultValue={
            defaultValue[
              "advancePayment"
            ] as string
          }
          resetValue={
            resetValue["advancePayment"]
          }
          setValue={setValue["advancePayment"]}
        />
      </section>
      <section
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
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
