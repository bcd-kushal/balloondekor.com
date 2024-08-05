// LIBRARIES
import { KeyboardEvent } from "react";

// components
import AddonInput from "./AddonInput";
import AdvanceCheckboxInput from "./AdvanceCheckboxInput";
import BannerInput from "./BannerInput";
import BooleanInput from "./BooleanInput";
import CheckboxInput from "./CheckboxInput";
import CityPriceInput from "./CityPriceInput";
import DateInput from "./DateInput";
import DeliverySlotInput from "./DeliverySlotInput";
import DropdownInput from "./DropdownInput";
import FAQInput from "./FAQInput";
import ImageInput from "./ImageInput";
import LinkImageInput from "./LinkImageInput";
import LongTextInput from "./LongTextInput";
import NavLinkInput from "./NavLinkInput";
import NavSectionInput from "./NavSectionInput";
import NumberInput from "./NumberInput";
import PasswordInput from "./PasswordInput";
import RichTextInput from "./RichTextInput";
import SchemaInput from "./SchemaInput";
import SearchInput from "./SearchInput";
import SelectImageInput from "./SelectImageInput";
import TextInput from "./TextInput";
import TextListInput from "./TextListInput";
import TimeSlotInput from "./TimeSlotInput";
import VariantCategoryInput from "./VariantCategoryInput";

