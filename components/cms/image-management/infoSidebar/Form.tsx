"use client";

import { FormEvent } from "react";

import {
  ConfigType,
  Fields,
  useFormContext
} from "@/hooks/useFormContext";
import { useImageManagementContext } from "@/hooks/useImageManagementContext";

import FormActions from "@/components/common/form/FormActions";
import Input from "@/components/common/form/Input";

import styles from "./form.module.css";
import Button from "@/components/common/Button";

type Props = {
  onClose: () => void;
};

// FORM CONTROL CONFIGURATION
export function getFormConfig(
  defaultValue: Fields
): ConfigType {
  return {
    alt: {
      isRequired: true,
      type: "text",
      defaultValue: defaultValue["alt"]
        ? (defaultValue["alt"] as string)
        : ""
    }
  };
}

export default function Form(props: Props) {
  const { onClose } = props;
  const {
    image: {
      active: { val },
      update
    }
  } = useImageManagementContext();

  const {
    defaultValue,
    resetValue,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const handleSubmit = (image: any) => {
    update(val._id, image);
    onClose();
  };

  return (
    <section className={styles.container}>
      <Input
        title="alt text"
        name="alt"
        isRequired={true}
        hasSubmitted={hasSubmitted}
        showError={error["alt"]}
        errorMessage={
          error["alt"] ? "alt is required" : " "
        }
        variant="text"
        defaultValue={
          defaultValue["alt"] as string
        }
        resetValue={resetValue["alt"]}
        setValue={setValue["alt"]}
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
            label="update"
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
