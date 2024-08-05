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
  BtnDocument,
  HomepageLayoutDocument,
  LinkImageDocument,
  SectionDocument
} from "@/schemas/cms/homepage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/layout/form/collageForm.module.css";

// FORM CONTROL CONFIGURATION
export function getCollageFormConfig({
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
    leftHeading: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[0].heading
        : ""
    },
    leftSubHeading: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[0].subHeading
        : ""
    },
    leftBtnLabel: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[0].btn.label
        : ""
    },
    leftBtnUrl: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[0].btn.url
        : ""
    },
    leftLinkImages: {
      isRequired: true,
      type: "linkImage",
      defaultValue: sections?.length
        ? sections[0].linkImages
        : []
    },
    rightHeading: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[1].heading
        : ""
    },
    rightSubHeading: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[1].subHeading
        : ""
    },
    rightBtnLabel: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[1].btn.label
        : ""
    },
    rightBtnUrl: {
      isRequired: false,
      type: "text",
      defaultValue: sections?.length
        ? sections[1].btn.url
        : ""
    },
    rightLinkImages: {
      isRequired: true,
      type: "linkImage",
      defaultValue: sections?.length
        ? sections[1].linkImages
        : []
    }
  };
}

export default function CollageForm({
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
    leftHeading,
    leftSubHeading,
    leftBtnLabel,
    leftBtnUrl,
    leftLinkImages,
    rightHeading,
    rightSubHeading,
    rightBtnLabel,
    rightBtnUrl,
    rightLinkImages
  }: {
    heading: string;
    subHeading: string;
    leftHeading: string;
    leftSubHeading: string;
    leftBtnLabel: string;
    leftBtnUrl: string;
    leftLinkImages: LinkImageDocument[];
    rightHeading: string;
    rightSubHeading: string;
    rightBtnLabel: string;
    rightBtnUrl: string;
    rightLinkImages: LinkImageDocument[];
  }): void => {
    if (leftLinkImages.length !== 4) {
      addStatus([
        {
          type: "error",
          message: "Select 4 Left Section Images"
        }
      ]);

      return;
    }

    if (rightLinkImages.length !== 4) {
      addStatus([
        {
          type: "error",
          message: "Select 4 Right Section Images"
        }
      ]);

      return;
    }

    const transformedData: Partial<HomepageLayoutDocument> =
      {
        layout: "collage",
        heading,
        subHeading,
        sections: [
          {
            heading: leftHeading,
            subHeading: leftSubHeading,
            btn: {
              label: leftBtnLabel,
              url: leftBtnUrl
            } as BtnDocument,
            linkImages: leftLinkImages
          } as SectionDocument,
          {
            heading: rightHeading,
            subHeading: rightSubHeading,
            btn: {
              label: rightBtnLabel,
              url: rightBtnUrl
            } as BtnDocument,
            linkImages: rightLinkImages
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
          title="left section heading"
          name="leftHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["leftHeading"]}
          errorMessage={
            "left section heading is required"
          }
          variant="text"
          defaultValue={
            defaultValue["leftHeading"] as string
          }
          setValue={setValue["leftHeading"]}
        />
        <Input
          title="left section sub-heading"
          name="leftSubHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["leftSubHeading"]}
          errorMessage={
            "left section sub-heading is required"
          }
          variant="text"
          defaultValue={
            defaultValue[
              "leftSubHeading"
            ] as string
          }
          setValue={setValue["leftSubHeading"]}
        />
        <Input
          title="left section button label"
          name="leftBtnLabel"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["leftBtnLabel"]}
          errorMessage={
            "left section button label is required"
          }
          variant="text"
          defaultValue={
            defaultValue["leftBtnLabel"] as string
          }
          setValue={setValue["leftBtnLabel"]}
        />
        <Input
          title="left section button url"
          name="leftBtnUrl"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["leftBtnUrl"]}
          errorMessage={
            "left section button url is required"
          }
          variant="text"
          defaultValue={
            defaultValue["leftBtnUrl"] as string
          }
          setValue={setValue["leftBtnUrl"]}
        />
        <Input
          title="left section images (top-left (rectangle), bottom-left (square), top-right (square), bottom-right (rectangle))"
          name="leftLinkImages"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["leftLinkImages"]}
          errorMessage={
            "left section images are required"
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
          title="right section heading"
          name="rightHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["rightHeading"]}
          errorMessage={
            "right section heading is required"
          }
          variant="text"
          defaultValue={
            defaultValue["rightHeading"] as string
          }
          setValue={setValue["rightHeading"]}
        />
        <Input
          title="right section sub-heading"
          name="rightSubHeading"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["rightSubHeading"]}
          errorMessage={
            "right section sub-heading is required"
          }
          variant="text"
          defaultValue={
            defaultValue[
              "rightSubHeading"
            ] as string
          }
          setValue={setValue["rightSubHeading"]}
        />
        <Input
          title="right section button label"
          name="rightBtnLabel"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["rightBtnLabel"]}
          errorMessage={
            "right section button label is required"
          }
          variant="text"
          defaultValue={
            defaultValue[
              "rightBtnLabel"
            ] as string
          }
          setValue={setValue["rightBtnLabel"]}
        />
        <Input
          title="right section button url"
          name="rightBtnUrl"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["rightBtnUrl"]}
          errorMessage={
            "right section button url is required"
          }
          variant="text"
          defaultValue={
            defaultValue["rightBtnUrl"] as string
          }
          setValue={setValue["rightBtnUrl"]}
        />
        <Input
          title="right section images (top-left (rectangle), bottom-left (square), top-right (square), bottom-right (rectangle))"
          name="rightLinkImages"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["rightLinkImages"]}
          errorMessage={
            "right section images are required"
          }
          variant="linkImage"
          defaultValue={
            defaultValue[
              "rightLinkImages"
            ] as LinkImageDocument[]
          }
          setValue={setValue["rightLinkImages"]}
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
