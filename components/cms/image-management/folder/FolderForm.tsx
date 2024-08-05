"use client";

import { FormEvent } from "react";

import { useImageManagementContext } from "@/hooks/useImageManagementContext";
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";

import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

import { FolderDocument } from "@/schemas/cms/folder";

import styles from "./folderForm.module.css";
import Button from "@/components/common/Button";

type CommonProps = {
  onClose: () => void;
};

type AddVariantProps = {
  variant: "add";
};

type EditVariantProps = {
  variant: "edit";
  id: string;
};

type Props = CommonProps &
  (AddVariantProps | EditVariantProps);

// FORM CONTROL CONFIGURATION
export function getFormConfig(
  defaultValue: FolderDocument
): ConfigType {
  return {
    label: {
      isRequired: true,
      type: "text",
      defaultValue: defaultValue.label || ""
    }
  };
}

export default function FolderForm(props: Props) {
  const { variant, onClose } = props;

  const {
    folder: { add, update }
  } = useImageManagementContext();

  const {
    defaultValue,
    resetValue,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const handleSubmit = (data: any) => {
    if (variant === "add") {
      add(data);
    } else if (variant === "edit") {
      const { id } = props;

      update(id, data);
    }

    onClose();
  };

  return (
    <section className={styles.container}>
      <Input
        title="name"
        name="label"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["label"]}
        errorMessage={
          error["label"]
            ? "name is required"
            : " "
        }
        variant="text"
        defaultValue={
          defaultValue["label"] as string
        }
        resetValue={resetValue["label"]}
        setValue={setValue["label"]}
      />
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <Button
            type="secondary"
            label="close"
            variant="normal"
            onClick={onClose}
          />
          <Button
            type="primary"
            label={
              variant === "add" ? "add" : "edit"
            }
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
