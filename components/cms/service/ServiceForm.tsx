/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import BasicInfoEditor from "@/components/cms/service/form/BasicInfoEditor";
import CustomizationInfoEditor from "./form/CustomizationInfoEditor";
import FormPageSkeletonLayout from "@/components/common/form/structure/FormPageSkeletonLayout";
import DeliveryInfoEditor from "./form/DeliveryInfoEditor";
import VisualInfoEditor from "./form/VisualInfoEditor";

// fetchAPIs
import {
  getService,
  getServiceFormOptions
} from "@/fetchAPIs/cms/service";

// types
import { OptionType } from "@/types/cms/form";
import { ResponseDataType } from "@/types/cms/api";
import { ServiceDocument } from "@/schemas/cms/service";

export default function ServiceForm({
  id
}: {
  id?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [showFormNo, setShowFormNo] =
    useState<number>(0);

  const [serviceId, setServiceId] =
    useState<string>(id || "");

  const [defaultValue, setDefaultValue] =
    useState<ServiceDocument>(
      {} as ServiceDocument
    );

  const [options, setOptions] = useState<{
    [key: string]: OptionType[];
  }>({});

  const handleGetService = (
    serviceId: string
  ) => {
    getService(serviceId)
      .then((responseData: ResponseDataType) => {
        setDefaultValue(
          responseData.data as ServiceDocument
        );
        if (showFormNo === 0) {
          setShowFormNo(1);
        }
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleGetOptions = () => {
    getServiceFormOptions()
      .then((responseData: ResponseDataType) => {
        setOptions(responseData.data);
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  useEffect(() => {
    handleGetOptions();

    if (!serviceId) {
      setShowFormNo(1);
    }
  }, []);

  useEffect(() => {
    if (serviceId) {
      handleGetService(serviceId);
    }
  }, [serviceId]);

  const pageTitle: string[] = [
    "",
    "basic info",
    "visual info",
    "delivery info",
    "customization info"
  ];

  return (
    <FormPageSkeletonLayout
      title={pageTitle[showFormNo]}
    >
      {showFormNo === 0 && <p>Loading...</p>}
      {showFormNo === 1 && (
        <BasicInfoEditor
          title="basic info"
          serviceId={serviceId}
          options={options}
          defaultValue={defaultValue}
          setServiceId={setServiceId}
          setDefaultValue={setDefaultValue}
          setShowFormNo={setShowFormNo}
        />
      )}
      {showFormNo === 2 && (
        <VisualInfoEditor
          title="visual info"
          serviceId={serviceId}
          options={options}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowFormNo={setShowFormNo}
        />
      )}
      {showFormNo === 3 && (
        <DeliveryInfoEditor
          title="delivery info"
          serviceId={serviceId}
          options={options}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowFormNo={setShowFormNo}
        />
      )}
      {showFormNo === 4 && (
        <CustomizationInfoEditor
          title="customization info"
          serviceId={serviceId}
          options={options}
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setShowFormNo={setShowFormNo}
        />
      )}
    </FormPageSkeletonLayout>
  );
}
