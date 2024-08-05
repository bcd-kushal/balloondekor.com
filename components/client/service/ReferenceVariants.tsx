"use client";

// libraries
import { useState } from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import ReferenceVariantsUI from "@/components/ui/service/info/variants/ReferenceVariantsUI";

// types
import { CityDocument } from "@/schemas/cms/city";
import {
  PriceDocument,
  ReferenceVariantCategoryDocument,
  ServiceDocument
} from "@/schemas/cms/service";

export default function ReferenceVariants({
  title,
  referenceVariants,
  onSelect
}: {
  title: string;
  referenceVariants: ReferenceVariantCategoryDocument[];
  onSelect: (
    variant: ServiceDocument | undefined
  ) => void;
}) {
  const { currentCity } = useCityContext();

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  const getPrice = (
    priceDetails: PriceDocument
  ): number => {
    if (currentCity) {
      const currentCityPrice =
        priceDetails.cities.filter(
          ({ city }) =>
            (city as CityDocument)._id ===
            currentCity._id
        );

      if (currentCityPrice.length) {
        return currentCityPrice[0].price;
      }
    }

    return priceDetails.base.price;
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (index) {
      onSelect(
        referenceVariants[index]
          .reference as ServiceDocument
      );
    } else {
      onSelect(undefined);
    }
  };

  return (
    <ReferenceVariantsUI
      title={title}
      referenceVariants={referenceVariants}
      activeIndex={activeIndex}
      onGetPrice={getPrice}
      onSelect={handleSelect}
    />
  );
}
