/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// hooks
import { useImageManagementContext } from "@/hooks/useImageManagementContext";
import {
  ConfigType,
  Fields,
  useFormContext
} from "@/hooks/useFormContext";

// components
import Button from "@/components/common/Button";
import Input from "@/components/common/form/Input";

// styles
import styles from "./uploadForm.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";

type OptionType = {
  label: string;
  value: string;
};

// FORM CONTROL CONFIGURATION
export function getFormConfig(
  defaultValue: Fields
): ConfigType {
  return {
    folderId: {
      isRequired: true,
      type: "dropdown",
      defaultValue: defaultValue["folderId"]
        ? (defaultValue["folderId"] as string)
        : ""
    },
    images: {
      isRequired: true,
      type: "image",
      defaultValue: []
    }
  };
}

// FORM
export default function UploadForm({
  onClose
}: {
  onClose: () => void;
}) {
  const {
    folder: { folders },
    image: { add }
  } = useImageManagementContext();

  const {
    defaultValue,
    resetValue,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const folderOptions: OptionType[] = folders.val
    .sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      } else if (a.label < b.label) {
        return -1;
      }

      return 0;
    })
    .map(({ _id, label }) => ({
      label: label,
      value: _id
    }));

  const handleSubmit = (data: any) => {
    const { folderId, images } = data;

    if (folderId && images.length) {
      const imagesData: Partial<ImageDocument>[] =
        [];

      for (let image of images) {
        const {
          name,
          extension,
          defaultAlt,
          width,
          height,
          size,
          data
        } = image;

        const imageData: Partial<ImageDocument> =
          {
            folderId: folderId,
            folderName: folders.val.find(
              ({ _id }) => _id === folderId
            )?.name as string,
            name: name as string,
            data: data as string,
            extension: extension as string,
            defaultAlt: defaultAlt as string,
            alt: "",
            width: width as number,
            height: height as number,
            size: size as number
          };

        imagesData.push(imageData);
      }

      add(imagesData);

      onClose();
    }
  };

  return (
    <section
      className={
        "flex flex-col items-stretch justify-start gap-[4px]"
      }
    >
      <span className="px-[20px]">
        <Input
          title="folder"
          name="folderId"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["folderId"]}
          errorMessage="folder is required"
          variant="dropdown"
          defaultValue={
            defaultValue["folderId"] as string
          }
          options={folderOptions}
          resetValue={resetValue["folderId"]}
          setValue={setValue["folderId"]}
        />
      </span>
      <Input
        title="image/images"
        name="images"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["images"]}
        errorMessage={"image is required"}
        variant="image"
        defaultValue={
          defaultValue["images"] as string
        }
        resetValue={resetValue["images"]}
        setValue={setValue["images"]}
      />
      <div className={styles.actionsContainer}>
        <section
          className={`pr-[16px] ${styles.actions}`}
        >
          <Button
            type="secondary"
            label="close"
            variant="normal"
            onClick={onClose}
          />
          <Button
            type="primary"
            label="upload"
            variant="normal"
            onClick={() => {
              onSubmit(undefined, (data) => {
                handleSubmit(data);
              });
            }}
          />
        </section>
      </div>
    </section>
  );
}
