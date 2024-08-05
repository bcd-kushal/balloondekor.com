"use client";

// libraries
import { useEffect, useState } from "react";

// components
import ServiceUI from "@/components/ui/service/ServiceUI";

// types
import {
  CustomVariantDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import {
  OtherServicesCityWiseType,
  OtherServicesType
} from "@/types/frontend/service";
import { useCityContext } from "@/hooks/useCityContext";
import {
  getCityWisePrice,
  sortCondensedServices
} from "@/lib/sortServices";
import { usePathname } from "next/navigation";
import { getLocalStorage } from "@/lib/localStorage";

export type ServiceListSortType =
  | "popularity"
  | "highToLow"
  | "lowToHigh";

export const SERVICE_LIST_SORT_TYPE_LS_KEY =
  "__xAwQoXj__";

export default function ServicePage({
  service,
  suggestions,
  otherServices
}: {
  service: ServiceDocument;
  suggestions: ServiceDocument[];
  otherServices: OtherServicesType;
}) {
  const { currentCity } = useCityContext();
  const currPath = usePathname();

  const [referenceVariant, setReferenceVariant] =
    useState<ServiceDocument>();
  const [customVariant, setCustomVariant] =
    useState<CustomVariantDocument>();

  const [showSuggestions, setShowSuggestions] =
    useState<boolean>(false);

  const [showAddons, setShowAddons] =
    useState<boolean>(false);

  const [sortType, setSortType] =
    useState<ServiceListSortType>("popularity");

  const [
    otherServiceCityWiseList,
    setOtherServiceCityWiseList
  ] = useState<OtherServicesCityWiseType>(
    sortCondensedServices({
      otherServices: otherServices.map(
        (other) => ({
          ...other,
          price: getCityWisePrice({
            currCity: currentCity?.name || "",
            prices: other.price
          })
        })
      ),
      sortType
    })
  );

  const [activeIndex, setActiveIndex] =
    useState<number>(-1);

  const [navigateService, setNavigateService] =
    useState<{ prev: string; next: string }>({
      prev: "#",
      next: "#"
    });

  useEffect(() => {
    if (otherServiceCityWiseList.length) {
      let theOne: number = -1;

      for (
        let i = 0;
        i < otherServiceCityWiseList.length;
        i++
      ) {
        if (
          otherServiceCityWiseList[
            i
          ].link.toLowerCase() === currPath
        )
          theOne = i;
      }

      if (theOne >= 0)
        setActiveIndex((prev) => theOne);
    }
  }, [otherServiceCityWiseList, currPath]);

  useEffect(() => {
    if (
      otherServiceCityWiseList.length &&
      activeIndex >= 0
    ) {
      setNavigateService((previous) => ({
        prev:
          activeIndex < 0
            ? "#"
            : otherServiceCityWiseList[
                activeIndex === 0
                  ? otherServiceCityWiseList.length -
                    1
                  : activeIndex - 1
              ].link,
        next:
          activeIndex < 0
            ? "#"
            : otherServiceCityWiseList[
                activeIndex ===
                otherServiceCityWiseList.length -
                  1
                  ? 0
                  : activeIndex + 1
              ].link
      }));
    }
  }, [otherServiceCityWiseList, activeIndex]);

  useEffect(() => {
    setOtherServiceCityWiseList((prev) => {
      const sortedList = sortCondensedServices({
        otherServices: otherServices.map(
          (other) => ({
            ...other,
            price: getCityWisePrice({
              currCity: currentCity?.name || "",
              prices: other.price
            })
          })
        ),
        sortType
      });
      return sortedList;
    });
  }, [sortType, otherServices, currentCity]);

  useEffect(() => {
    const sort: ServiceListSortType =
      getLocalStorage(
        SERVICE_LIST_SORT_TYPE_LS_KEY
      ) || "popularity";

    setSortType((prev) => sort);
  }, []);

  return (
    <ServiceUI
      slugs={[
        service.name
          .toLowerCase()
          .split(" ")
          .join("-")
      ]}
      service={service}
      suggestions={suggestions}
      showSuggestions={showSuggestions}
      showAddonsModal={showAddons}
      referenceVariant={referenceVariant}
      customVariant={customVariant}
      onChangeShowSuggestions={setShowSuggestions}
      onChangeShowAddonsModal={setShowAddons}
      onChangeReferenceVariant={
        setReferenceVariant
      }
      onChangeCustomVariant={setCustomVariant}
      navigateService={navigateService}
    />
  );
}
