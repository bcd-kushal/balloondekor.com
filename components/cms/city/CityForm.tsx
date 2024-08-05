/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";

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
  addCity,
  updateCity
} from "@/fetchAPIs/cms/city";
import { getStates } from "@/fetchAPIs/cms/state";

import { OptionType } from "@/types/cms/form";
// types
import { CityDocument } from "@/schemas/cms/city";
import { ImageDocument } from "@/schemas/cms/image";
import { StateDocument } from "@/schemas/cms/state";
import {
  ResponseDataType,
  PaginationResponseDataType
} from "@/types/cms/api";

// styles
import styles from "@/components/cms/city/cityForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCityFormConfig({
  state,
  name,
  isTopCity,
  icon
}: Partial<CityDocument>): ConfigType {
  return {
    state: {
      type: "dropdown",
      isRequired: true,
      defaultValue:
        (state as StateDocument)?._id || ""
    },
    name: {
      type: "text",
      isRequired: true,
      defaultValue: name || ""
    },
    isTopCity: {
      type: "boolean",
      isRequired: false,
      defaultValue: isTopCity as boolean
    },
    icon: {
      isRequired: false,
      type: "selectImage",
      defaultValue: icon
        ? [icon as ImageDocument]
        : []
    }
  };
}

export default function CityForm({
  cityId
}: {
  cityId?: string;
}) {
  // hooks
  const { push } = useRouter();

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

  const { addStatus } = useStatusContext();

  const [stateOptions, setStateOptions] =
    useState<OptionType[]>([]);

  // handlers
  const handleSubmit = (
    data: Partial<CityDocument>
  ): void => {
    if (
      data.isTopCity &&
      // @ts-ignore
      !(data.icon as ImageDocument[]).length
    ) {
      addStatus([
        {
          type: "error",
          message: "A Top City Must Have An Icon"
        }
      ]);
    } else {
      const transformedData = {
        ...data,
        icon:
          (data.isTopCity &&
            // @ts-ignore
            (data.icon as ImageDocument[])[0]) ||
          undefined
      };

      if (cityId) {
        updateCity(cityId, transformedData)
          .then(
            (responseData: ResponseDataType) => {
              addStatus(responseData.status);
              push("/cms/city");
            }
          )
          .catch(
            (responseData: ResponseDataType) => {
              addStatus(responseData.status);
            }
          );
      } else {
        addCity(transformedData)
          .then(
            (responseData: ResponseDataType) => {
              addStatus(responseData.status);
              push("/cms/city");
            }
          )
          .catch(
            (responseData: ResponseDataType) => {
              addStatus(responseData.status);
            }
          );
      }
    }
  };

  const handleGetStateOptions = () => {
    getStates({
      active: true,
      deleted: false,
      offset: 0,
      limit: 0,
      sortBy: "name",
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
          setStateOptions(
            (
              responseData.data as StateDocument[]
            ).map(({ _id, name }) => ({
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

  useEffect(() => {
    console.log(value["isTopCity"]);
  }, [value["isTopCity"]]);

  useEffect(() => {
    handleGetStateOptions();
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
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="state"
          name="state"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["state"]}
          errorMessage={"state is required"}
          variant="dropdown"
          options={stateOptions}
          defaultValue={
            defaultValue["state"] as string
          }
          resetValue={resetValue["state"]}
          setValue={setValue["state"]}
        />
        <Input
          title="name"
          name="name"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["name"]}
          errorMessage={
            error["name"]
              ? "Name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["name"] as string
          }
          resetValue={resetValue["name"]}
          setValue={setValue["name"]}
        />
        <section className={styles.topCity}>
          <Input
            title="Is Top City"
            name="isTopCity"
            isRequired={false}
            hasSubmitted={hasSubmitted}
            showError={error["isTopCity"]}
            errorMessage={
              error["isTopCity"]
                ? "Top City is required"
                : " "
            }
            variant="boolean"
            defaultValue={
              defaultValue["isTopCity"] as boolean
            }
            setValue={setValue["isTopCity"]}
          />
          <div
            className={`${styles.iconInputContainer} ${
              (value["isTopCity"] as boolean)
                ? styles.show
                : styles.hide
            }`}
          >
            <Input
              title="icon"
              name="icon"
              isRequired={false}
              hasSubmitted={hasSubmitted}
              showError={error["icon"]}
              errorMessage={"icon is required"}
              variant="selectImage"
              defaultValue={
                defaultValue[
                  "icon"
                ] as ImageDocument[]
              }
              resetValue={resetValue["icon"]}
              setValue={setValue["icon"]}
            />
          </div>
        </section>
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              cityId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/city"
          />
        </section>
      </div>
    </form>
  );
}
