// libraries
import { useState } from "react";

// hooks
import { useCityContext } from "@/hooks/useCityContext";

// components
import CustomVariantsUI from "@/components/ui/service/info/variants/CustomVariantsUI";

// types
import { CityDocument } from "@/schemas/cms/city";
import {
  CustomVariantCategoryDocument,
  CustomVariantDocument,
  PriceDocument
} from "@/schemas/cms/service";

export default function CustomVariants({
  title,
  customVariants,
  onSelect
}: {
  title: string;
  customVariants: CustomVariantCategoryDocument;
  onSelect: (
    variant: CustomVariantDocument | undefined
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
        customVariants.variants[
          index
        ] as CustomVariantDocument
      );
    } else {
      onSelect(undefined);
    }
  };

  return (
    <CustomVariantsUI
      title={title}
      customVariants={customVariants}
      activeIndex={activeIndex}
      onGetPrice={getPrice}
      onSelect={handleSelect}
    />
  );
}
