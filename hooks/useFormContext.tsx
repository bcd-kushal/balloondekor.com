"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useState
} from "react";
import { useStatusContext } from "@/hooks/useStatusContext";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import { ImageDocument } from "@/schemas/cms/image";
import {
  FAQDocument,
  LinkImageDocument,
  SEOSchemaDocument
} from "@/schemas/cms/serviceCategory";
import {
  NestedLinkDocument,
  NestedSectionDocument
} from "@/schemas/cms/navLink";
import { TimeSlotDocument } from "@/schemas/cms/deliveryType";
import {
  CityPriceDocument,
  DeliverySlotDocument,
  SelectedAddonDocument,
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";

// config types
export type ConfigType = {
  [key: string]: {
    isRequired: boolean;
  } & (
    | {
        type: "addon";
        defaultValue: SelectedAddonDocument[];
      }
    | {
        type: "banners";
        defaultValue: BannerDocument[];
      }
    | {
        type: "boolean";
        defaultValue: boolean;
      }
    | {
        type: "checkbox";
        defaultValue: string[];
      }
    | {
        type: "cityPrice";
        defaultValue: CityPriceDocument[];
      }
    | {
        type: "date";
        defaultValue: string;
      }
    | {
        type: "deliverySlot";
        defaultValue: DeliverySlotDocument[];
      }
    | {
        type: "dropdown";
        defaultValue: string | number;
      }
    | {
        type: "faq";
        defaultValue: FAQDocument[];
      }
    | {
        type: "image";
        defaultValue: ImageDocument[];
      }
    | {
        type: "linkImage";
        defaultValue: LinkImageDocument[];
      }
    | {
        type: "navLink";
        defaultValue: NestedLinkDocument[];
      }
    | {
        type: "navSection";
        defaultValue: NestedSectionDocument[];
      }
    | {
        type: "number";
        defaultValue: number;
      }
    | {
        type: "schema";
        defaultValue: SEOSchemaDocument;
      }
    | {
        type: "selectImage";
        defaultValue: ImageDocument[];
      }
    | {
        type: "services";
        defaultValue: ServiceDocument[];
      }
    | {
        type: "text";
        defaultValue: string;
      }
    | {
        type: "textList";
        defaultValue: string[];
      }
    | {
        type: "timeSlot";
        defaultValue: TimeSlotDocument[];
      }
    | {
        type: "variant";
        defaultValue: VariantCategoryDocument[];
      }
  );
};

// context types
type Value =
  | BannerDocument[]
  | boolean
  | CityPriceDocument[]
  | DeliverySlotDocument[]
  | FAQDocument[]
  | ImageDocument[]
  | LinkImageDocument[]
  | NestedLinkDocument[]
  | NestedSectionDocument[]
  | number
  | number[]
  | SelectedAddonDocument[]
  | SEOSchemaDocument
  | ServiceDocument[]
  | string
  | string[]
  | TimeSlotDocument[]
  | undefined
  | VariantCategoryDocument[];

export type Fields = {
  [key: string]: Value;
};

type Reset = {
  [key: string]: boolean;
};

type FormContextValueType = {
  defaultValue: Fields;
  resetValue: {
    [key: string]: boolean;
  };
  value: Fields;
  setValue: {
    [key: string]: (value: Value) => void;
  };
  hasSubmitted: boolean;
  error: {
    [key: string]: boolean;
  };
  onReset: () => void;
  onSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | undefined,
    handleSubmit: (data: Fields) => void
  ) => void;
};

type SetFieldProps = {
  fieldName: string;
  value: Value;
};

// context
const FormContext = createContext<
  FormContextValueType | undefined
>(undefined);