// types
import { BannerDocument } from "@/schemas/cms/banner";
import { TimeSlotDocument } from "@/schemas/cms/deliveryType";
import { ImageDocument } from "@/schemas/cms/image";
import {
  NestedLinkDocument,
  NestedSectionDocument
} from "@/schemas/cms/navLink";
import { OptionType } from "@/types/cms/form";
import {
  CityPriceDocument,
  DeliverySlotDocument,
  SelectedAddonDocument,
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";
import {
  FAQDocument,
  LinkImageDocument,
  SEOSchemaDocument
} from "@/schemas/cms/serviceCategory";
import ServiceInput from "./ServiceInput";

// types
type CommonProps = {
  title: string;
  name: string;
  className?: string;
  isRequired: boolean;
  hasSubmitted: boolean;
  showError: boolean;
  errorMessage: string;
};

// advance checkbox
type AddonVariant = {
  variant: "addon";
  defaultValue: SelectedAddonDocument[];
  setValue: (
    value: SelectedAddonDocument[]
  ) => void;
};

// advance checkbox
type AdvanceCheckboxVariant = {
  variant: "advance-checkbox";
  options: OptionType[];
  defaultValues: string[];
  disabled?: boolean;
  setValues: (values: string[]) => void;
};

// boolean
type BannerVariant = {
  variant: "banner";
  defaultValue: BannerDocument[];
  setValue: (value: BannerDocument[]) => void;
};

// boolean
type BooleanVariant = {
  variant: "boolean";
  defaultValue: boolean;
  value?: boolean;
  setValue: (value: boolean) => void;
};

// checkbox
type CheckboxVariant = {
  variant: "checkbox";
  options: { label: string; value: string }[];
  defaultValues: string[];
  setValues: (values: string[]) => void;
};

// cityPrice
type CityPriceVariant = {
  variant: "cityPrice";
  defaultValues: CityPriceDocument[];
  resetValue?: boolean;
  setValues: (value: CityPriceDocument[]) => void;
};

// color
// type ColorVariant = {
//   variant: "color";
// };

// date
type DateVariant = {
  variant: "date";
  defaultValue: string;
  resetValue?: boolean;
  setValue: (value: string) => void;
};

// dropdown
type DeliverySlotVariant = {
  variant: "deliverySlot";
  defaultValues: DeliverySlotDocument[];
  setValues: (
    deliverySlotValues: DeliverySlotDocument[]
  ) => void;
};

// dropdown
type DropdownVariant = {
  variant: "dropdown";
  options: OptionType[];
  defaultValue: string | number;
  resetValue?: boolean;
  canSelectNone?: boolean;
  setValue: (value: string | number) => void;
};

// email
// type EmailVariant = {
//   variant: "email";
// };

// faq
type FAQVariant = {
  variant: "faq";
  defaultValue?: FAQDocument[];
  setValue: (value: FAQDocument[]) => void;
};

// image
type ImageVariant = {
  variant: "image";
  defaultValue: string;
  resetValue?: boolean;
  setValue: (value: ImageDocument[]) => void;
};

// linkImage
type LinkImageVariant = {
  variant: "linkImage";
  defaultValue: LinkImageDocument[];
  setValue: (value: LinkImageDocument[]) => void;
};

// longText
type LongTextVariant = {
  variant: "longText";
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  isList?: boolean;
  setValue: (value: string) => void;
};

// navLink
type NavLinkVariant = {
  variant: "navLink";
  defaultValue: NestedLinkDocument[];
  disableTag?: boolean;
  setValue: (value: NestedLinkDocument[]) => void;
};

// navSection
type NavSectionVariant = {
  variant: "navSection";
  defaultValue: NestedSectionDocument[];
  disableTag?: boolean;
  setValue: (
    value: NestedSectionDocument[]
  ) => void;
};

// number
type NumberVariant = {
  variant: "number";
  placeholder?: string;
  defaultValue: number;
  resetValue?: boolean;
  disabled?: boolean;
  decimal?: boolean;
  setValue: (value: number) => void;
};

// password
type PasswordVariant = {
  variant: "password";
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  showPassword: boolean;
  setValue: (value: string) => void;
  toggleShowPassword: () => void;
};

// radio
// type RadioVariant = {
//   variant: "radio";
// };

// richText
type RichTextVariant = {
  variant: "richText";
  defaultValue: string;
  resetValue?: boolean;
  setValue: (value: string) => void;
};

// schema
type SchemaVariant = {
  variant: "schema";
  defaultValue?: SEOSchemaDocument;
  rating?: boolean;
  offers?: boolean;
  resetValue?: boolean;
  setValue: (value: SEOSchemaDocument) => void;
};

// search
type SearchVariant = {
  variant: "search";
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  disabled?: boolean;
  setValue: (value: string) => void;
  transform?: (value: string) => string;
  setRef?: (ref: HTMLInputElement | null) => void;
};

// select image
type SelectImageVariant = {
  variant: "selectImage";
  defaultValue?: ImageDocument[];
  resetValue?: boolean;
  multiple?: boolean;
  setValue: (selectedImages: string[]) => void;
};

// services
type ServicesVariant = {
  variant: "services";
  defaultValue?: ServiceDocument[];
  setValue: (value: ServiceDocument[]) => void;
};

// text
type TextVariant = {
  variant: "text";
  placeholder?: string;
  defaultValue: string;
  resetValue?: boolean;
  disabled?: boolean;
  setValue: (value: string) => void;
  handleKeyPress?: (
    e: KeyboardEvent<HTMLInputElement>
  ) => void;
  transform?: (value: string) => string;
  setRef?: (ref: HTMLInputElement | null) => void;
};

// text list
type TextListVariant = {
  variant: "textList";
  defaultValues: string[];
  srLabel: string;
  inputType: "text" | "longText";
  setValue: (values: string[]) => void;
};

// text list
type TimeSlotVariant = {
  variant: "timeSlot";
  defaultValues: TimeSlotDocument[];
  setValue: (values: TimeSlotDocument[]) => void;
};

// time
// type TimeVariant = {
//   variant: "time";
// };

// url
// type UrlVariant = {
//   variant: "url";
// };

// variant
type VariantVariant = {
  variant: "variant";
  selfReference: ServiceDocument;
  defaultValues: VariantCategoryDocument[];
  setValues: (
    variantCategoryValues: VariantCategoryDocument[]
  ) => void;
};

type Props = CommonProps &
  (
    | AddonVariant
    | AdvanceCheckboxVariant
    | BannerVariant
    | BooleanVariant
    | CheckboxVariant
    | CityPriceVariant
    // | ColorVariant
    | DateVariant
    | DeliverySlotVariant
    | DropdownVariant
    // | EmailVariant
    | FAQVariant
    | ImageVariant
    | LinkImageVariant
    | LongTextVariant
    | NavLinkVariant
    | NavSectionVariant
    | NumberVariant
    | PasswordVariant
    // | RadioVariant
    | RichTextVariant
    | SchemaVariant
    | SearchVariant
    | SelectImageVariant
    | ServicesVariant
    | TextVariant
    | TextListVariant
    | TimeSlotVariant
    | VariantVariant
  );
// | TimeVariant
// | UrlVariant

export default function Input(
  props: Props & { type?: "modern" | "default" }
) {
  const {
    title,
    name,
    className,
    isRequired,
    hasSubmitted,
    showError,
    errorMessage,
    variant,
    type
  } = props;

  if (variant === "addon") {
    const { defaultValue, setValue } =
      props as AddonVariant;

    return (
      <AddonInput
        title={title}
        isRequired={isRequired}
        defaultValue={defaultValue}
        setValue={setValue}
      />
    );
  } else if (variant === "advance-checkbox") {
    const {
      options,
      defaultValues,
      disabled,
      setValues
    } = props as AdvanceCheckboxVariant;

    return (
      <AdvanceCheckboxInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        options={options}
        defaultValues={defaultValues}
        disabled={disabled}
        setValues={setValues}
      />
    );
  } else if (variant === "banner") {
    const { defaultValue, setValue } =
      props as BannerVariant;

    return (
      <BannerInput
        title={title}
        initialValue={defaultValue}
        setValue={setValue}
      />
    );
  } else if (variant === "boolean") {
    const { defaultValue, value, setValue } =
      props as BooleanVariant;

    return (
      <BooleanInput
        title={title}
        defaultValue={defaultValue}
        value={value}
        setValue={setValue}
      />
    );
  } else if (variant === "checkbox") {
    const { options, defaultValues, setValues } =
      props as CheckboxVariant;

    return (
      <CheckboxInput
        title={title}
        name={name}
        isRequired={isRequired}
        showError={showError}
        errorMessage={errorMessage}
        options={options}
        defaultValues={defaultValues}
        setValues={setValues}
      />
    );
  } else if (variant === "cityPrice") {
    const {
      defaultValues,
      resetValue,
      setValues
    } = props as CityPriceVariant;

    return (
      <CityPriceInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValues}
        resetValue={resetValue}
        setValue={setValues}
      />
    );
  } else if (variant === "date") {
    const { defaultValue, resetValue, setValue } =
      props as DateVariant;

    return (
      <DateInput
        title={title}
        name={name}
        isRequired={isRequired}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        setValue={setValue}
      />
    );
  } else if (variant === "deliverySlot") {
    const { defaultValues, setValues } =
      props as DeliverySlotVariant;

    return (
      <DeliverySlotInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValues={defaultValues}
        setValues={setValues}
      />
    );
  } else if (variant === "dropdown") {
    const {
      options,
      defaultValue,
      resetValue,
      canSelectNone,
      setValue
    } = props as DropdownVariant;

    return (
      <DropdownInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        options={options}
        defaultValue={defaultValue}
        resetValue={resetValue}
        className={className}
        canSelectNone={canSelectNone}
        setValue={setValue}
      />
    );
  } else if (variant === "faq") {
    const { defaultValue, setValue } =
      props as FAQVariant;

    return (
      <FAQInput
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        setValue={setValue}
      />
    );
  } else if (variant === "image") {
    const { defaultValue, resetValue, setValue } =
      props as ImageVariant;

    return (
      <ImageInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        setValue={setValue}
      />
    );
  } else if (variant === "linkImage") {
    const { defaultValue, setValue } =
      props as LinkImageVariant;

    return (
      <LinkImageInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        setValue={setValue}
      />
    );
  } else if (variant === "longText") {
    const {
      placeholder,
      defaultValue,
      resetValue,
      isList,
      setValue
    } = props as LongTextVariant;

    return (
      <LongTextInput
        title={title}
        name={name}
        placeholder={placeholder}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        isList={isList}
        setValue={setValue}
      />
    );
  } else if (variant === "navLink") {
    const { defaultValue, disableTag, setValue } =
      props as NavLinkVariant;

    return (
      <NavLinkInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        disableTag={disableTag}
        setValue={setValue}
      />
    );
  } else if (variant === "navSection") {
    const { defaultValue, disableTag, setValue } =
      props as NavSectionVariant;

    return (
      <NavSectionInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        disableTag={disableTag}
        setValue={setValue}
      />
    );
  } else if (variant === "number") {
    const {
      placeholder,
      defaultValue,
      resetValue,
      disabled,
      decimal,
      setValue
    } = props as NumberVariant;

    return (
      <NumberInput
        title={title}
        name={name}
        placeholder={placeholder}
        className={className}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        disabled={disabled}
        decimal={decimal}
        type={type}
        setValue={setValue}
      />
    );
  } else if (variant === "password") {
    const {
      placeholder,
      defaultValue,
      resetValue,
      showPassword,
      setValue,
      toggleShowPassword
    } = props as PasswordVariant;

    return (
      <PasswordInput
        title={title}
        name={name}
        placeholder={placeholder}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        showPassword={showPassword}
        className={className}
        type={type}
        setValue={setValue}
        toggleShowPassword={toggleShowPassword}
      />
    );
  } else if (variant === "richText") {
    const { defaultValue, resetValue, setValue } =
      props as RichTextVariant;

    return (
      <RichTextInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        setValue={setValue}
      />
    );
  } else if (variant === "schema") {
    const {
      defaultValue,
      rating,
      offers,
      resetValue,
      setValue
    } = props as SchemaVariant;

    return (
      <SchemaInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        setValue={setValue}
        rating={rating}
        offers={offers}
      />
    );
  } else if (variant === "search") {
    const {
      placeholder,
      defaultValue,
      resetValue,
      disabled,
      setValue,
      transform,
      setRef
    } = props as SearchVariant;

    return (
      <SearchInput
        title={title}
        name={name}
        placeholder={placeholder}
        className={className}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        setValue={setValue}
      />
    );
  } else if (variant === "selectImage") {
    const {
      defaultValue,
      resetValue,
      multiple,
      setValue
    } = props as SelectImageVariant;

    return (
      <SelectImageInput
        title={title}
        name={name}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={
          defaultValue as ImageDocument[]
        }
        resetValue={resetValue}
        multiple={multiple}
        setValue={setValue}
      />
    );
  } else if (variant === "services") {
    const { defaultValue, setValue } =
      props as ServicesVariant;

    return (
      <ServiceInput
        title={title}
        isRequired={isRequired}
        defaultValue={
          defaultValue as ServiceDocument[]
        }
        setValue={setValue}
      />
    );
  } else if (variant === "text") {
    const {
      placeholder,
      defaultValue,
      resetValue,
      disabled,
      setValue,
      handleKeyPress,
      transform,
      setRef
    } = props as TextVariant;

    return (
      <TextInput
        title={title}
        name={name}
        placeholder={placeholder}
        className={className}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        resetValue={resetValue}
        disabled={disabled}
        type={type}
        setValue={setValue}
        handleKeyPress={handleKeyPress}
        transform={transform}
        setRef={setRef}
      />
    );
  } else if (variant === "textList") {
    const {
      defaultValues,
      srLabel,
      inputType,
      setValue
    } = props as TextListVariant;

    return (
      <TextListInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValues={defaultValues}
        srLabel={srLabel}
        inputType={inputType}
        setValue={setValue}
      />
    );
  } else if (variant === "timeSlot") {
    const { defaultValues, setValue } =
      props as TimeSlotVariant;

    return (
      <TimeSlotInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        defaultValues={defaultValues}
        setValue={setValue}
      />
    );
  } else if (variant === "variant") {
    const {
      selfReference,
      defaultValues,
      setValues
    } = props as VariantVariant;

    return (
      <VariantCategoryInput
        title={title}
        isRequired={isRequired}
        hasSubmitted={hasSubmitted}
        showError={showError}
        errorMessage={errorMessage}
        selfReference={selfReference}
        defaultValues={defaultValues}
        setValues={setValues}
      />
    );
  }

  return null;
}
