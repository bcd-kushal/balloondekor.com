import { useState } from "react";

import {
  CustomVariantDocument,
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";
import VariantsUI from "@/components/ui/service/info/variants/VariantsUI";

export default function Variants({
  variants,
  onSelectReferenceVariant,
  onSelectCustomVariant
}: {
  variants: VariantCategoryDocument[];
  onSelectReferenceVariant: (
    referenceVariant: ServiceDocument | undefined
  ) => void;
  onSelectCustomVariant: (
    customVariant:
      | CustomVariantDocument
      | undefined
  ) => void;
}) {
  const [
    activeVariantCategoryIndex,
    setActiveVariantCategoryIndex
  ] = useState<number>(NaN);

  const handleSelectReferenceVariant = (
    referenceVariant: ServiceDocument | undefined,
    variantCategoryIndex: number
  ) => {
    if (referenceVariant) {
      setActiveVariantCategoryIndex(
        variantCategoryIndex
      );
    } else {
      setActiveVariantCategoryIndex(NaN);
    }

    onSelectCustomVariant(undefined);
    onSelectReferenceVariant(referenceVariant);
  };

  const handleSelectCustomVariant = (
    customVariant:
      | CustomVariantDocument
      | undefined
  ) => {
    onSelectCustomVariant(customVariant);
    onSelectReferenceVariant(undefined);
  };

  return (
    <VariantsUI
      variants={variants}
      activeIndex={activeVariantCategoryIndex}
      onSelectReferenceVariant={
        handleSelectReferenceVariant
      }
      onSelectCustomVariant={
        handleSelectCustomVariant
      }
    />
  );
}
