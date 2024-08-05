/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { FormEvent } from "react";
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
  addHomepageLayout,
  updateHomepageLayout
} from "@/fetchAPIs/cms/homepage";

// types
import {
  HomepageLayoutDocument,
  SectionDocument,
  LinkImageDocument
} from "@/schemas/cms/homepage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/layout/form/circleForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCircleFormConfig({
  heading,
  subHeading,
  sections
}: Partial<HomepageLayoutDocument>): ConfigType {
  return {
    heading: {
      isRequired: false,
      type: "text",
      defaultValue: heading || ""
    },
    subHeading: {
      isRequired: false,
      type: "text",
      defaultValue: subHeading || ""
    },
    linkImages: {
      isRequired: true,
      type: "linkImage",
      defaultValue: sections?.length
        ? sections[0].linkImages
        : []
    }
  };
}

export default function CircleForm({
  id
}: {
  id?: string;
}) {
  const { push } = useRouter();

  const { addStatus: addStatus } =
    useStatusContext();

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

  const handleSubmit = ({
    heading,
    subHeading,
    linkImages
  }: {
    heading: string;
    subHeading: string;
    linkImages: LinkImageDocument[];
  }): void => {
    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "circle",
        heading,
        subHeading,
        sections: [
          {
            linkImages: linkImages
          } as SectionDocument
        ]
      };

    if (id) {
      updateHomepageLayout(id, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/homepage");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addHomepageLayout(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/homepage");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  return (
    <>
      <form
        className={`flex flex-col items-stretch justify-start gap-[16px] pl-[5px]`}
        autoComplete="off"
        onSubmit={(
          e: FormEvent<HTMLFormElement>
        ) =>
          onSubmit(e, (data: any) => {
            handleSubmit(data);
          })
        }
      >
        <Input
          title="heading"
          name="heading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["heading"]}
          errorMessage={"heading is required"}
          variant="text"
          defaultValue={
            defaultValue["heading"] as string
          }
          setValue={setValue["heading"]}
        />
        <Input
          title="subHeading"
          name="subHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["subHeading"]}
          errorMessage={"sub heading is required"}
          variant="text"
          defaultValue={
            defaultValue["subHeading"] as string
          }
          setValue={setValue["subHeading"]}
        />
        <Input
          title="circles"
          name="linkImages"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["linkImages"]}
          errorMessage={"circles are required"}
          variant="linkImage"
          defaultValue={
            defaultValue[
              "linkImages"
            ] as LinkImageDocument[]
          }
          setValue={setValue["linkImages"]}
        />
        <div className={styles.actionsContainer}>
          <section className={styles.actions}>
            <FormActions
              submitBtnLabel={
                id ? "update" : "add"
              }
              closeBtnLabel="close"
              variant="page"
              closeBtnLink="/cms/homepage"
            />
          </section>
        </div>
      </form>
    </>
  );
}
