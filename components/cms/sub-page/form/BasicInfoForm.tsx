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
  getCities,
  getCityOptions
} from "@/fetchAPIs/cms/city";
import {
  getPageOptions,
  getPages
} from "@/fetchAPIs/cms/page";
import {
  addSubPage,
  updateSubPage
} from "@/fetchAPIs/cms/subPage";

// styles
import styles from "./basicInfoForm.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";
import {
  OptionType,
  PageOptionType
} from "@/types/cms/form";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";
import { SubPageDocument } from "@/schemas/cms/subPage";
import { getServiceCategoryOptions } from "@/fetchAPIs/cms/serviceCategory";

// form control configuration
export function getBasicInfoFormConfig({
  page,
  name,
  slug,
  city
}: SubPageDocument): ConfigType {
  return {
    page: {
      isRequired: true,
      type: "dropdown",
      defaultValue: (page as string) || ""
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
  initialCategory,
  initialPage,
  setId,
  setDefaultValue,
  setShowForm
}: {
  id?: string;
  initialCategory?: string;
  initialPage?: string;
  setId: (id: string) => void;
  setDefaultValue: (
    defaultValue: SubPageDocument
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

  const [categoryOptions, setCategoryOptions] =
    useState<OptionType[]>([]);
  const [allPageOptions, setAllPageOptions] =
    useState<PageOptionType[]>([]);
  const [pageOptions, setPageOptions] = useState<
    OptionType[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    OptionType[]
  >([]);

  const [category, setCategory] =
    useState<string>(initialCategory || "");

  const [slugPlaceholder, setSlugPlaceholder] =
    useState<string>("");

  const handleGetCategoryOptions = () => {
    getServiceCategoryOptions()
      .then((responseData: ResponseDataType) => {
        setCategoryOptions(
          responseData.data as OptionType[]
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleGetPageOptions = () => {
    getPageOptions(true)
      .then((responseData: ResponseDataType) => {
        setAllPageOptions(
          responseData.data as PageOptionType[]
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

  const handleSubmit = (
    data: Partial<SubPageDocument>
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
      updateSubPage(id, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setDefaultValue(
              responseData.data as SubPageDocument
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
      addSubPage(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            setId(
              (
                responseData.data as SubPageDocument
              )._id
            );
            setDefaultValue(
              responseData.data as SubPageDocument
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
    handleGetCategoryOptions();
    handleGetPageOptions();
    handleGetCityOptions();
  }, []);

  useEffect(() => {
    setPageOptions(
      [...allPageOptions].filter(
        ({ category: optionCategory }) =>
          optionCategory === category
      )
    );
  }, [allPageOptions, category]);

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
        onSubmit(e, (data: any) => {
          handleSubmit(data);
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
          showError={!Boolean(category)}
          errorMessage={"category is required"}
          variant="dropdown"
          defaultValue={
            category ||
            (allPageOptions.find(
              ({ value }) =>
                value ===
                (defaultValue["page"] as string)
            )?.category as string) ||
            ""
          }
          options={categoryOptions}
          setValue={(category) => {
            setCategory(category as string);
          }}
        />
        <Input
          title="page"
          name="page"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["page"]}
          errorMessage={"page is required"}
          variant="dropdown"
          defaultValue={
            (defaultValue["page"] as string) ||
            initialPage ||
            ""
          }
          options={pageOptions}
          setValue={setValue["page"]}
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
            closeBtnLink="/cms/sub-page"
          />
        </section>
      </div>
    </form>
  );
}
