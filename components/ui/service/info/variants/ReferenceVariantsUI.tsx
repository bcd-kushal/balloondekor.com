// components
import Variant from "@/components/ui/service/info/variants/Variant";

// styles
import styles from "@/components/ui/service/info/variants/referenceVariantsUI.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  PriceDocument,
  ReferenceVariantCategoryDocument,
  ServiceDocument
} from "@/schemas/cms/service";

export default function ReferenceVariantsUI({
  title,
  referenceVariants,
  activeIndex,
  onGetPrice,
  onSelect
}: {
  title: string;
  referenceVariants: ReferenceVariantCategoryDocument[];
  activeIndex: number;
  onGetPrice: (
    priceDetails: PriceDocument
  ) => number;
  onSelect: (index: number) => void;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.title}>{title}</div>
      <section className={styles.variants}>
        {referenceVariants.map((variant, i) => (
          <Variant
            key={variant._id}
            image={
              (
                variant.reference as ServiceDocument
              ).media.primary as ImageDocument
            }
            label={variant.label}
            price={onGetPrice(
              (
                variant.reference as ServiceDocument
              ).price
            )}
            isActive={i === activeIndex}
            onClick={() => {
              onSelect(i);
            }}
          />
        ))}
      </section>
    </section>
  );
}
