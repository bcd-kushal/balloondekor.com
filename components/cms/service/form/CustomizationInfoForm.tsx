/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Schema } from "mongoose";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormActions from "@/components/common/form/FormActions";
import Input from "@/components/common/form/Input";
import InputSection from "@/components/common/form/InputSection";

// fetchAPIs
import { updateService } from "@/fetchAPIs/cms/service";

// types
import { OptionType } from "@/types/cms/form";
import { ResponseDataType } from "@/types/cms/api";
import {
  SelectedAddonDocument,
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/customizationInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCustomizationInfoFormConfig({
  customizationQuestions,
  addons,
  variants
}: Partial<ServiceDocument>): ConfigType {
  return {
    customizationQuestions: {
      type: "checkbox",
      isRequired: false,
      defaultValue:
        (
          customizationQuestions as Schema.Types.ObjectId[]
        )?.map((customizationQuestionId) =>
          customizationQuestionId.toString()
        ) || []
    },
    addons: {
      type: "addon",
      isRequired: false,
      defaultValue: (
        addons as SelectedAddonDocument[]
      )?.length
        ? (addons as SelectedAddonDocument[])
        : []
    },
    variants: {
      type: "variant",
      isRequired: false,
      defaultValue: (
        variants as VariantCategoryDocument[]
      )?.length
        ? (variants as VariantCategoryDocument[])
        : []
    }
  };
}

export default function CustomizationInfoForm({
  serviceId,
  options,
  selfReference,
  setDefaultValue,
  setShowFormNo
}: {
  serviceId: string;
  options: { [key: string]: OptionType[] };
  selfReference: ServiceDocument;
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
  // hooks
  const { push } = useRouter();

  const { addStatus } = useStatusContext();

  const {
    defaultValue,
    resetValue,
    onReset,
    value,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const handleSubmit = (
    data: Partial<ServiceDocument>
  ): void => {
    const transformedData: Partial<ServiceDocument> =
      {} as Partial<ServiceDocument>;

    transformedData.customizationQuestions =
      data.customizationQuestions;

    transformedData.addons = data.addons;

    transformedData.variants = data.variants;

    updateService(serviceId, transformedData)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceDocument
        );
        addStatus(responseData.status);
        push("/cms/service");
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <InputSection
        variant="section"
        sectionType="nested"
      >
        <Input
          title="Customization Question"
          name="customizationQuestions"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={
            error["customizationQuestions"]
          }
          errorMessage="Customization Questions is required"
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "customizationQuestions"
            ] as string[]
          }
          options={
            options.customizationQuestion || []
          }
          setValues={
            setValue["customizationQuestions"]
          }
        />
        <Input
          title="addons"
          name="addons"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["addons"]}
          errorMessage=""
          variant="addon"
          defaultValue={
            defaultValue[
              "addons"
            ] as SelectedAddonDocument[]
          }
          setValue={setValue["addons"]}
        />
        <InputSection
          variant="section"
          sectionType="root"
          heading="variant categories"
        >
          <Input
            title=""
            name="variant categories"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["variants"]}
            errorMessage=""
            variant="variant"
            selfReference={selfReference}
            defaultValues={
              defaultValue[
                "variants"
              ] as VariantCategoryDocument[]
            }
            setValues={setValue["variants"]}
          />
        </InputSection>
      </InputSection>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="finish"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowFormNo(3);
            }}
          />
        </section>
      </div>
    </form>
  );
}
