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
import styles from "@/components/cms/homepage/layout/form/tilesForm.module.css";

// FORM CONTROL CONFIGURATION
export function getTilesFormConfig({
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
    leftLinkImages: {
      isRequired: true,
      type: "linkImage",
      defaultValue: sections?.length
        ? sections[0].linkImages
        : []
    },
    rightLinkImage: {
      isRequired: true,
      type: "linkImage",
      defaultValue: sections?.length
        ? sections[1].linkImages
        : []
    }
  };
}

export default function TilesForm({
  id
}: {
  id?: string;
}) {
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

  const handleSubmit = ({
    heading,
    subHeading,
    leftLinkImages,
    rightLinkImage
  }: {
    heading: string;
    subHeading: string;
    leftLinkImages: LinkImageDocument[];
    rightLinkImage: LinkImageDocument[];
  }): void => {
    if (leftLinkImages.length !== 4) {
      addStatus([
        {
          type: "error",
          message: "Select 4 Left Images"
        }
      ]);

      return;
    }

    if (rightLinkImage.length !== 1) {
      addStatus([
        {
          type: "error",
          message: "Select 1 Right Image"
        }
      ]);

      return;
    }

    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "tiles",
        heading,
        subHeading,
        sections: [
          {
            linkImages: leftLinkImages
          } as SectionDocument,
          {
            linkImages: rightLinkImage
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
    <form
      className={`pl-[8px] flex flex-col items-stretch justify-start`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <section
        className={`flex flex-col items-stretch justify-start gap-[16px]`}
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
          title="sub-heading"
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
          title="left images (top-left, top-right, bottom-left, bottom-right)"
          name="leftLinkImages"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["leftLinkImages"]}
          errorMessage={
            "left images are required"
          }
          variant="linkImage"
          defaultValue={
            defaultValue[
              "leftLinkImages"
            ] as LinkImageDocument[]
          }
          setValue={setValue["leftLinkImages"]}
        />
        <Input
          title="right image (big one)"
          name="rightLinkImage"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["rightLinkImage"]}
          errorMessage={"right image is required"}
          variant="linkImage"
          defaultValue={
            defaultValue[
              "rightLinkImage"
            ] as LinkImageDocument[]
          }
          setValue={setValue["rightLinkImage"]}
        />
      </section>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={id ? "update" : "add"}
            closeBtnLabel="close"
            variant="page"
            closeBtnLink="/cms/homepage"
          />
        </section>
      </div>
    </form>
  );
}
