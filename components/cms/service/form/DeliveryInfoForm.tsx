"use client";

// libraries
import { FormEvent, useState } from "react";
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
  BasePriceDocument,
  CityPriceDocument,
  DeliverySlotDocument,
  DeliveryTimeDocument,
  PriceDocument,
  ServiceDocument
} from "@/schemas/cms/service";

// styles
import styles from "@/components/cms/service/form/deliveryInfoForm.module.css";

// FORM CONTROL CONFIGURATION
export function getDeliveryInfoFormConfig({
  deliveryTime,
  price,
  limitAvailability
}: Partial<ServiceDocument>): ConfigType {
  return {
    orderProcessingTime: {
      isRequired: true,
      type: "dropdown",
      defaultValue:
        (
          (deliveryTime as DeliveryTimeDocument)
            ?.orderProcessingTime as Schema.Types.ObjectId
        )?.toString() || ""
    },
    baseMrp: {
      isRequired: true,
      type: "number",
      defaultValue: price?.base.mrp || NaN
    },
    basePrice: {
      isRequired: true,
      type: "number",
      defaultValue: price?.base.price || NaN
    },
    cityPrice: {
      isRequired: false,
      type: "cityPrice",
      defaultValue: price?.cities || []
    },
    limitAvailability: {
      isRequired: false,
      type: "boolean",
      defaultValue: limitAvailability || false
    },
    deliverySlots: {
      isRequired: false,
      type: "deliverySlot",
      defaultValue:
        ((deliveryTime as DeliveryTimeDocument)
          ?.deliverySlots as DeliverySlotDocument[]) ||
        []
    }
  };
}

export default function DeliveryInfoForm({
  serviceId,
  options,
  setDefaultValue,
  setShowFormNo
}: {
  serviceId: string;
  options: { [key: string]: OptionType[] };
  setDefaultValue: (
    defaultValue: ServiceDocument
  ) => void;
  setShowFormNo: (showFormNo: number) => void;
}) {
  // hooks
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

  // states
  const [
    showCityPriceForm,
    setShowCityPriceForm
  ] = useState<boolean>(
    defaultValue["orderProcessingTime"] &&
      !(
        defaultValue[
          "cityPrice"
        ] as CityPriceDocument[]
      ).length
      ? false
      : true
  );

  const handleSubmit = (
    data: Partial<ServiceDocument>
  ): void => {
    if (
      // @ts-ignore
      (data.cityPrice as CityPriceDocument[])
        .length &&
      !(
        // @ts-ignore
        data.deliverySlots.length
      )
    ) {
      addStatus([
        {
          type: "error",
          message:
            "Some Required Fields are Empty"
        }
      ]);

      return;
    }

    const transformedData: Partial<ServiceDocument> =
      {} as Partial<ServiceDocument>;

    transformedData.deliveryTime = {
      orderProcessingTime:
        // @ts-ignore
        data.orderProcessingTime,
      deliverySlots:
        // @ts-ignore
        data.deliverySlots as DeliverySlotDocument[]
    } as DeliveryTimeDocument;

    transformedData.price = {
      base: {
        // @ts-ignore
        mrp: data.baseMrp,
        // @ts-ignore
        price: data.basePrice
      } as BasePriceDocument,
      cities: showCityPriceForm
        ? // @ts-ignore
          (data.cityPrice as CityPriceDocument[])
        : []
    } as PriceDocument;

    transformedData.limitAvailability =
      data.limitAvailability;

    updateService(serviceId, transformedData)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceDocument
        );
        addStatus(responseData.status);
        setShowFormNo(4);
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  return (
    <form
      className={`p-0 mt-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <InputSection
        variant="section"
        sectionType="root"
      >
        <Input
          title="processing time"
          name="orderProcessingTime"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["orderProcessingTime"]}
          errorMessage={
            "Order Processing Time is required"
          }
          variant="dropdown"
          options={
            options.orderProcessingTime || []
          }
          defaultValue={
            defaultValue[
              "orderProcessingTime"
            ] as string
          }
          resetValue={
            resetValue["orderProcessingTime"]
          }
          setValue={
            setValue["orderProcessingTime"]
          }
        />
      </InputSection>
      <InputSection
        variant="section"
        sectionType="root"
        heading="price"
      >
        <InputSection
          variant="section"
          sectionType="nested"
          heading="base price"
        >
          <InputSection
            variant="layout"
            layoutColumn="double"
          >
            <Input
              title="MRP"
              name="baseMRP"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["baseMrp"]}
              errorMessage="base mrp is required"
              variant="number"
              defaultValue={
                defaultValue["baseMrp"] as number
              }
              decimal
              setValue={setValue["baseMrp"]}
            />
            <Input
              title="price"
              name="basePrice"
              isRequired={true}
              hasSubmitted={hasSubmitted}
              showError={error["basePrice"]}
              errorMessage="base price is required"
              variant="number"
              decimal
              defaultValue={
                defaultValue[
                  "basePrice"
                ] as number
              }
              setValue={setValue["basePrice"]}
            />
          </InputSection>
        </InputSection>
        <InputSection
          variant="section"
          sectionType="nested"
          heading="city wise price"
          showToggle
          toggleValue={showCityPriceForm}
          onToggle={setShowCityPriceForm}
        >
          <Input
            title=""
            name="cityPrice"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["cityPrice"]}
            errorMessage=""
            variant="cityPrice"
            defaultValues={
              defaultValue[
                "cityPrice"
              ] as CityPriceDocument[]
            }
            setValues={setValue["cityPrice"]}
          />
          <Input
            title="limit availability"
            name="limitAvailability"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["limitAvailability"]}
            errorMessage=""
            variant="boolean"
            defaultValue={
              defaultValue[
                "limitAvailability"
              ] as boolean
            }
            setValue={
              setValue["limitAvailability"]
            }
          />
          <Input
            title="delivery slots"
            name="deliverySlots"
            isRequired={true}
            hasSubmitted={hasSubmitted}
            showError={
              hasSubmitted &&
              !(
                value[
                  "deliverySlots"
                ] as DeliverySlotDocument[]
              ).length
            }
            errorMessage="Delivery Slots are required"
            variant="deliverySlot"
            defaultValues={
              defaultValue[
                "deliverySlots"
              ] as DeliverySlotDocument[]
            }
            setValues={setValue["deliverySlots"]}
          />
        </InputSection>
      </InputSection>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            closeBtnLabel="prev"
            variant="modal"
            closeBtnAction={() => {
              setShowFormNo(2);
            }}
          />
        </section>
      </div>
    </form>
  );
}
