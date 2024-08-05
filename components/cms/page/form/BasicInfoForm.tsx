/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import {
  addPage,
  updatePage
} from "@/fetchAPIs/cms/page";
import {
  getServiceCategories,
  getServiceCategoryOptions
} from "@/fetchAPIs/cms/serviceCategory";

// styles
import styles from "./basicInfoForm.module.css";

// types
import { OptionType } from "@/types/cms/form";
import { PageDocument } from "@/schemas/cms/page";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import {
  getCities,
  getCityOptions
} from "@/fetchAPIs/cms/city";
import { CityDocument } from "@/schemas/cms/city";

// form control configuration
export function getBasicInfoFormConfig({
  category,
  name,
  slug,
  city
}: PageDocument): ConfigType {
  return {
    category: {
      isRequired: true,
      type: "dropdown",
      defaultValue: (category as string) || ""
    },
    name: {
      isRequired: true,
      type: "text",
      defaultValue: name || ""
    },
    slug: {
      isRequired: true,
      type: "text",
      defaultValue: slug || ""
    },
    city: {
      isRequired: false,
      type: "dropdown",
      defaultValue: (city as string) || ""
    }
  };
}

export default function BasicInfoForm({
  id,
  setId,
  setDefaultValue,
  setShowForm
}: {
  id?: string;
  setId: (id: string) => void;
  setDefaultValue: (
    defaultValue: PageDocument
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
    onReset: reset,
    onSubmit: handleSubmit
  } = useFormContext();

  const [
    serviceCategoryOptions,
    setServiceCategoryOptions
  ] = useState<OptionType[]>([]);
  const [cityOptions, setCityOptions] = useState<
    OptionType[]
  >([]);

  const [slugPlaceholder, setSlugPlaceholder] =
    useState<string>("");

  const handleGetServiceCategoryOptions = () => {
    getServiceCategoryOptions()
      .then((responseData: ResponseDataType) => {
        setServiceCategoryOptions(
          responseData.data as OptionType[]
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleGetCityOptions = () => {
    getCityOptions()
      .then((responseData: ResponseDataType) => {
        setCityOptions(
          responseData.data as OptionType[]
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const toSlug = (value: string): string =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const onSubmit = (
    data: Partial<PageDocument>
  ): void => {
    const transformedData = { ...data };

    if (!transformedData.slug) {
      transformedData.slug = slugPlaceholder;
    }

    if (!transformedData.city) {
      delete transformedData.city;
      // @ts-ignore
      transformedData.$unset = { city: 1 };
    }

    if (id) {
      updatePage(id, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setDefaultValue(
              responseData.data as PageDocument
            );
            addStatus(responseData.status);
            setShowForm(2);
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addPage(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setId(
              (responseData.data as PageDocument)
                ._id
            );
            setDefaultValue(
              responseData.data as PageDocument
            );
            addStatus(responseData.status);
            setShowForm(2);
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  useEffect(() => {
    handleGetServiceCategoryOptions();
    handleGetCityOptions();
  }, []);

  useEffect(() => {
    const slug = toSlug(value["name"] as string);

    if (
      !value["slug"] ||
      (slug.length >
        (value["slug"] as string).length &&
        slug.startsWith(
          value["slug"] as string
        )) ||
      (slug.length <
        (value["slug"] as string).length &&
        (value["slug"] as string).startsWith(
          slug
        ))
    ) {
      setValue["slug"](slug);
    }
    setSlugPlaceholder(slug);
  }, [value["name"]]);

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, (data: any) => {
          onSubmit(data);
        })
      }
    >
      <div
        className={`flex flex-col items-stretch gap-[12px] py-[10px] justify-start`}
      >
        <Input
          title="category"
          name="category"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["category"]}
          errorMessage={"category is required"}
          variant="dropdown"
          defaultValue={
            defaultValue["category"] as string
          }
          options={serviceCategoryOptions}
          setValue={setValue["category"]}
        />
        <Input
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <Input
          title="slug"
          name="slug"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["slug"]}
          errorMessage={"slug is required"}
          variant="text"
          defaultValue={
            defaultValue["slug"] as string
          }
          resetValue={resetValue["slug"]}
          setValue={setValue["slug"]}
          transform={toSlug}
          placeholder={slugPlaceholder}
        />
        <Input
          title="city"
          name="city"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["city"]}
          errorMessage={"city is required"}
          variant="dropdown"
          defaultValue={
            defaultValue["city"] as string
          }
          options={cityOptions}
          canSelectNone
          setValue={setValue["city"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel="next"
            variant="page"
            closeBtnLink="/cms/page"
          />
        </section>
      </div>
    </form>
  );
}
