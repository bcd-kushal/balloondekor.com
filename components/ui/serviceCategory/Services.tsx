// components
import { sortServices } from "@/lib/sortServices";
import Service from "./Service";

// styles
import styles from "@/components/ui/serviceCategory/services.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { ServiceDocument } from "@/schemas/cms/service";

export default function Services({
  services
}: {
  services: ServiceDocument[];
}) {
  return (
    <section className={styles.container}>
      {services.map(
        ({
          _id,
          name,
          price,
          media: { primary },
          quality,
          tags
        }) => (
          <Service
            key={_id}
            name={name}
            icon={primary as ImageDocument}
            price={price}
            rating={quality?.rating || NaN}
            reviewCount={
              quality?.totalReviews || NaN
            }
            promotionTag={
              tags && "promotionTags" in tags
                ? (tags.promotionTags as PackageTagDocument[])
                : []
            }
          />
        )
      )}
    </section>
  );
}
