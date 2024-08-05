/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import FormControl from "@/components/common/form/FormControl";
import ServiceTypeOptionForm, {
  getServiceTypeOptionFormConfig
} from "@/components/cms/service-type-option/ServiceTypeOptionForm";

// fetchAPIs
import { getServiceTypeOption } from "@/fetchAPIs/cms/serviceTypeOption";

// types
import { ServiceTypeOptionDocument } from "@/schemas/cms/serviceTypeOption";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/service-type-option/serviceTypeOptionEditor.module.css";

export default function ServiceTypeOptionEditor({
  serviceTypeOptionId
}: {
  serviceTypeOptionId?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [defaultValue, setDefaultValue] =
    useState<ServiceTypeOptionDocument>(
      {} as ServiceTypeOptionDocument
    );

  // handlers
  const handleGetServiceTypeOption = (
    serviceTypeOptionId: string
  ): void => {
    getServiceTypeOption(serviceTypeOptionId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceTypeOptionDocument
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // lifecycle
  useEffect(() => {
    if (serviceTypeOptionId) {
      handleGetServiceTypeOption(
        serviceTypeOptionId
      );
    }
  }, []);

  if (serviceTypeOptionId) {
    if (!defaultValue._id) {
      return <p>Loading</p>;
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Service Type Option
      </h3>
      <FormControl
        config={getServiceTypeOptionFormConfig({
          name: defaultValue?.name || "",
          price: defaultValue?.price || NaN
        })}
      >
        <ServiceTypeOptionForm
          serviceTypeOptionId={
            serviceTypeOptionId
          }
        />
      </FormControl>
    </div>
  );
}
