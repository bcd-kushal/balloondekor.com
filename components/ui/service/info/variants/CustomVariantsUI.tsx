// components
import Variant from "@/components/ui/service/info/variants/Variant";

// styles
import styles from "@/components/ui/service/info/variants/customVariantsUI.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  CustomVariantCategoryDocument,
  PriceDocument
} from "@/schemas/cms/service";
import { UnitDocument } from "@/schemas/cms/unit";

export default function CustomVariantsUI({
  title,
  customVariants: { options, unit, variants },
  activeIndex,
  onGetPrice,
  onSelect
}: {
  title: string;
  customVariants: CustomVariantCategoryDocument;
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
        {variants.map((variant, i) => (
          <Variant
            key={variant._id}
            image={
              options.image
                ? (variant.image as ImageDocument)
                : undefined
            }
            label={
              options.unit
                ? `${variant.value} ${(unit as UnitDocument).abbr}`
                : variant.label
            }
            price={
              options.unit
                ? undefined
                : options.image
                  ? onGetPrice(variant.price)
                  : undefined
            }
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
