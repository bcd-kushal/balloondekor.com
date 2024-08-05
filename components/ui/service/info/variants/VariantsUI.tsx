import CustomVariants from "@/components/client/service/CustomVariants";
import ReferenceVariants from "@/components/client/service/ReferenceVariants";

import styles from "@/components/ui/service/info/variants/variantsUI.module.css";

import {
  CustomVariantDocument,
  ServiceDocument,
  VariantCategoryDocument
} from "@/schemas/cms/service";

export default function VariantsUI({
  variants,
  activeIndex,
  onSelectReferenceVariant,
  onSelectCustomVariant
}: {
  variants: VariantCategoryDocument[];
  activeIndex: number;
  onSelectReferenceVariant: (
    referenceVariant: ServiceDocument | undefined,
    index: number
  ) => void;
  onSelectCustomVariant: (
    customVariant?: CustomVariantDocument
  ) => void;
}) {
  return (
    <>
      {variants.length > 0 ? (
        <section className={styles.container}>
          {variants.map((variant, i) => {
            if (
              isNaN(activeIndex) ||
              i === activeIndex
            ) {
              if (variant.references.length > 0) {
                return (
                  <ReferenceVariants
                    key={variant._id}
                    title={variant.label}
                    referenceVariants={
                      variant.references
                    }
                    onSelect={(
                      referenceVariant:
                        | ServiceDocument
                        | undefined
                    ) => {
                      onSelectReferenceVariant(
                        referenceVariant,
                        i
                      );
                    }}
                  />
                );
              } else {
                return (
                  <CustomVariants
                    key={variant._id}
                    title={variant.label}
                    customVariants={
                      variant.custom
                    }
                    onSelect={
                      onSelectCustomVariant
                    }
                  />
                );
              }
            } else {
              return <></>;
            }
          })}
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
