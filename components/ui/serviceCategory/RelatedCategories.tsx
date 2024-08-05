// components
import RelatedCategory from "./RelatedCategory";

// styles
import styles from "@/components/ui/serviceCategory/relatedCategories.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function RelatedCategories({
  categories
}: {
  categories: ServiceCategoryDocument[];
}) {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        Service Categories
      </div>
      <div className={styles.categoriesRow}>
        {categories.map(
          ({ _id, name, slug, openIn, icon }) => (
            <>
              <RelatedCategory
                key={_id}
                name={name}
                slug={slug}
                openIn={openIn}
                icon={icon as ImageDocument}
              />
            </>
          )
        )}
      </div>
    </section>
  );
}