// PROVIDER
export function FormContextProvider({
  config,
  children
}: {
  config: ConfigType;
  children: ReactNode;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // process initial values
  const initialFormData: Fields = {};
  const initialReset: Reset = {};

  for (const fieldName in config) {
    initialFormData[fieldName] = config[fieldName]
      .defaultValue as Value;
    initialReset[fieldName] = false;
  }

  // states
  const [formData, setFormData] =
    useState<Fields>(initialFormData);
  const [resetValue, setResetValue] =
    useState<Reset>(initialReset);
  const [hasSubmitted, setHasSubmitted] =
    useState<boolean>(false);

  // handlers
  const handleSetField = ({
    fieldName,
    value
  }: SetFieldProps) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }));
    setResetValue((prevResetValue) => ({
      ...prevResetValue,
      [fieldName]: false
    }));
  };

  const handleResetField = (
    fieldName: string
  ) => {
    setResetValue((prevResetValues) => ({
      ...prevResetValues,
      [fieldName]: true
    }));
  };

  const handleResetAll = () => {
    for (let key in resetValue) {
      handleResetField(key);
    }
  };

  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | undefined,
    handleSubmit: (data: Fields) => void
  ) => {
    if (e) {
      e.preventDefault();
    }
    setHasSubmitted(true);

    for (let key in error) {
      if (error[key]) {
        addStatus([
          {
            type: "error",
            message:
              "Some Required Fields are empty"
          }
        ]);

        return;
      }
    }

    handleSubmit(formData);
  };

  // process values
  const defaultValue: {
    [key: string]: Value;
  } = {};

  const setValue: {
    [key: string]: (value: Value) => void;
  } = {};

  const error: {
    [key: string]: boolean;
  } = {};

  for (const fieldName in config) {
    const { type, isRequired } =
      config[fieldName];

    defaultValue[fieldName] = (() => {
      if (type === "addon") {
        return formData[
          fieldName
        ] as SelectedAddonDocument[];
      } else if (type === "banners") {
        return formData[
          fieldName
        ] as BannerDocument[];
      } else if (type === "boolean") {
        return formData[fieldName] as boolean;
      } else if (type === "cityPrice") {
        return [
          ...(formData[
            fieldName
          ] as CityPriceDocument[])
        ];
      } else if (type === "checkbox") {
        return [
          ...(formData[fieldName] as string[])
        ];
      } else if (type === "date") {
        return formData[fieldName] as string;
      } else if (type === "deliverySlot") {
        return formData[
          fieldName
        ] as DeliverySlotDocument[];
      } else if (type === "dropdown") {
        return formData[fieldName] as string;
      } else if (type === "faq") {
        return formData[
          fieldName
        ] as FAQDocument[];
      } else if (type === "image") {
        return [
          ...(formData[
            fieldName
          ] as ImageDocument[])
        ];
      } else if (type === "linkImage") {
        return [
          ...(formData[
            fieldName
          ] as LinkImageDocument[])
        ];
      } else if (type === "navLink") {
        return [
          ...(formData[
            fieldName
          ] as NestedLinkDocument[])
        ];
      } else if (type === "navSection") {
        return [
          ...(formData[
            fieldName
          ] as NestedSectionDocument[])
        ];
      } else if (type === "number") {
        return formData[fieldName] as number;
      } else if (type === "schema") {
        return formData[
          fieldName
        ] as SEOSchemaDocument;
      } else if (type === "selectImage") {
        return formData[
          fieldName
        ] as ImageDocument[];
      } else if (type === "services") {
        return formData[
          fieldName
        ] as ServiceDocument[];
      } else if (type === "text") {
        return formData[fieldName] as string;
      } else if (type === "textList") {
        return formData[fieldName] as string[];
      } else if (type === "timeSlot") {
        return formData[
          fieldName
        ] as TimeSlotDocument[];
      } else if (type === "variant") {
        return formData[
          fieldName
        ] as VariantCategoryDocument[];
      }

      return "";
    })();

    setValue[fieldName] = (
      value: Value
    ): void => {
      handleSetField({ fieldName, value });
      initialReset[fieldName] = false;
    };

    error[fieldName] = (() => {
      if (isRequired) {
        if (type === "addon") {
          return (
            (
              formData[
                fieldName
              ] as SelectedAddonDocument[]
            ).length === 0
          );
        } else if (type === "banners") {
          return (
            (
              formData[
                fieldName
              ] as BannerDocument[]
            ).length === 0
          );
        } else if (type === "boolean") {
          return false;
        } else if (type === "cityPrice") {
          return (
            (
              formData[
                fieldName
              ] as CityPriceDocument[]
            ).length === 0
          );
        } else if (type === "checkbox") {
          return (
            (formData[fieldName] as string[])
              .length === 0
          );
        } else if (type === "date") {
          return (
            (formData[fieldName] as string)
              .length === 0
          );
        } else if (type === "deliverySlot") {
          return (
            (
              formData[
                fieldName
              ] as DeliverySlotDocument[]
            ).length === 0
          );
        } else if (type === "dropdown") {
          return (
            (formData[fieldName] as string)
              .length === 0
          );
        } else if (type === "faq") {
          return (
            (formData[fieldName] as FAQDocument[])
              .length === 0
          );
        } else if (type === "image") {
          return (
            (
              formData[
                fieldName
              ] as ImageDocument[]
            ).length === 0
          );
        } else if (type === "linkImage") {
          return (
            (
              formData[
                fieldName
              ] as LinkImageDocument[]
            ).length === 0
          );
        } else if (type === "navLink") {
          return (
            (
              formData[
                fieldName
              ] as NestedLinkDocument[]
            ).length === 0
          );
        } else if (type === "navSection") {
          return (
            (
              formData[
                fieldName
              ] as NestedSectionDocument[]
            ).length === 0
          );
        } else if (type === "number") {
          return isNaN(
            formData[fieldName] as number
          );
        } else if (type === "schema") {
          return Boolean(
            !(
              formData[
                fieldName
              ] as SEOSchemaDocument
            ).name ||
              ((
                formData[
                  fieldName
                ] as SEOSchemaDocument
              ).aggregateRating
                ? !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).aggregateRating.bestRating ||
                  !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).aggregateRating.ratingCount ||
                  !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).aggregateRating.ratingValue
                : false) ||
              ((
                formData[
                  fieldName
                ] as SEOSchemaDocument
              ).offers
                ? !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).offers.highPrice ||
                  !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).offers.lowPrice ||
                  !(
                    formData[
                      fieldName
                    ] as SEOSchemaDocument
                  ).offers.offerCount
                : false)
          );
        } else if (type === "selectImage") {
          return (
            (formData[fieldName] as number[])
              .length === 0
          );
        } else if (type === "services") {
          return (
            (
              formData[
                fieldName
              ] as ServiceDocument[]
            ).length === 0
          );
        } else if (type === "text") {
          return (
            (formData[fieldName] as string)
              .length === 0
          );
        } else if (type === "textList") {
          return (
            (formData[fieldName] as string[])
              .length === 0
          );
        } else if (type === "timeSlot") {
          return (
            (
              formData[
                fieldName
              ] as TimeSlotDocument[]
            ).length === 0
          );
        } else if (type === "variant") {
          return (
            (
              formData[
                fieldName
              ] as VariantCategoryDocument[]
            ).length === 0
          );
        }
      }

      return false;
    })();
  }

  // // validation
  // const validate = () => {
  //   // validation logic
  //   return true;
  // };

  const formContextValue: FormContextValueType = {
    defaultValue,
    resetValue,
    value: formData,
    setValue,
    hasSubmitted,
    error,
    onReset: handleResetAll,
    onSubmit: onSubmit
  };

  return (
    <FormContext.Provider
      value={formContextValue}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext =
  (): FormContextValueType => {
    const context = useContext(FormContext);

    if (!context) {
      throw new Error(
        "useFormContext must be used within a FormContextProvider"
      );
    }

    return context;
  };
